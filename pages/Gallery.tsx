import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_IMAGES } from '../constants';
import GalleryGrid from '../components/GalleryGrid';

// Placeholder for Instagram integration
interface InstagramPhotoData {
  id: string;
  url: string;
  caption?: string;
}

/**
 * Placeholder function to fetch photos from Instagram Graph API.
 * Replace with actual Instagram Graph API implementation.
 * @param accessToken Instagram Graph API access token
 * @param count Number of photos to fetch
 * @returns Promise of Instagram photo data
 */
const fetchInstagramPhotos = async (
  accessToken?: string,
  count: number = 12
): Promise<InstagramPhotoData[]> => {
  // TODO: Replace with real Instagram Graph API calls
  // Example endpoint: https://graph.instagram.com/v18.0/me/media?fields=id,media_type,media_url,caption&access_token={token}

  if (!accessToken) {
    console.warn(
      'No Instagram access token provided. Using placeholder data.'
    );
  }

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return placeholder data
      resolve(
        (GALLERY_IMAGES || []).slice(0, count).map((url, idx) => ({
          id: `ig_${idx}`,
          url,
          caption: 'Amazing moment from our tour!',
        }))
      );
    }, 600);
  });
};

// Instagram integration will be shown inline below the grid when loaded

const PLACEHOLDER_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?auto=format&fit=crop&w=1600&q=80',
];

const GalleryPage: React.FC = () => {
  const initialImages = [...PLACEHOLDER_IMAGES, ...(GALLERY_IMAGES || [])];
  const ensureMinimum = (arr: string[], min = 3) => {
    if (arr.length >= min) return arr;
    const extras = PLACEHOLDER_IMAGES.filter((url) => !arr.includes(url));
    return [...arr, ...extras.slice(0, min - arr.length)];
  };
  const [images] = useState<string[]>(ensureMinimum(initialImages, 3));
  const [isLoading] = useState(false);

  const handleLoadInstagram = async () => {
    setIsLoading(true);
    try {
      const photos = await fetchInstagramPhotos(undefined, 12);
      setImages(photos.map((p) => p.url));
    } catch (err) {
      console.error('Failed to load Instagram photos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="py-16 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          {/* Gallery Grid with heading retained */}
          <GalleryGrid
            images={images}
            title="Our Journeys & Memories"
            description="A curated collection of moments from our tours across Africa — landscapes, wildlife, people, and unforgettable experiences. Click any photo to view it in detail."
          />

          {/* Instagram integration placeholder removed; using built-in placeholders */}

          {/* Back to Home */}
          <div className="mt-16 text-center">
            <a
              href="/"
              className="inline-block px-8 py-3 rounded-full bg-white text-black hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default GalleryPage;
