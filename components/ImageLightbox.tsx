import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { modalOverlay, modalContent } from '../motion/motionVariants';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
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

const ZoomInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
  </svg>
);

/**
 * Image Lightbox Component
 * Provides full-screen image viewing with navigation and zoom capabilities
 * Includes keyboard navigation and accessibility features
 */
export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Reset zoom and position when image changes
  useEffect(() => {
    if (isOpen) {
      setIsZoomed(false);
      setImagePosition({ x: 0, y: 0 });
    }
  }, [currentIndex, isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext();
          break;
        case ' ':
          e.preventDefault();
          toggleZoom();
          break;
      }
    };

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      const container = containerRef.current;
      if (!container) return;

      const focusableElements = container.querySelectorAll(
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

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleTabTrap);
    document.body.style.overflow = 'hidden';

    // Focus close button
    setTimeout(() => {
      const closeButton = containerRef.current?.querySelector('button') as HTMLElement;
      closeButton?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleTabTrap);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  const toggleZoom = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setImagePosition({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
    }
  };

  // Handle mouse/touch dragging for zoomed images
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    
    setImagePosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen) return;
    
    const preloadNext = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    const preloadPrev = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    
    [preloadNext, preloadPrev].forEach(index => {
      const img = new Image();
      img.src = images[index];
    });
  }, [currentIndex, images, isOpen]);

  if (!images.length) return null;

  const currentImage = images[currentIndex];
  const imageCaption = `Image ${currentIndex + 1} of ${images.length}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95"
          variants={modalOverlay}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isZoomed) {
              onClose();
            }
          }}
        >
          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
            <div className="text-white/80 text-sm font-medium">
              {imageCaption}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Zoom Toggle */}
              <motion.button
                onClick={toggleZoom}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
                title={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                <ZoomInIcon className="w-5 h-5" />
              </motion.button>

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                aria-label="Close lightbox"
                title="Close (Esc)"
              >
                <CloseIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <motion.button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-colors duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-white"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                aria-label="Previous image"
                title="Previous (←)"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </motion.button>

              <motion.button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-colors duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-white"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                aria-label="Next image"
                title="Next (→)"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </motion.button>
            </>
          )}

          {/* Image Container */}
          <motion.div
            className="relative max-w-full max-h-full p-16 flex items-center justify-center"
            variants={modalContent}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                ref={imageRef}
                src={currentImage}
                alt={imageCaption}
                className={`max-w-full max-h-full object-contain select-none ${
                  isZoomed ? 'cursor-grab' : 'cursor-zoom-in'
                } ${isDragging ? 'cursor-grabbing' : ''}`}
                style={{
                  transform: `scale(${isZoomed ? 2 : 1}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                  transformOrigin: 'center',
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    duration: prefersReducedMotion ? 0.01 : 0.3,
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.9,
                  transition: {
                    duration: prefersReducedMotion ? 0.01 : 0.2,
                  }
                }}
                onClick={!isZoomed ? toggleZoom : undefined}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>

          {/* Bottom Controls */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    // This would need to be handled by parent component
                    // For now, we'll just show the indicator
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.2 }}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-4 right-4 text-white/60 text-sm z-20 space-y-1 text-right">
            <div>← → Navigate</div>
            <div>Space: Zoom</div>
            <div>Esc: Close</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};