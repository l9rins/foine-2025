@echo off
REM Foiné Production Setup Verification Script
REM Run this after configuring Supabase and Cloudinary

echo 🔍 Verifying Foiné Production Setup...
echo ========================================
echo.

REM Check if application.properties exists and has real values
findstr /C:"YOUR_SUPABASE_HOST" src\main\resources\application.properties >nul 2>&1
if %errorlevel% equ 0 (
    echo ❌ ERROR: application.properties still contains placeholder values!
    echo    Please update with your actual Supabase and Cloudinary credentials.
    exit /b 1
) else (
    echo ✅ application.properties configured with real credentials
)

REM Check if PostgreSQL dependency is present
findstr /C:"postgresql" pom.xml >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ PostgreSQL dependency found in pom.xml
) else (
    echo ❌ ERROR: PostgreSQL dependency missing from pom.xml
    exit /b 1
)

REM Check if H2 dependency is removed
findstr /C:"h2database" pom.xml >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  WARNING: H2 dependency still present (can be removed for production)
) else (
    echo ✅ H2 dependency removed (production-ready)
)

echo.
echo 🚀 Ready to test! Run these commands:
echo 1. mvn clean compile
echo 2. mvn spring-boot:run
echo 3. npm run dev (in another terminal)
echo.
echo Then visit http://localhost:2049 and test registration/upload!
echo.
echo 📊 Check your Supabase dashboard at https://supabase.com/dashboard
echo    to verify users and posts are being saved.
echo.
pause