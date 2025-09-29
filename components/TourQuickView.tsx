import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { modalOverlay, modalContent, staggerContainer, fadeIn } from '../motion/motionVariants';
import type { Tour } from '../types';

interface TourQuickViewProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

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

const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
  </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
  </svg>
);

const CurrencyDollarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.467-.094-2.061-.494-1.172-.879-1.172-2.303 0-3.182C10.524 7.756 11.293 7.344 12 7.344V6" />
  </svg>
);

/**
 * Quick View Modal for Tour Details
 * Provides a lightweight preview without leaving the main page
 */
export const TourQuickView: React.FC<TourQuickViewProps> = ({ 
  tour, 
  isOpen, 
  onClose 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Reset image index when tour changes
  useEffect(() => {
    if (tour) {
      setCurrentImageIndex(0);
    }
  }, [tour]);

  // Handle escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabTrap);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first element
    setTimeout(() => {
      const firstButton = modalRef.current?.querySelector('button') as HTMLElement;
      firstButton?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabTrap);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const nextImage = () => {
    if (!tour) return;
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
  };

  const prevImage = () => {
    if (!tour) return;
    setCurrentImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length);
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${tour?.name} tour to ${tour?.destination}. Could you provide more details?`;
    const url = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!tour) return null;

  const imageNavVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.2
      }
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      transition: {
        duration: 0.2
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: prefersReducedMotion ? 1 : [1, 1.05, 1],
      transition: {
        duration: prefersReducedMotion ? 0.01 : 2,
        repeat: prefersReducedMotion ? 0 : Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          variants={modalOverlay}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 lightbox-overlay"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-strong"
            variants={modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5" />
            </motion.button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Image Section */}
              <div className="relative h-64 lg:h-full min-h-[300px] bg-stone-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={tour.images[currentImageIndex]}
                    alt={`${tour.name} - Image ${currentImageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        duration: prefersReducedMotion ? 0.01 : 0.3
                      }
                    }}
                    exit={{ 
                      opacity: 0,
                      transition: {
                        duration: prefersReducedMotion ? 0.01 : 0.2
                      }
                    }}
                  />
                </AnimatePresence>

                {/* Image Navigation */}
                {tour.images.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                      variants={imageNavVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                      aria-label="Previous image"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                      variants={imageNavVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                      aria-label="Next image"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </motion.button>

                    {/* Image Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {tour.images.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentImageIndex
                              ? 'bg-white scale-125'
                              : 'bg-white/60 hover:bg-white/80'
                          }`}
                          whileHover={{ scale: prefersReducedMotion ? 1 : 1.2 }}
                          whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Content Section */}
              <motion.div
                className="p-6 lg:p-8 overflow-y-auto flex flex-col"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {/* Header */}
                <motion.div className="mb-6" variants={fadeIn}>
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-2xl lg:text-3xl font-bold font-display text-sky-800 leading-tight">
                      {tour.name}
                    </h2>
                  </div>
                  
                  <div className="flex items-center text-orange-500 font-medium mb-4">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    {tour.destination}
                  </div>
                  
                  <p className="text-stone-600 leading-relaxed">
                    {tour.description}
                  </p>
                </motion.div>

                {/* Quick Info Grid */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
                  variants={fadeIn}
                >
                  <div className="bg-stone-50 rounded-lg p-4">
                    <div className="flex items-center text-stone-600 mb-2">
                      <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                      <span className="font-medium">Price Range</span>
                    </div>
                    <p className="text-sky-800 font-bold">{tour.priceRange}</p>
                  </div>
                  
                  <div className="bg-stone-50 rounded-lg p-4">
                    <div className="flex items-center text-stone-600 mb-2">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <p className="text-sky-800 font-bold">{tour.itinerary.length} Days</p>
                  </div>
                </motion.div>

                {/* Itinerary */}
                <motion.div className="mb-8 flex-grow" variants={fadeIn}>
                  <h3 className="text-lg font-bold font-display text-sky-800 mb-4">
                    Sample Itinerary
                  </h3>
                  <div className="space-y-3">
                    {tour.itinerary.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: {
                            delay: prefersReducedMotion ? 0 : index * 0.1,
                            duration: prefersReducedMotion ? 0.01 : 0.3
                          }
                        }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-sky-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </div>
                        <p className="text-stone-600 leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* WhatsApp CTA */}
                <motion.div variants={fadeIn}>
                  <motion.button
                    onClick={handleWhatsApp}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{ 
                      scale: prefersReducedMotion ? 1 : 1.02,
                      y: prefersReducedMotion ? 0 : -2
                    }}
                    whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                  >
                    <i className="fab fa-whatsapp text-xl" />
                    <span>Book on WhatsApp</span>
                  </motion.button>
                  
                  <p className="text-center text-sm text-stone-500 mt-3">
                    Get instant responses and personalized quotes
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};