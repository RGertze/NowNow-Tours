import React from 'react';
import { motion } from 'framer-motion';
import galleryConfig from '../content/gallery.json';

const Memories: React.FC = () => {
  const images: string[] = Array.isArray((galleryConfig as any).images) && (galleryConfig as any).images.length > 0
    ? (galleryConfig as any).images
        .filter((name: string) => typeof name === 'string' && !name.toLowerCase().includes('gitkeep'))
        .sort((a: string, b: string) => a.localeCompare(b))
        .map((name: string) => name.startsWith('/images/gallery/') ? name : `/images/gallery/${name}`)
    : [];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-baobab-800 mb-4">
            Memories from Our Adventures
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Relive the magical moments captured during our tours across Africa
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((url, index) => (
              <motion.div
                key={url + index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-square"
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold">Adventure Memory</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-600 mb-4">Want to see more photos and videos?</p>
            <a
              href="/gallery"
              className="inline-block px-8 py-3 bg-sunset-500 hover:bg-sunset-600 text-white rounded-lg font-semibold transition-colors"
            >
              View Full Gallery
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Memories;
