# Script to open generated PDF deliverables in Adobe Acrobat or default system PDF handler
$pdf1 = "c:\Projects\AD DDIGITAL\AD_DIGITAL_Website_Audit_Deployment_Report.pdf"
$pdf2 = "c:\Projects\AD DDIGITAL\Vedic_Janam_Kundli_Certificate.pdf"

$acrobatCandidates = @(
    "C:\Program Files\Adobe\Acrobat DC\Acrobat\Acrobat.exe",
    "C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\AcroRd32.exe",
    "C:\Program Files\Adobe\Acrobat Reader DC\Reader\AcroRd32.exe",
    "C:\Program Files\Adobe\Acrobat Reader\Reader\AcroRd32.exe",
    "C:\Program Files (x86)\Adobe\Reader 11.0\Reader\AcroRd32.exe"
)

$acrobatPath = $null
foreach ($path in $acrobatCandidates) {
    if (Test-Path $path) {
        $acrobatPath = $path
        break
    }
}

if ($acrobatPath) {
    Write-Output "Found Adobe Acrobat at: $acrobatPath"
    Start-Process -FilePath $acrobatPath -ArgumentList "`"$pdf1`""
    Start-Process -FilePath $acrobatPath -ArgumentList "`"$pdf2`""
    Write-Output "Successfully launched both PDFs in Adobe Acrobat."
} else {
    Write-Output "Adobe Acrobat binary path not in standard directory. Launching with default system PDF viewer..."
    Start-Process -FilePath $pdf1
    Start-Process -FilePath $pdf2
    Write-Output "Successfully launched both PDFs in default Windows PDF viewer."
}
