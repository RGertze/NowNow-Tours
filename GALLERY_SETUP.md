# Gallery Page Setup Guide

## Overview

The Gallery feature has been converted to TypeScript and refactored into reusable components:

1. **`components/GalleryGrid.tsx`** — Reusable grid component with lightbox modal
   - Responsive grid (1 col mobile, 2 cols tablet, 3-4 cols desktop)
   - Lazy-loaded images
   - Hover effects with captions
   - Lightbox modal with keyboard navigation (arrow keys, Escape)
   - Image preloading for smooth navigation

2. **`pages/Gallery.tsx`** — Dedicated Gallery page route
   - Uses `GalleryGrid` component
   - Instagram placeholder section with load button
   - `fetchInstagramPhotos()` placeholder for future API integration
   - Back to Home link

3. **`App.tsx`** — Updated with React Router
   - `/` route for Home (existing sections)
   - `/gallery` route for the new Gallery page

4. **`components/Footer.tsx`** — Updated with routing
   - Gallery link now navigates to `/gallery`
   - Uses `react-router-dom` Link component

## Installation

Install react-router-dom if not already installed:

```bash
npm install react-router-dom
```

## Usage

### Access the Gallery Page

- **Via Footer**: Click "Gallery" in the footer Quick Links
- **Direct URL**: Navigate to `/gallery`

### GalleryGrid Component (Reusable)

Use on any page:

```tsx
import GalleryGrid from './components/GalleryGrid';
import { GALLERY_IMAGES } from './constants';

<GalleryGrid
  images={GALLERY_IMAGES}
  title="Our Adventures"
  description="Amazing moments from our tours"
/>
```

### Instagram Integration Placeholder

The `pages/Gallery.tsx` includes a placeholder function `fetchInstagramPhotos()` to prepare for future Instagram Graph API integration.

**To implement:**

1. Get Instagram Graph API access token (Business Account + permissions)
2. Replace the placeholder function:

```tsx
const fetchInstagramPhotos = async (
  accessToken: string,
  count: number = 12
): Promise<InstagramPhotoData[]> => {
  const response = await fetch(
    `https://graph.instagram.com/v18.0/me/media?fields=id,media_type,media_url,caption&access_token=${accessToken}`
  );
  const data = await response.json();
  return data.data.map((item) => ({
    id: item.id,
    url: item.media_url,
    caption: item.caption || '',
  }));
};
```

3. Store the access token securely (environment variable or backend)
4. Pass it to `handleLoadInstagram()` call

## Features

### Responsive Grid

- **Desktop (lg)**: 3-4 columns
- **Tablet (sm)**: 2 columns
- **Mobile**: 1 column

### Lightbox Modal

- Click any image to open fullscreen preview
- **Navigation**:
  - Click arrows (‹ ›) to move between images
  - Press arrow keys (← →) for keyboard nav
  - Press Escape to close
- **Display**:
  - Current image counter (e.g., "3 / 12")
  - Lazy-loaded next/prev images for smooth transitions

### Performance Optimizations

- Lazy-loaded images (`loading="lazy"`)
- Image preloading for neighbors in lightbox
- Efficient re-renders with React.FC type safety

## File Structure

```
Now Now Tours & Safaris/
├── components/
│   ├── GalleryGrid.tsx          (NEW - reusable grid + lightbox)
│   ├── Gallery.tsx              (existing - slider component)
│   ├── Footer.tsx               (UPDATED - routing)
│   └── ...
├── pages/
│   ├── Gallery.tsx              (NEW - gallery page route)
│   └── ...
├── App.tsx                      (UPDATED - router setup)
├── constants.ts                 (uses GALLERY_IMAGES)
└── ...
```

## Future Enhancements

- [ ] Instagram Graph API integration
- [ ] Photo filtering by destination/category
- [ ] Download high-resolution images
- [ ] Share buttons for social media
- [ ] Photo upload for user-generated content
- [ ] Infinite scroll pagination
- [ ] Slideshow auto-play option
