import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { modalOverlay, modalContent } from '../motion/motionVariants';

interface VideoLightboxProps {
  videoUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/**
 * Video Lightbox Component
 * Provides a modal overlay for playing video testimonials
 * Includes accessibility features and proper focus management
 */
export const VideoLightbox: React.FC<VideoLightboxProps> = ({
  videoUrl,
  isOpen,
  onClose,
  title = 'Video Testimonial',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Handle escape key and focus management
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
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'
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
    
    // Focus close button
    setTimeout(() => {
      const closeButton = modalRef.current?.querySelector('button') as HTMLElement;
      closeButton?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabTrap);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Auto-play video when opened
  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        videoRef.current?.play().catch(() => {
          // Autoplay failed, user interaction required
          console.log('Video autoplay prevented by browser');
        });
      }, 200);
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  // Pause other media when this video plays
  const handlePlay = () => {
    // Pause any other videos on the page
    const otherVideos = document.querySelectorAll('video');
    otherVideos.forEach((video) => {
      if (video !== videoRef.current && !video.paused) {
        video.pause();
      }
    });
  };

  if (!videoUrl) return null;

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
            className="relative bg-black rounded-2xl max-w-4xl w-full aspect-video overflow-hidden shadow-strong"
            variants={modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
              aria-label={`Close ${title}`}
            >
              <CloseIcon className="w-5 h-5" />
            </motion.button>

            {/* Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              onPlay={handlePlay}
              aria-label={title}
            >
              <source src={videoUrl} type="video/mp4" />
              <track kind="captions" src="" srcLang="en" label="English" />
              <p className="text-white p-8">
                Your browser doesn't support HTML5 video. 
                <a href={videoUrl} className="text-orange-400 hover:text-orange-300 underline ml-1">
                  Download the video
                </a> instead.
              </p>
            </video>

            {/* Video Title Overlay (appears briefly) */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: 0,
                transition: {
                  delay: 3,
                  duration: 0.5
                }
              }}
            >
              <h3 className="text-lg font-semibold">{title}</h3>
            </motion.div>

            {/* Loading Indicator */}
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};