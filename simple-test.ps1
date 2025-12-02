# Simple test for Foiné application

Write-Host "🧪 Testing Foiné Application" -ForegroundColor Cyan

# Test backend connectivity
Write-Host "`n🔍 Testing Backend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/posts" -Method GET
    Write-Host "✅ Backend running! Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend not accessible: $($_.Exception.Message)" -ForegroundColor Red
}

# Test user registration
Write-Host "`n👤 Testing User Registration..." -ForegroundColor Yellow
try {
    $body = @{ username="testuser"; email="test@example.com"; password="password123" } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ Registration successful! Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test user login
Write-Host "`n🔐 Testing User Login..." -ForegroundColor Yellow
try {
    $body = @{ usernameOrEmail="testuser"; password="password123" } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ Login successful! Status: $($response.StatusCode)" -ForegroundColor Green

    # Extract token
    $result = $response.Content | ConvertFrom-Json
    $token = $result.token
    Write-Host "🎫 JWT Token received" -ForegroundColor Green
} catch {
    Write-Host "❌ Login failed: $($_.Exception.Message)" -ForegroundColor Red
    $token = $null
}

# Test frontend
Write-Host "`n🌐 Testing Frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:2049" -Method GET -TimeoutSec 5
    Write-Host "✅ Frontend accessible! Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Frontend not accessible (may need manual start)" -ForegroundColor Yellow
}

Write-Host "`n🎉 Basic testing complete!" -ForegroundColor Cyan