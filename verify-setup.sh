#!/bin/bash
# Foiné Production Setup Verification Script
# Run this after configuring Supabase and Cloudinary

echo "🔍 Verifying Foiné Production Setup..."
echo "========================================"

# Check if application.properties exists and has real values
if grep -q "YOUR_SUPABASE_HOST\|YOUR_DATABASE_PASSWORD\|YOUR_CLOUD_NAME" src/main/resources/application.properties; then
    echo "❌ ERROR: application.properties still contains placeholder values!"
    echo "   Please update with your actual Supabase and Cloudinary credentials."
    exit 1
else
    echo "✅ application.properties configured with real credentials"
fi

# Check if PostgreSQL dependency is present
if grep -q "postgresql" pom.xml; then
    echo "✅ PostgreSQL dependency found in pom.xml"
else
    echo "❌ ERROR: PostgreSQL dependency missing from pom.xml"
    exit 1
fi

# Check if H2 dependency is removed
if grep -q "h2database" pom.xml; then
    echo "⚠️  WARNING: H2 dependency still present (can be removed for production)"
else
    echo "✅ H2 dependency removed (production-ready)"
fi

echo ""
echo "🚀 Ready to test! Run these commands:"
echo "1. mvn clean compile"
echo "2. mvn spring-boot:run"
echo "3. npm run dev (in another terminal)"
echo ""
echo "Then visit http://localhost:2049 and test registration/upload!"
echo ""
echo "📊 Check your Supabase dashboard at https://supabase.com/dashboard"
echo "   to verify users and posts are being saved."