# Now Now Tours & Safaris - Discover Africa 🌍

A modern, responsive tourism website showcasing African adventures and tours. Built with React, TypeScript, Vite, and TailwindCSS.

## Features

- 🎨 Modern, responsive design with TailwindCSS
- 📱 Mobile-first approach
- 🖼️ Interactive image galleries
- 📞 Contact forms and WhatsApp integration
- ⬇️ Downloadable travel resources
- 🌐 Optimized for Cloudflare Pages deployment

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Icons**: React Icons
- **Deployment**: Cloudflare Pages

## Local Development

**Prerequisites:** Node.js 18+

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Cloudflare Pages Deployment

This project is configured for automatic deployment to Cloudflare Pages via GitHub integration.

### Build Settings for Cloudflare Pages:

- **Framework preset**: None (Custom)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node.js version**: 18+

### Files included for deployment:

- `wrangler.toml` - Cloudflare configuration
- `public/_redirects` - SPA routing configuration
- `.nvmrc` - Node.js version specification

## Project Structure

```
├── components/          # React components
├── public/             # Static assets
├── src/               # Source files
│   └── index.css      # TailwindCSS imports
├── dist/              # Build output
├── favicon.svg        # Site icon
├── wrangler.toml      # Cloudflare config
└── _redirects         # Routing config
```

## Deployment Instructions

1. **Connect to GitHub**: Link your Cloudflare Pages account to this GitHub repository
2. **Configure Build**: Use the settings mentioned above
3. **Deploy**: Cloudflare Pages will automatically build and deploy on every push to main branch

## Environment Variables

No environment variables are required for the basic functionality. The site runs entirely client-side.

## License

This project is private and proprietary to Now Now Tours & Safaris.
