import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TOURS_DATA } from '../constants';
import type { Tour } from '../types';

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

type Props = {
  onActiveChange?: (img?: string) => void;
  autoplayInterval?: number;
};

const PinCarousel: React.FC<Props> = ({ onActiveChange, autoplayInterval = 4000 }) => {
  const tours: Tour[] = TOURS_DATA.slice(0, 3); // limit to 3 cards only
  const [current, setCurrent] = useState(0);

  // keep background in sync with active card image
  useEffect(() => {
    onActiveChange?.(tours[current]?.images?.[0] || '/hero-bg.jpg');
  }, [current, onActiveChange, tours]);
  // simple autoplay across 3 cards
  useEffect(() => {
    if (!autoplayInterval) return;
    const id = window.setInterval(() => {
      setCurrent((c) => (c + 1) % tours.length);
    }, autoplayInterval);
    return () => window.clearInterval(id);
  }, [autoplayInterval, tours.length]);

  return (
    <div className="w-full max-w-[1100px] mx-auto relative overflow-visible flex justify-center items-center py-2 md:py-4">
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/40 via-black/20 to-transparent" />
      <div className="w-full px-4">
        {/* Static 3-card layout */}
        <motion.div className="flex gap-6 items-stretch justify-center">
          {tours.map((tour, i) => {
            const pos = i - current;
            const scale = Math.max(0.85, 1 - Math.abs(pos) * 0.08);
            const rotateY = pos * -6;
            const isActive = i === current;

            return (
              <div
                key={tour.name}
                onClick={() => setCurrent(i)}
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

        {/* Indicators */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {tours.map((_, i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${i === current ? 'bg-sunset-500' : 'bg-sunset-200'} transition-colors`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinCarousel;
