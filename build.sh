#!/bin/bash
set -e

echo "🚀 Starting NowNow Tours build process..."

# Show Node.js version
echo "📦 Node.js version: $(node --version)"
echo "📦 npm version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

# Verify build output
echo "✅ Build verification:"
ls -la dist/

# Check if critical files exist
if [ -f "dist/index.html" ]; then
    echo "✅ index.html exists"
else
    echo "❌ index.html missing"
    exit 1
fi

if [ -d "dist/assets" ]; then
    echo "✅ assets directory exists"
    echo "   Assets: $(ls dist/assets/)"
else
    echo "❌ assets directory missing"
    exit 1
fi

echo "🎉 Build completed successfully!"