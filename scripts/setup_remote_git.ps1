# Quick Remote Git Setup for AKUL DRAVIN GROUP Enterprise Platform
param(
    [string]$RemoteUrl
)

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  AKUL DRAVIN DIGITAL ENTERPRISE • GIT REMOTE SETUP" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan

if (-not $RemoteUrl) {
    Write-Host "`nUsage:" -ForegroundColor Yellow
    Write-Host "  powershell -ExecutionPolicy Bypass -File scripts\setup_remote_git.ps1 -RemoteUrl 'https://github.com/YOUR_USERNAME/ad-digital.git'" -ForegroundColor Gray
    Write-Host "`nOr provide the remote URL interactively:" -ForegroundColor Yellow
    $RemoteUrl = Read-Host "Enter GitHub/GitLab Repository URL"
}

if ($RemoteUrl) {
    Write-Host "`nConfiguring remote 'origin' -> $RemoteUrl" -ForegroundColor Green
    git remote remove origin 2>$null
    git remote add origin $RemoteUrl
    Write-Host "Pushing master branch to origin..." -ForegroundColor Green
    git push -u origin master
    Write-Host "`n✓ Repository successfully pushed to remote!" -ForegroundColor Green
} else {
    Write-Host "`n[!] No remote URL provided. Skipped remote push." -ForegroundColor Red
}
