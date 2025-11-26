import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TOURS_DATA } from '../constants';
import type { Tour } from '../types';

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

type Props = {
  onActiveChange?: (img?: string) => void;
  autoplayInterval?: number;
};

const PinCarousel: React.FC<Props> = ({ onActiveChange, autoplayInterval = 4000 }) => {
  const tours: Tour[] = TOURS_DATA;
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const prev = () => {
    setCurrent((c) => (c - 1 + tours.length) % tours.length);
  };

  const next = () => {
    setCurrent((c) => (c + 1) % tours.length);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    isDraggingRef.current = false;
    const { offset, velocity } = info;
    const threshold = 50;

    if (offset.x > threshold || velocity.x > 300) {
      prev();
    } else if (offset.x < -threshold || velocity.x < -300) {
      next();
    }
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
    setPaused(true);
  };

  useEffect(() => {
    onActiveChange?.(tours[current]?.image || '/hero-bg.jpg');
  }, [current, onActiveChange, tours]);

  useEffect(() => {
    if (paused || isDraggingRef.current) return;
    autoplayRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % tours.length);
    }, autoplayInterval);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [paused, autoplayInterval, tours.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const getCardStyles = (pos: number) => {
    const maxDistance = 2;
    const normalizedPos = Math.max(-maxDistance, Math.min(maxDistance, pos));

    return {
      x: normalizedPos * 120,
      y: Math.abs(normalizedPos) * 40,
      scale: Math.max(0.7, 1 - Math.abs(normalizedPos) * 0.15),
      rotateY: normalizedPos * -25,
      opacity: Math.max(0.5, 1 - Math.abs(normalizedPos) * 0.3),
      zIndex: Math.round(100 - Math.abs(normalizedPos) * 10),
    };
  };

  return (
    <div className="w-full flex flex-col items-center mt-16 mb-4">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative w-full px-8 md:px-12"
        style={{
          perspective: 2000,
          height: '480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Card Stack */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
            height: '100%',
          }}
        >
          {tours.map((tour, i) => {
            const pos = i - current;
            if (Math.abs(pos) > 3) return null;

            const styles = getCardStyles(pos);

            return (
              <motion.div
                key={tour.name}
                layout
                drag="x"
                dragElastic={0.2}
                dragConstraints={{ left: -100, right: 100 }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                animate={{
                  x: styles.x,
                  y: styles.y,
                  scale: styles.scale,
                  rotateY: styles.rotateY,
                  opacity: styles.opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 35,
                  mass: 1,
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  translateX: '-50%',
                  translateY: '-50%',
                  transformStyle: 'preserve-3d',
                  zIndex: styles.zIndex,
                  cursor: pos === 0 ? 'grab' : 'default',
                }}
                whileHover={pos === 0 ? { scale: 1.05 } : {}}
                whileTap={pos === 0 ? { scale: 0.98 } : {}}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="flex flex-col bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl w-full max-w-md"
              >
                {/* Image Section */}
                <div className="relative w-full h-56 md:h-64 bg-gray-900 overflow-hidden">
                  <motion.img
                    src={tour.image || '/hero-bg.jpg'}
                    alt={tour.name}
                    className="w-full h-full object-cover"
                    animate={{
                      filter:
                        pos === 0
                          ? 'grayscale(0%) brightness(1)'
                          : 'grayscale(80%) brightness(0.7)',
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setCurrent(i);
                      onActiveChange?.(tour.image || '/hero-bg.jpg');
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/hero-bg.jpg';
                    }}
                  />
                </div>

                {/* Content Section */}
                <motion.div
                  className="p-5 flex-1 flex flex-col justify-between"
                  animate={{ opacity: pos === 0 ? 1 : 0.7 }}
                >
                  <div>
                    <motion.h3
                      className="text-2xl font-bold text-white"
                      animate={{ fontSize: pos === 0 ? 24 : 18 }}
                    >
                      {tour.name}
                    </motion.h3>
                    <motion.p
                      className="mt-2 text-sm text-white/80 line-clamp-2"
                      animate={{ opacity: pos === 0 ? 1 : 0.6 }}
                    >
                      {tour.description}
                    </motion.p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <motion.button
                      onClick={() => window.open(tour.flyerUrl || '#', '_blank')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-sunset-500 to-sunset-600 hover:from-sunset-600 hover:to-sunset-700 text-white rounded-xl text-sm font-semibold shadow-lg"
                    >
                      Flyer
                    </motion.button>

                    <motion.button
                      onClick={() => setCurrent(i)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        pos === 0
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'text-white/70'
                      }`}
                    >
                      View
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all"
          aria-label="Previous card"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          onClick={next}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all"
          aria-label="Next card"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Dot Indicators */}
      <motion.div className="mt-8 flex items-center gap-2" layout>
        {tours.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            animate={{
              scale: i === current ? 1.4 : 1,
              backgroundColor:
                i === current ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)',
            }}
            whileHover={{ scale: i === current ? 1.4 : 1.2 }}
            className="w-2.5 h-2.5 rounded-full transition-all"
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </motion.div>

      {/* Autoplay Indicator */}
      {!paused && (
        <motion.div
          className="mt-3 text-xs text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Hover to pause
        </motion.div>
      )}
    </div>
  );
};

export default PinCarousel;
