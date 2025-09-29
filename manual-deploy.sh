#!/bin/bash
# Manual deployment script as backup if Cloudflare auto-build fails

echo "🔨 Building project locally..."
npm run build

echo "📦 Preparing deployment package..."
cd dist

echo "📋 Files to be deployed:"
find . -type f | head -10

echo ""
echo "🚀 Manual deployment options:"
echo "1. Drag and drop the entire 'dist' folder contents to Cloudflare Pages"
echo "2. Or use wrangler CLI: npx wrangler pages deploy dist"
echo ""
echo "✅ The dist folder contains:"
echo "   - index.html (built)"
echo "   - assets/*.js (compiled JavaScript)"
echo "   - assets/*.css (processed CSS)"  
echo "   - _headers (MIME type configuration)"
echo "   - _redirects (SPA routing)"
echo ""
echo "🎯 This should resolve the MIME type errors!"