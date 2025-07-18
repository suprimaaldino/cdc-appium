$emulatorExe = "C:\Users\aldino_s890\AppData\Local\Android\Sdk\emulator\emulator.exe"
$avdName = "Pixel_4_API_30"

# Kill emulator process if running
Get-Process | Where-Object { $_.ProcessName -like "qemu*" } | Stop-Process -Force

# Check disk space
$drive = Get-PSDrive C
if ($drive.Free -lt 10GB) {
    Write-Host "❌ Not enough disk space. Emulator needs at least 10GB free."
    exit
}

# Start emulator with wipe-data
if (Test-Path $emulatorExe) {
    Write-Host "✅ Emulator found. Resetting and starting AVD '$avdName'..."
    Start-Process $emulatorExe -ArgumentList "-avd $avdName -wipe-data -no-snapshot -gpu swiftshader_indirect"
} else {
    Write-Host "❌ Emulator not found at $emulatorExe"
}