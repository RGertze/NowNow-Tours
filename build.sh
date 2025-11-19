#!/bin/bash
set -e

echo "🚀 Starting Now Now Tours & Safaris build process..."

# Show Node.js version
echo "📦 Node.js version: $(node --version)"
echo "📦 npm version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Build the project
echo "🔨 Building project..."
npm run build

# Ensure critical configuration files are present
echo "📋 Ensuring configuration files..."
if [ -f "public/_headers" ]; then
    echo "✅ _headers file found in public/"
else
    echo "❌ _headers file missing in public/"
    exit 1
fi

if [ -f "public/_redirects" ]; then
    echo "✅ _redirects file found in public/"
else
    echo "❌ _redirects file missing in public/"
    exit 1
fi

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

if [ -f "dist/_headers" ]; then
    echo "✅ _headers exists in dist/"
else
    echo "❌ _headers missing in dist/"
    exit 1
fi

if [ -f "dist/_redirects" ]; then
    echo "✅ _redirects exists in dist/"
else
    echo "❌ _redirects missing in dist/"
    exit 1
fi

if [ -d "dist/assets" ]; then
    echo "✅ assets directory exists"
    echo "   Assets: $(ls dist/assets/)"
else
    echo "❌ assets directory missing"
    exit 1
fi

# Check JavaScript files have correct extensions
js_files=$(find dist/assets -name "*.js" | wc -l)
if [ "$js_files" -gt 0 ]; then
    echo "✅ JavaScript files found: $js_files"
else
    echo "❌ No JavaScript files found in assets"
    exit 1
fi

echo "🎉 Build completed successfully!"