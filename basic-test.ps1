# Test Foiné application

Write-Host "Testing Foiné Application" -ForegroundColor Cyan

# Test backend
Write-Host "`nTesting Backend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/posts" -Method GET
    Write-Host "Backend running! Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Backend not accessible: $($_.Exception.Message)" -ForegroundColor Red
}

# Test registration
Write-Host "`nTesting User Registration..." -ForegroundColor Yellow
try {
    $body = @{ username="testuser"; email="test@example.com"; password="password123" } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" -Method POST -Body $body -ContentType "application/json"
    Write-Host "Registration successful! Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Registration failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test login
Write-Host "`nTesting User Login..." -ForegroundColor Yellow
try {
    $body = @{ usernameOrEmail="testuser"; password="password123" } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" -Method POST -Body $body -ContentType "application/json"
    Write-Host "Login successful! Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Login failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTesting complete!" -ForegroundColor Cyan