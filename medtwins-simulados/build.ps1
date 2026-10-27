param([string]$PhpPath = '')
& (Join-Path (Split-Path $PSScriptRoot -Parent) 'scripts/build.ps1') -Plugin simulados -PhpPath $PhpPath
