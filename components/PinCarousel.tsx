import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
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
  const dragX = useMotionValue(0);
  const [cardWidth, setCardWidth] = useState(300);
  const [paused, setPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  useEffect(() => {
    const resize = () => {
      const w = containerRef.current?.clientWidth ?? 900;
      setCardWidth(Math.min(420, Math.max(220, Math.floor(w / 3.6))));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const prev = () => setCurrent((c) => clamp(c - 1, 0, tours.length - 1));
  const next = () => setCurrent((c) => clamp(c + 1, 0, tours.length - 1));

  const onDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const { offset, velocity } = info;
    const threshold = cardWidth * 0.35;
    if (offset.x > threshold || velocity.x > 500) {
      prev();
    } else if (offset.x < -threshold || velocity.x < -500) {
      next();
    }
    dragX.set(0);
  };

  useEffect(() => {
    onActiveChange?.(tours[current]?.image || '/hero-bg.jpg');
  }, [current, onActiveChange, tours]);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <div ref={containerRef} className="relative w-full max-w-5xl px-4" style={{ perspective: 1500 }}>
        <div className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center">
          {tours.map((tour, i) => {
            const pos = i - current;
            if (Math.abs(pos) > 4) return null;

            const x = pos * (cardWidth * 0.55);
            const scale = clamp(1 - Math.abs(pos) * 0.12, 0.6, 1);
            const rotateY = clamp(-pos * 12, -30, 30);
            const zIndex = 100 - Math.abs(pos);

            return (
              <motion.div
                key={tour.name}
                className="absolute top-0 bottom-0 flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl max-w-xs md:max-w-md"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                style={{ x: dragX, transformStyle: 'preserve-3d', zIndex }}
                animate={{ x, scale, rotateY }}
                transition={{ type: 'spring', stiffness: 220, damping: 30 }}
                initial={false}
                whileTap={{ scale: pos === 0 ? 0.98 : scale }}
                aria-hidden={pos !== 0}
                title={tour.name}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="w-full h-40 md:h-56 lg:h-64 bg-gray-200 relative">
                  <img
                    src={tour.image || '/hero-bg.jpg'}
                    alt={tour.name}
                    className={`w-full h-full object-cover ${pos === 0 ? '' : 'filter grayscale-50 blur-sm'}`}
                    onClick={() => {
                      setCurrent(i);
                      onActiveChange?.(tour.image || '/hero-bg.jpg');
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/hero-bg.jpg';
                    }}
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">{tour.name}</h3>
                    <p className="mt-2 text-sm text-white/80 line-clamp-3">{tour.description}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => window.open(tour.flyerUrl || '#', '_blank')}
                      className="px-3 py-2 bg-sunset-500 hover:bg-sunset-600 text-white rounded-lg text-sm"
                    >
                      Download Flyer
                    </button>

                    <button
                      onClick={() => {
                        setCurrent(i);
                      }}
                      className="text-white/90 underline text-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
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
  );
};

export default PinCarousel;
