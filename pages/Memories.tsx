import React from 'react';
import { motion } from 'framer-motion';

const Memories: React.FC = () => {
  const galleryImages = [
    { id: 1, url: '/gallery/safari-1.jpg', caption: 'Wildlife Safari Experience' },
    { id: 2, url: '/gallery/beach-1.jpg', caption: 'Beach Paradise' },
    { id: 3, url: '/gallery/mountain-1.jpg', caption: 'Mountain Adventures' },
    { id: 4, url: '/gallery/culture-1.jpg', caption: 'Cultural Encounters' },
    { id: 5, url: '/gallery/sunset-1.jpg', caption: 'Spectacular Sunsets' },
    { id: 6, url: '/gallery/group-1.jpg', caption: 'Group Memories' },
    { id: 7, url: '/gallery/waterfall-1.jpg', caption: 'Victoria Falls Wonder' },
    { id: 8, url: '/gallery/food-1.jpg', caption: 'Local Cuisine' },
    { id: 9, url: '/gallery/activity-1.jpg', caption: 'Adventure Activities' },
  ];

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
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-square"
              >
                <div
                  className="w-full h-full bg-gradient-to-br from-safari-200 to-sunset-200 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-semibold">{image.caption}</p>
                  </div>
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
