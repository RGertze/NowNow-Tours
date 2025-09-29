import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_IMAGES } from '../constants';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { fadeUp, staggerContainer } from '../motion/motionVariants';

// Lazy load the canvas for better initial performance
const HeroCanvas = lazy(() => import('./HeroCanvas'));

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(HERO_IMAGES.length).fill(false));
  const prefersReducedMotion = usePrefersReducedMotion();

  // Preload images
  useEffect(() => {
    HERO_IMAGES.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
      img.src = src;
    });
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 8000); // Change image every 8 seconds
    
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);
    
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  };

  // Ken Burns animation variants
  const kenBurnsVariants = {
    initial: { 
      scale: 1,
      opacity: 0,
    },
    animate: { 
      scale: prefersReducedMotion ? 1 : 1.05,
      opacity: 1,
      transition: {
        scale: {
          duration: prefersReducedMotion ? 0.01 : 12,
          ease: 'easeOut'
        },
        opacity: {
          duration: prefersReducedMotion ? 0.01 : 1,
          ease: 'easeOut'
        }
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: 'easeInOut'
      }
    }
  };

  // Text animation variants
  const textVariants = {
    initial: { 
      opacity: 0, 
      y: 40,
      filter: 'blur(4px)'
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: prefersReducedMotion ? 0 : 0.5
      }
    }
  };

  const subTextVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: prefersReducedMotion ? 0 : 0.8
      }
    }
  };

  // CTA button variants
  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.5, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: prefersReducedMotion ? 0 : 1.1
      }
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.03,
      y: prefersReducedMotion ? 0 : -2,
      transition: { 
        duration: 0.2, 
        ease: 'easeOut' 
      }
    },
    tap: {
      scale: prefersReducedMotion ? 1 : 0.98,
      transition: { 
        duration: 0.1 
      }
    }
  };

  // Scroll indicator variants
  const scrollIndicatorVariants = {
    initial: { 
      opacity: 0, 
      y: 10 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay: prefersReducedMotion ? 0 : 1.5
      }
    },
    float: {
      y: prefersReducedMotion ? 0 : [0, -8, 0],
      transition: {
        duration: prefersReducedMotion ? 0.01 : 2,
        ease: 'easeInOut',
        repeat: prefersReducedMotion ? 0 : Infinity,
        repeatType: 'loop' as const
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Background Images with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={HERO_IMAGES[currentIndex]}
            alt="Beautiful African landscape showcasing our tour destinations"
            className="absolute inset-0 w-full h-full object-cover"
            variants={kenBurnsVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            loading={currentIndex === 0 ? "eager" : "lazy"} // Prioritize first image
            decoding="async"
            style={{
              willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Interactive Canvas Overlay */}
      <Suspense fallback={<div className="canvas-fallback absolute inset-0 z-5" />}>
        <HeroCanvas className="z-5" />
      </Suspense>
      
      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Main Headline */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display mb-6 tracking-tight leading-none"
          variants={textVariants}
          style={{
            textShadow: '2px 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.3)',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}
        >
          Discover Africa with{' '}
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            NowNow Tours
          </span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-stone-100"
          variants={subTextVariants}
          style={{
            textShadow: '1px 1px 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)'
          }}
        >
          We create authentic, memorable, and hassle-free travel experiences 
          across the magnificent continent of Africa.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={staggerContainer}
        >
          <motion.button 
            onClick={() => scrollToSection('tours')} 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full shadow-glow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent text-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            style={{
              boxShadow: '0 8px 32px rgba(249, 115, 22, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
            }}
          >
            Explore Tours
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('contact')} 
            className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent text-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            style={{
              boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
            }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer group"
        variants={scrollIndicatorVariants}
        initial="initial"
        animate={['animate', 'float']}
        onClick={() => scrollToSection('about')}
        whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
        whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
      >
        <div className="flex flex-col items-center text-white/80 group-hover:text-white transition-colors duration-200">
          <span className="text-sm font-medium mb-2 text-center">Scroll to explore</span>
          <div className="p-2 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-colors duration-200">
            <ChevronDownIcon className="w-6 h-6" />
          </div>
        </div>
      </motion.div>

      {/* Image Loading Progress Indicators (subtle) */}
      <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
        {HERO_IMAGES.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex 
                ? 'bg-orange-500' 
                : imagesLoaded[index] 
                  ? 'bg-white/50' 
                  : 'bg-white/20'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.2 }}
            onClick={() => setCurrentIndex(index)}
            role="button"
            aria-label={`Switch to image ${index + 1}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setCurrentIndex(index);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;