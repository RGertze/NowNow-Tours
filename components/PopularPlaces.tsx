import React, { useEffect, useRef, useState } from 'react';
import { TOURS_DATA } from '../constants';
import type { Tour } from '../types';
import { useNavigate } from 'react-router-dom';

type Props = {};

const createSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const PopularPlaces: React.FC<Props> = () => {
  const tours = TOURS_DATA as Tour[];
  const [active, setActive] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) setActive((s) => (s + 1) % tours.length);
    };
    intervalRef.current = window.setInterval(tick, 3000);
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [tours.length]);

  const onMouseEnter = () => { pausedRef.current = true; };
  const onMouseLeave = () => { pausedRef.current = false; };

  const goToNext = () => setActive((s) => (s + 1) % tours.length);

  const onExplore = (tour: Tour) => {
    const slug = tour.slug ?? createSlug(tour.name);
    navigate(`/tours?tour=${encodeURIComponent(slug)}`);
  };

  return (
    <div className="hidden md:block absolute right-8 top-1/2 transform -translate-y-1/2 z-50 pointer-events-auto">
      <div className="relative w-80 h-[520px]" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {tours.map((t, i) => {
          const idx = ((i - active) % tours.length + tours.length) % tours.length;
          const translateY = idx === 0 ? -8 : idx === 1 ? 12 : idx === 2 ? 28 : 44;
          const rotate = idx === 0 ? -2 : idx === 1 ? 6 : idx === 2 ? -8 : 10;
          const scale = idx === 0 ? 1 : idx === 1 ? 0.96 : idx === 2 ? 0.92 : 0.88;
          const opacity = idx === 0 ? 1 : idx === 1 ? 0.92 : idx === 2 ? 0.72 : 0.5;

          return (
            <article
              key={t.slug ?? t.name}
              className="absolute left-0 right-0 mx-auto w-76 rounded-[24px] overflow-hidden border bg-white/5 backdrop-blur-md shadow-2xl flex flex-col cursor-pointer"
              style={{
                transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                zIndex: 50 - idx,
                opacity,
                transition: 'transform 700ms ease-in-out, opacity 600ms ease-in-out'
              }}
              onClick={() => onExplore(t)}
              onMouseEnter={() => { pausedRef.current = true; }}
              onMouseLeave={() => { pausedRef.current = false; }}
            >
              <div className="relative h-80 w-full overflow-hidden">
                <img
                  src={`${t.images[0]}?q=80&w=1200&auto=format&fit=crop`}
                  alt={t.name}
                  className="w-full h-full object-cover"
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute left-4 bottom-4 right-4 text-white">
                  <h4 className="text-lg font-semibold drop-shadow">{t.name}</h4>
                  <p className="text-sm text-white/80 mt-1">{t.destination}</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div className="text-white/90">
                  <p className="text-sm">{t.description.substring(0, 60)}...</p>
                </div>
                <div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onExplore(t); }}
                    className="bg-sunset-500 hover:bg-sunset-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default PopularPlaces;
