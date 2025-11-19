import React, { useState } from 'react';
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

// Placeholder loader card for Instagram section
const InstagramPlaceholder: React.FC<{ onLoad: () => void }> = ({
  onLoad,
}) => (
  <div className="w-full rounded-lg bg-gradient-to-br from-sunset-100 to-safari-100 p-8 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-sunset-300 mb-12">
    <div className="w-16 h-16 bg-gradient-to-br from-sunset-300 to-safari-500 rounded-full animate-pulse" />
    <div className="text-center">
      <p className="text-sm font-semibold text-safari-800 mb-2">
        Instagram Integration Coming Soon
      </p>
      <p className="text-xs text-baobab-600 mb-4 max-w-md">
        We're working to connect our Instagram feed here. Click below to load
        sample photos.
      </p>
    </div>
    <button
      onClick={onLoad}
      className="mt-2 text-xs px-4 py-2 rounded-full bg-sunset-500 hover:bg-sunset-600 text-white font-semibold transition-colors"
    >
      Load Sample Photos
    </button>
  </div>
);

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<string[]>(GALLERY_IMAGES || []);
  const [isLoading, setIsLoading] = useState(false);

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
    <main className="min-h-screen py-16 px-6 lg:px-16 bg-gradient-to-br from-safari-50 to-earth-50">
      <div className="max-w-7xl mx-auto">
        {/* Instagram Placeholder */}
        <InstagramPlaceholder onLoad={handleLoadInstagram} />

        {/* Gallery Grid */}
        <GalleryGrid
          images={images}
          title="Our Journeys & Memories"
          description="A curated collection of moments from our tours across Africa — landscapes, wildlife, people, and unforgettable experiences. Click any photo to view it in detail."
        />

        {/* Back to Home */}
        <div className="max-w-7xl mx-auto mt-16 text-center">
          <a
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-sunset-500 to-safari-600 hover:from-sunset-600 hover:to-safari-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;
