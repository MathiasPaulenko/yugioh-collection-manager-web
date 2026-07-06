# Yu-Gi-Oh! Card Collection Manager - Setup (PowerShell)
# Usage: .\setup.ps1

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$ErrorActionPreference = "Stop"

Write-Host "=== Setting up backend ===" -ForegroundColor Cyan
Push-Location "$root\backend"

if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"

Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

Pop-Location

Write-Host "=== Setting up frontend ===" -ForegroundColor Magenta
Push-Location "$root\frontend"

Write-Host "Installing Node dependencies..." -ForegroundColor Yellow
npm install

Pop-Location

Write-Host "=== Setup complete ===" -ForegroundColor Green
Write-Host "Run .\dev.ps1 to start both services." -ForegroundColor Green
