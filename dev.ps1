# Yu-Gi-Oh! Card Collection Manager - Dev Startup (PowerShell)
# Usage: .\dev.ps1

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting backend (Django :8000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; if (Test-Path 'venv\Scripts\Activate.ps1') { .\venv\Scripts\Activate.ps1 }; python manage.py runserver"

Write-Host "Starting frontend (React :3000)..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm start"

Write-Host "Both services launching in separate windows." -ForegroundColor Green
