# Cloudflare Pages Setup Instructions

## Issue Diagnosis
The MIME type errors are occurring because Cloudflare Pages is not running the build process and is deploying raw source files instead of the built `dist` folder.

## Required Cloudflare Pages Settings

### In your Cloudflare Pages dashboard, ensure these settings:

1. **Framework preset**: `None` or `Vite`
2. **Build command**: `npm run build`
3. **Build output directory**: `dist`
4. **Root directory**: Leave empty (use root)
5. **Node.js version**: `18` (specified in .nvmrc)

### Environment Variables (if needed)
- No environment variables required for basic functionality

## Files Configured for Proper MIME Types

### ✅ `/public/_headers` (gets copied to `/dist/_headers`)
This file configures proper MIME types for all resources:
- JavaScript modules: `application/javascript; charset=utf-8`
- CSS files: `text/css; charset=utf-8`
- Images: proper image MIME types
- Security headers included

### ✅ `/public/_redirects` (gets copied to `/dist/_redirects`)
SPA routing configuration for React Router compatibility

### ✅ `/functions/_headers` (backup configuration)
Alternative headers file location for Cloudflare Functions

## Build Verification

The build process should:
1. Run `npm install` to install dependencies
2. Run `npm run build` to create production build
3. Output files to `/dist` directory
4. Include `_headers` and `_redirects` files in the output

## Troubleshooting

If the issue persists:

1. **Check Build Output Directory**: Ensure Cloudflare is deploying from `/dist`, not root
2. **Verify Build Command**: Make sure `npm run build` is specified in dashboard
3. **Check Node.js Version**: Ensure Node.js 18+ is being used
4. **Manual Deployment**: Try deploying via Wrangler CLI if dashboard fails

## Expected Result
After proper configuration, JavaScript modules should load without MIME type errors.