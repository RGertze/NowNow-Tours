import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const trackX = useMotionValue(0);
  const [cardStep, setCardStep] = useState(320); // will be measured
  const [paused, setPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  // measure card width + gap
  useEffect(() => {
    const measure = () => {
      const cardRect = cardRef.current?.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (cardRect && containerRect) {
        const gap = 16; // matches tailwind gap-4
        setCardStep(Math.round(cardRect.width + gap));
        // set track to center current
        const target = -current * (cardRect.width + gap);
        trackX.set(target);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('load', measure);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', measure);
      window.removeEventListener('resize', measure);
    };
  }, [current, trackX]);

  // keep background in sync
  useEffect(() => {
    onActiveChange?.(tours[current]?.images?.[0] || '/hero-bg.jpg');
  }, [current, onActiveChange, tours]);

  // autoplay
  useEffect(() => {
    if (paused) return;
    autoplayRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % tours.length);
    }, autoplayInterval);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [paused, autoplayInterval, tours.length]);

  // update trackX when current changes
  useEffect(() => {
    const target = -current * cardStep;
    animate(trackX, target, { type: 'spring', stiffness: 260, damping: 30 });
  }, [current, cardStep, trackX]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setCurrent((c) => clamp(c - 1, 0, tours.length - 1));
      if (e.key === 'ArrowRight') setCurrent((c) => clamp(c + 1, 0, tours.length - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tours.length]);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    // snap to nearest card
    const currentX = trackX.get();
    const rawIndex = Math.round(-currentX / cardStep);
    const nextIndex = clamp(rawIndex, 0, tours.length - 1);
    setCurrent(nextIndex);
    setPaused(false);
  };

  const handleDragStart = () => {
    setPaused(true);
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto relative overflow-visible flex justify-center items-center py-2 md:py-4">
      <div className="w-full px-4">
        {/* Track - draggable but contained */}
        <motion.div
          ref={trackRef}
          className="carousel-track flex gap-4 items-center"
          style={{ x: trackX }}
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {tours.map((tour, i) => {
            const pos = i - current;
            const scale = Math.max(0.85, 1 - Math.abs(pos) * 0.08);
            const rotateY = pos * -6;
            const isActive = i === current;

            return (
              <div
                key={tour.name}
                ref={i === 0 ? cardRef : null}
                className={`flex-shrink-0 w-56 md:w-64 lg:w-72 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                  isActive ? 'ring-2 ring-sunset-500' : 'opacity-80'
                }`}
              >
                <motion.div
                  className="bg-white h-full flex flex-col"
                  animate={{ scale, rotateY }}
                  transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                >
                  <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-100 overflow-hidden">
                    <img
                      src={tour.image || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'}
                      alt={tour.name}
                      className="w-full h-full object-cover"
                      onClick={() => setCurrent(i)}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526481280698-8fcc15dd99a0?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between bg-transparent">
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold text-baobab-800">{tour.name}</h3>
                        <p className="text-sm text-baobab-600 mt-2 line-clamp-2">{tour.description}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-center">
                      <button
                        onClick={() => setCurrent(i)}
                        className={`text-sunset-600 hover:text-sunset-700 font-medium text-sm underline`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Arrows */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-40">
          <button
            onClick={() => setCurrent((c) => clamp(c - 1, 0, tours.length - 1))}
            className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            aria-label="Previous"
          >
            ‹
          </button>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40">
          <button
            onClick={() => setCurrent((c) => clamp(c + 1, 0, tours.length - 1))}
            className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {tours.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${i === current ? 'bg-white' : 'bg-white/30'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinCarousel;
