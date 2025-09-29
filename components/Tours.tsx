import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TOURS_DATA } from '../constants';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ScrollMotion } from '../motion/MotionWrapper';
import { staggerContainer, fadeUp, hoverLift } from '../motion/motionVariants';
import { TourQuickView } from './TourQuickView';
import type { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
  index: number;
  onQuickView: (tour: Tour) => void;
}

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TourCard: React.FC<TourCardProps> = ({ tour, index, onQuickView }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  });

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % tour.images.length);
  };

  const handleQuickView = () => {
    onQuickView(tour);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi! I'm interested in the ${tour.name} tour to ${tour.destination}. Could you provide more details?`;
    const url = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Card tilt effect variants
  const cardVariants = {
    initial: {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: "0 4px 25px -5px rgba(0, 0, 0, 0.1)",
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      rotateX: prefersReducedMotion ? 0 : -5,
      rotateY: prefersReducedMotion ? 0 : 5,
      scale: prefersReducedMotion ? 1 : 1.03,
      y: prefersReducedMotion ? 0 : -12,
      boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const quickViewVariants = {
    initial: { 
      opacity: 0, 
      y: 10,
      scale: 0.9 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.2,
        ease: "easeOut",
      }
    },
  };

  const whatsappPulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: prefersReducedMotion ? 1 : [1, 1.02, 1],
      transition: {
        duration: prefersReducedMotion ? 0.01 : 3,
        repeat: prefersReducedMotion ? 0 : Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
      variants={cardVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleQuickView}
      style={{
        transformStyle: "preserve-3d",
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
    >
      {/* Image Section */}
      <div className="relative w-full h-64 overflow-hidden bg-stone-100">
        <motion.div
          className="flex transition-transform ease-out duration-500 h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          variants={imageVariants}
        >
          {tour.images.map((src, imgIndex) => (
            <motion.img
              key={imgIndex}
              src={src}
              alt={`${tour.name} view ${imgIndex + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
              loading={index < 2 ? "eager" : "lazy"} // Prioritize first few cards
              decoding="async"
            />
          ))}
        </motion.div>

        {/* Image Navigation */}
        {tour.images.length > 1 && (
          <>
            <motion.button
              onClick={prevImage}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              onClick={nextImage}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </motion.button>

            {/* Image Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {tour.images.map((_, imgIndex) => (
                <motion.button
                  key={imgIndex}
                  aria-label={`Go to image ${imgIndex + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === imgIndex ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setCurrentIndex(imgIndex);
                  }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.2 }}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick View Button Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          variants={quickViewVariants}
          initial="initial"
          animate={isHovered ? "animate" : "initial"}
        >
          <motion.button
            onClick={handleQuickView}
            className="bg-white/90 backdrop-blur-sm text-sky-800 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
            whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
          >
            <EyeIcon className="w-5 h-5" />
            Quick View
          </motion.button>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <motion.div
          className="mb-4"
          variants={fadeUp}
        >
          <h3 className="text-xl lg:text-2xl font-bold font-display text-sky-800 mb-2 leading-tight group-hover:text-sky-700 transition-colors duration-200">
            {tour.name}
          </h3>
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide mb-3">
            {tour.destination}
          </p>
          <p className="text-stone-600 leading-relaxed line-clamp-3">
            {tour.description}
          </p>
        </motion.div>

        {/* Quick Highlights */}
        <motion.div className="mb-4" variants={fadeUp}>
          <h4 className="font-semibold text-sky-800 mb-2 text-sm uppercase tracking-wide">
            Highlights:
          </h4>
          <div className="flex flex-wrap gap-2">
            {tour.itinerary.slice(0, 2).map((item, idx) => (
              <span
                key={idx}
                className="inline-block bg-sky-50 text-sky-700 text-xs px-3 py-1 rounded-full"
              >
                {item.split(' ').slice(0, 2).join(' ')}...
              </span>
            ))}
            <span className="inline-block bg-orange-50 text-orange-600 text-xs px-3 py-1 rounded-full">
              +{tour.itinerary.length - 2} more
            </span>
          </div>
        </motion.div>

        {/* Price */}
        <motion.p 
          className="text-lg lg:text-xl font-bold text-sky-800 mb-4"
          variants={fadeUp}
        >
          {tour.priceRange}
        </motion.p>

        {/* WhatsApp CTA */}
        <motion.button
          onClick={handleWhatsApp}
          className="mt-auto w-full text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          variants={whatsappPulseVariants}
          initial="initial"
          animate="animate"
          whileHover={{ 
            scale: prefersReducedMotion ? 1 : 1.02,
            y: prefersReducedMotion ? 0 : -1
          }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
        >
          <i className="fab fa-whatsapp text-lg" />
          <span>Contact on WhatsApp</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Tours: React.FC = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [headerRef, isHeaderVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  const handleQuickView = (tour: Tour) => {
    setSelectedTour(tour);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    // Small delay to allow animation to complete before clearing tour
    setTimeout(() => setSelectedTour(null), 300);
  };

  return (
    <>
      <section className="section-spacing bg-gradient-to-br from-stone-50 to-stone-100">
        <div className="max-width-container container-padding">
          {/* Section Header */}
          <ScrollMotion
            ref={headerRef}
            className="text-center mb-16"
            type="fadeUp"
            threshold={0.3}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-sky-800 mb-4"
              variants={fadeUp}
            >
              Our <span className="gradient-text">Adventures</span>
            </motion.h2>
            <motion.p 
              className="text-lg lg:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed"
              variants={fadeUp}
            >
              Curated experiences for the modern traveler. 
              Each journey is crafted with attention to detail and authentic local connections.
            </motion.p>
            
            {/* Decorative Element */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-sky-500 to-orange-500 mx-auto mt-6 rounded-full"
              variants={fadeUp}
            />
          </ScrollMotion>

          {/* Tours Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {TOURS_DATA.map((tour, index) => (
              <TourCard
                key={`${tour.name}-${index}`}
                tour={tour}
                index={index}
                onQuickView={handleQuickView}
              />
            ))}
          </motion.div>

          {/* Call to Action */}
          <ScrollMotion
            className="text-center mt-16"
            type="fadeUp"
            threshold={0.3}
          >
            <motion.p 
              className="text-stone-600 mb-6 text-lg"
              variants={fadeUp}
            >
              Don't see what you're looking for? We create custom experiences too.
            </motion.p>
            <motion.button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              variants={fadeUp}
              whileHover={{ 
                scale: 1.05,
                y: -2 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Plan Custom Adventure
            </motion.button>
          </ScrollMotion>
        </div>
      </section>

      {/* Quick View Modal */}
      <TourQuickView
        tour={selectedTour}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </>
  );
};

export default Tours;