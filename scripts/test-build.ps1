param([string]$PhpPath = '')
$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path $PSScriptRoot -Parent
$fixtureRoot = Join-Path $repoRoot "tmp/build-test-$([guid]::NewGuid().ToString('N'))"
New-Item -ItemType Directory -Path (Join-Path $fixtureRoot 'scripts') -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'build.ps1') -Destination (Join-Path $fixtureRoot 'scripts/build.ps1')
foreach ($slug in @('medtwins-simulados', 'medtwins-lps-e-sites')) {
    $catalog = if ($slug -eq 'medtwins-simulados') { 'simulados' } else { 'paginas' }
    $directory = Join-Path $fixtureRoot "$slug/$catalog/exemplo"
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
    if ($slug -eq 'medtwins-lps-e-sites') {
        New-Item -ItemType Directory -Path (Join-Path $fixtureRoot "$slug/assets"), (Join-Path $fixtureRoot "$slug/includes") -Force | Out-Null
    }
    Set-Content -LiteralPath (Join-Path $directory 'manifest.json') -Value '{"titulo":"Exemplo","versao":"1.0.0"}' -Encoding utf8
    Set-Content -LiteralPath (Join-Path $directory 'index.html') -Value '<!doctype html><title>Exemplo</title>' -Encoding utf8
    Set-Content -LiteralPath (Join-Path $fixtureRoot "$slug/index.php") -Value '<?php // silêncio' -Encoding utf8
    Set-Content -LiteralPath (Join-Path $fixtureRoot "$slug/README.md") -Value 'Fixture de teste' -Encoding utf8
    Set-Content -LiteralPath (Join-Path $fixtureRoot "$slug/$slug.php") -Value "<?php`n/**`n * Version: 1.0.0`n */`n" -Encoding utf8
}
$build = Join-Path $fixtureRoot 'scripts/build.ps1'
& $build -PhpPath $PhpPath
$lps = Join-Path $fixtureRoot 'dist/medtwins-lps-e-sites-1.0.0.zip'
$exam = Join-Path $fixtureRoot 'dist/medtwins-simulados-1.0.0.zip'
$before = (Get-FileHash -LiteralPath $lps).Hash
$examHash = (Get-FileHash -LiteralPath $exam).Hash
& $build -Plugin lps -PhpPath $PhpPath
if ((Get-FileHash -LiteralPath $lps).Hash -ne $before) { throw 'Build idêntico gerou ZIP diferente.' }
$manifest = Join-Path $fixtureRoot 'medtwins-lps-e-sites/paginas/exemplo/manifest.json'
Set-Content -LiteralPath $manifest -Value '{invalido' -Encoding utf8
$rejected = $false
try { & $build -Plugin lps -PhpPath $PhpPath } catch { $rejected = $true }
if (-not $rejected -or (Get-FileHash -LiteralPath $lps).Hash -ne $before) { throw 'Falha de validação não preservou o ZIP anterior.' }
Set-Content -LiteralPath $manifest -Value '{"titulo":"Exemplo","versao":"1.1.0"}' -Encoding utf8
$main = Join-Path $fixtureRoot 'medtwins-lps-e-sites/medtwins-lps-e-sites.php'
(Get-Content -LiteralPath $main -Raw).Replace('1.0.0', '1.1.0') | Set-Content -LiteralPath $main -Encoding utf8
& $build -Plugin lps -PhpPath $PhpPath
if (Test-Path -LiteralPath $lps) { throw 'ZIP antigo não foi removido após sucesso.' }
if (-not (Test-Path -LiteralPath (Join-Path $fixtureRoot 'dist/medtwins-lps-e-sites-1.1.0.zip'))) { throw 'ZIP novo ausente.' }
if ((Get-FileHash -LiteralPath $exam).Hash -ne $examHash) { throw 'Build de LPs alterou o ZIP de Simulados.' }
$rejected = $false
try { & $build -OutputDirectory '../../fora' -PhpPath $PhpPath } catch { $rejected = $true }
if (-not $rejected) { throw 'Saída fora do projeto foi aceita.' }
Write-Output 'PASS build: ambos os plugins, ZIP reproduzível, erro preserva anterior, sucesso limpa anterior, outro plugin intacto e saída restrita ao projeto.'
Write-Output "Fixtures locais preservadas em $fixtureRoot"
