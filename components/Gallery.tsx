import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_IMAGES } from '../constants';
import { ScrollMotion } from '../motion/MotionWrapper';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { fadeUp, staggerContainer, scaleIn } from '../motion/motionVariants';
import { ImageLightbox } from './ImageLightbox';

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ExpandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

interface GalleryImageProps {
  src: string;
  index: number;
  onClick: (index: number) => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ src, index, onClick }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Random height for masonry effect (but keep consistent per image)
  const heights = ['h-64', 'h-80', 'h-96', 'h-72'];
  const heightClass = heights[index % heights.length];

  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay: prefersReducedMotion ? 0 : (index % 8) * 0.1, // Stagger by column position
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.2,
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl ${heightClass} bg-stone-100`}
      variants={imageVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      whileHover={{
        scale: prefersReducedMotion ? 1 : 1.02,
        y: prefersReducedMotion ? 0 : -4,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      }}
      onClick={() => onClick(index)}
    >
      {/* Image */}
      <motion.img
        src={src}
        alt={`Gallery image ${index + 1} - Beautiful moments from our African tours`}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        whileHover={{
          scale: prefersReducedMotion ? 1 : 1.05,
          transition: {
            duration: 0.3,
            ease: 'easeOut',
          },
        }}
      />
      
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        variants={overlayVariants}
        initial="initial"
        whileHover="hover"
      />
      
      {/* View Button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={overlayVariants}
        initial="initial"
        whileHover="hover"
      >
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg"
          whileHover={{ 
            scale: prefersReducedMotion ? 1 : 1.1,
            backgroundColor: 'rgba(255, 255, 255, 1)'
          }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
        >
          <ExpandIcon className="w-6 h-6 text-sky-700" />
        </motion.div>
      </motion.div>
      
      {/* Image Number */}
      <motion.div
        className="absolute top-3 left-3 bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm"
        variants={overlayVariants}
        initial="initial"
        whileHover="hover"
      >
        {index + 1}
      </motion.div>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [headerRef, isHeaderVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  // Split images into columns for masonry layout
  const columns = 4;
  const imageColumns: string[][] = Array.from({ length: columns }, () => []);
  
  GALLERY_IMAGES.forEach((image, index) => {
    imageColumns[index % columns].push(image);
  });

  return (
    <>
      <section className="section-spacing bg-gradient-to-br from-white via-stone-50 to-sky-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-sky-50/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-orange-50/30 to-transparent pointer-events-none" />
        
        <div className="max-width-container container-padding relative z-10">
          {/* Section Header */}
          <ScrollMotion
            ref={headerRef}
            className="text-center mb-16"
            type="fadeUp"
            threshold={0.3}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-sky-800 mb-6"
              variants={fadeUp}
            >
              Past Tours <span className="gradient-text">Gallery</span>
            </motion.h2>
            <motion.p 
              className="text-lg lg:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed mb-8"
              variants={fadeUp}
            >
              Moments we've shared, memories we've made. 
              Explore the breathtaking destinations and unforgettable experiences 
              from our past adventures across Africa.
            </motion.p>
            
            {/* Decorative Element */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-sky-500 to-orange-500 mx-auto rounded-full"
              variants={fadeUp}
            />
          </ScrollMotion>

          {/* Masonry Gallery - Desktop */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {imageColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-6">
                {column.map((image, imageIndex) => {
                  const globalIndex = columnIndex + imageIndex * columns;
                  return (
                    <GalleryImage
                      key={globalIndex}
                      src={image}
                      index={globalIndex}
                      onClick={handleImageClick}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Regular Grid - Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
            {GALLERY_IMAGES.map((image, index) => (
              <GalleryImage
                key={index}
                src={image}
                index={index}
                onClick={handleImageClick}
              />
            ))}
          </div>

          {/* Gallery Stats */}
          <ScrollMotion
            className="text-center mt-16"
            type="fadeUp"
            threshold={0.3}
          >
            <motion.div 
              className="bg-gradient-to-r from-sky-600 to-orange-500 rounded-3xl p-8 md:p-12 text-white"
              variants={fadeUp}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { number: '1000+', label: 'Photos Captured', sublabel: 'across all our tours' },
                  { number: '50+', label: 'Destinations Visited', sublabel: 'throughout Africa' },
                  { number: '500+', label: 'Happy Moments', sublabel: 'shared with travelers' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                      },
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sky-100 text-sm">
                      {stat.sublabel}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-8 pt-8 border-t border-white/20"
                variants={fadeUp}
              >
                <p className="text-sky-100 text-lg mb-4">
                  Ready to create your own memories?
                </p>
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="bg-white text-sky-700 font-semibold py-3 px-8 rounded-full hover:bg-stone-100 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Adventure
                </motion.button>
              </motion.div>
            </motion.div>
          </ScrollMotion>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={GALLERY_IMAGES}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </>
  );
};

export default Gallery;