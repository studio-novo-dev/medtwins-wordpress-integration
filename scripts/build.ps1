param(
    [ValidateSet('todos', 'lps', 'simulados')][string]$Plugin = 'todos',
    [string]$PhpPath = '',
    [string]$OutputDirectory = 'dist'
)
$ErrorActionPreference = 'Stop'
$repoRoot = [IO.Path]::GetFullPath((Split-Path $PSScriptRoot -Parent))
$outputRoot = [IO.Path]::GetFullPath((Join-Path $repoRoot $OutputDirectory))
if (-not $outputRoot.StartsWith($repoRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
    throw 'A saída deve ser uma subpasta deste projeto.'
}
if (-not $PhpPath) {
    $phpCommand = Get-Command php -ErrorAction SilentlyContinue
    if ($phpCommand) { $PhpPath = $phpCommand.Source }
}
if ($PhpPath -and -not (Test-Path -LiteralPath $PhpPath -PathType Leaf)) { throw 'Executável PHP não encontrado.' }
if (-not $PhpPath) { Write-Warning 'PHP não encontrado: lint omitido. Para validar PHP, use -PhpPath ou adicione php ao PATH.' }
Add-Type -AssemblyName System.IO.Compression
$definitions = @(
    @{ Key = 'simulados'; Slug = 'medtwins-simulados'; Directories = @('simulados'); Catalog = 'simulados' },
    @{ Key = 'lps'; Slug = 'medtwins-lps-e-sites'; Directories = @('assets', 'includes', 'paginas'); Catalog = 'paginas' }
)
New-Item -ItemType Directory -Path $outputRoot -Force | Out-Null
foreach ($definition in $definitions) {
    if ($Plugin -ne 'todos' -and $Plugin -ne $definition.Key) { continue }
    $slug = $definition.Slug
    $sourceRoot = Join-Path $repoRoot $slug
    $main = Join-Path $sourceRoot "$slug.php"
    $header = Get-Content -LiteralPath $main -Raw
    $match = [regex]::Match($header, '(?m)^\s*\* Version:\s*(\d+\.\d+\.\d+)\s*$')
    if (-not $match.Success) { throw "Versão inválida em $main" }
    $version = $match.Groups[1].Value
    $constant = [regex]::Match($header, "private const VERSION = '([^']+)'")
    if ($constant.Success -and $constant.Groups[1].Value -ne $version) { throw "VERSION diverge do cabeçalho em $main" }
    $files = @(
        Get-Item -LiteralPath $main
        Get-Item -LiteralPath (Join-Path $sourceRoot 'index.php')
        Get-Item -LiteralPath (Join-Path $sourceRoot 'README.md')
        foreach ($directory in $definition.Directories) {
            Get-ChildItem -LiteralPath (Join-Path $sourceRoot $directory) -Recurse -File
        }
    ) | Sort-Object FullName
    if ($files | Where-Object { $_.FullName -match '[\\/](node_modules|\.git|previews|tools)[\\/]|[\\/]\.env(?:\.|$)' }) {
        throw "Arquivo de desenvolvimento dentro da distribuição de $slug. Revise os fontes."
    }
    $packages = @(Get-ChildItem -LiteralPath (Join-Path $sourceRoot $definition.Catalog) -Directory)
    if ($packages.Count -eq 0) { throw "Catálogo vazio: $slug" }
    foreach ($package in $packages) {
        if ($package.Name -notmatch '^[a-z0-9]+(?:-[a-z0-9]+)*$') { throw "ID inválido: $($package.Name)" }
        $manifest = Get-Content -LiteralPath (Join-Path $package.FullName 'manifest.json') -Raw | ConvertFrom-Json
        if (-not $manifest.titulo -or -not $manifest.versao) { throw "Manifest incompleto: $($package.Name)" }
        if (-not (Test-Path -LiteralPath (Join-Path $package.FullName 'index.html') -PathType Leaf)) { throw "index.html ausente: $($package.Name)" }
    }
    if ($PhpPath) {
        foreach ($file in ($files | Where-Object Extension -eq '.php')) {
            $lint = & $PhpPath -l $file.FullName 2>&1
            if ($LASTEXITCODE -ne 0) { throw "PHP inválido: $lint" }
        }
    }
    $destination = Join-Path $outputRoot "$slug-$version.zip"
    $temporary = Join-Path $outputRoot "$slug-$([guid]::NewGuid().ToString('N')).tmp"
    try {
        $stream = [IO.File]::Open($temporary, [IO.FileMode]::CreateNew)
        $archive = [IO.Compression.ZipArchive]::new($stream, [IO.Compression.ZipArchiveMode]::Create)
        try {
            foreach ($file in $files) {
                $relative = $file.FullName.Substring($sourceRoot.Length + 1).Replace('\', '/')
                $entry = $archive.CreateEntry("$slug/$relative", [IO.Compression.CompressionLevel]::Optimal)
                $entry.LastWriteTime = [DateTimeOffset]::new(2000, 1, 1, 0, 0, 0, [TimeSpan]::Zero)
                $inputStream = $file.OpenRead()
                $entryStream = $entry.Open()
                try { $inputStream.CopyTo($entryStream) }
                finally { $entryStream.Dispose(); $inputStream.Dispose() }
            }
        } finally { $archive.Dispose(); $stream.Dispose() }
        # Reabre e compara todos os arquivos antes de substituir qualquer pacote anterior.
        $stream = [IO.File]::OpenRead($temporary)
        $archive = [IO.Compression.ZipArchive]::new($stream, [IO.Compression.ZipArchiveMode]::Read)
        try {
            if ($archive.Entries.Count -ne $files.Count) { throw 'Quantidade de arquivos divergente no ZIP.' }
            foreach ($file in $files) {
                $relative = $file.FullName.Substring($sourceRoot.Length + 1).Replace('\', '/')
                $entry = $archive.GetEntry("$slug/$relative")
                if (-not $entry -or $entry.Length -ne $file.Length) { throw "Arquivo divergente: $relative" }
                $entryStream = $entry.Open()
                $sha = [Security.Cryptography.SHA256]::Create()
                try { $digest = [BitConverter]::ToString($sha.ComputeHash($entryStream)).Replace('-', '') }
                finally { $entryStream.Dispose(); $sha.Dispose() }
                if ($digest -ne (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash) { throw "Checksum divergente: $relative" }
            }
        } finally { $archive.Dispose(); $stream.Dispose() }
        Move-Item -LiteralPath $temporary -Destination $destination -Force
        # Exclusão não recursiva, restrita aos ZIPs versionados deste plugin na saída validada.
        foreach ($previous in (Get-ChildItem -LiteralPath $outputRoot -File)) {
            if ($previous.Name -match "^$([regex]::Escape($slug))-\d+\.\d+\.\d+\.zip$" -and $previous.FullName -ne $destination) {
                if ($previous.DirectoryName -ne $outputRoot) { throw 'Caminho de limpeza fora da saída.' }
                Remove-Item -LiteralPath $previous.FullName
            }
        }
        Write-Output "OK: $destination | $($files.Count) arquivos | $($packages.Count) páginas | SHA256 $((Get-FileHash -LiteralPath $destination).Hash)"
    } finally {
        if (Test-Path -LiteralPath $temporary) { Remove-Item -LiteralPath $temporary }
    }
}
