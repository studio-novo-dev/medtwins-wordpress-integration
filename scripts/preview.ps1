param(
    [ValidateSet('lps', 'simulados')][string]$Plugin = 'lps',
    [string]$PhpPath = 'php',
    [ValidateRange(1024, 65535)][int]$Port = 8080
)
$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path $PSScriptRoot -Parent
$slug = if ($Plugin -eq 'lps') { 'medtwins-lps-e-sites' } else { 'medtwins-simulados' }
$root = Join-Path $repoRoot $slug
$example = if ($Plugin -eq 'lps') { 'paginas/medtwins-home/index.html' } else { 'simulados/pediatria/index.html' }
Write-Output "Prévia estática: http://127.0.0.1:$Port/$example"
Write-Output 'Ctrl+C encerra. Esta prévia não executa o WordPress. Os formulários podem carregar o RD real; não envie dados de teste por ela.'
& $PhpPath -S "127.0.0.1:$Port" -t $root
if ($LASTEXITCODE -ne 0) { throw 'O servidor de prévia encerrou com erro.' }
