# Script para generar er-diagram.png desde er-diagram.puml usando plantuml.jar
# Uso: ejecutar desde PowerShell en la carpeta raíz del proyecto:
#   cd C:\Users\ENV\OneDrive\Documentos\practicaservidores\typeorm-uleam-reservas
#   docs\generate-er-diagram.ps1

$docsDir = Join-Path $PSScriptRoot ""
Set-Location $docsDir

$jarPath = Join-Path $docsDir 'plantuml.jar'
if (-not (Test-Path $jarPath)) {
    Write-Host "No se encontró plantuml.jar en $jarPath. Intenta descargarlo manualmente y colocarlo ahí."
    Write-Host "Ejemplo de URL (verifica la versión): https://github.com/plantuml/plantuml/releases"
    exit 1
}

Write-Host "Generando imagen a partir de er-diagram.puml..."
java -jar $jarPath er-diagram.puml
if ($LASTEXITCODE -eq 0) {
    Write-Host "Imagen generada: er-diagram.png"
} else {
    Write-Host "Error al ejecutar plantuml.jar (código: $LASTEXITCODE)"
}
