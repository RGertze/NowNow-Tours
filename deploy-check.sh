#!/bin/bash
# Deployment verification script for NowNow Tours

echo "🔍 Checking deployment readiness..."

# Check if dist directory exists and has required files
if [ -d "dist" ]; then
    echo "✅ dist directory exists"
    
    if [ -f "dist/index.html" ]; then
        echo "✅ dist/index.html exists"
    else
        echo "❌ dist/index.html missing"
        exit 1
    fi
    
    if [ -f "dist/_headers" ]; then
        echo "✅ dist/_headers exists"
        echo "   Headers content preview:"
        head -n 5 dist/_headers | sed 's/^/   /'
    else
        echo "❌ dist/_headers missing"
        exit 1
    fi
    
    if [ -f "dist/_redirects" ]; then
        echo "✅ dist/_redirects exists"
    else
        echo "❌ dist/_redirects missing"
        exit 1
    fi
    
    if [ -d "dist/assets" ]; then
        echo "✅ dist/assets directory exists"
        echo "   Assets count: $(find dist/assets -type f | wc -l) files"
    else
        echo "❌ dist/assets directory missing"
        exit 1
    fi
else
    echo "❌ dist directory doesn't exist - run 'npm run build' first"
    exit 1
fi

# Check package.json scripts
if grep -q "\"build\":" package.json; then
    echo "✅ Build script exists in package.json"
else
    echo "❌ Build script missing in package.json"
    exit 1
fi

# Check .nvmrc
if [ -f ".nvmrc" ]; then
    node_version=$(cat .nvmrc)
    echo "✅ .nvmrc exists (Node.js $node_version)"
else
    echo "⚠️ .nvmrc missing"
fi

echo ""
echo "📋 Cloudflare Pages Configuration Required:"
echo "   Build command: npm run build"
echo "   Build output directory: dist"
echo "   Node.js version: $(cat .nvmrc || echo '18+')"
echo ""
echo "🎉 Deployment check completed successfully!"