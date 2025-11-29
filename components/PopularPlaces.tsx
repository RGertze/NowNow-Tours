import React, { useEffect, useRef, useState } from 'react';
import { TOURS_DATA } from '../constants';
import smallCards from '../content/small-cards.json';
import cardMapJson from '../content/tour-card-images.json';
import type { Tour } from '../types';
import { useNavigate } from 'react-router-dom';

type Props = {};

                      <img
                        src={`${(t.images && t.images[0]) ? t.images[0] : (fallbackCards.length ? `/images/small-cards/${fallbackCards[Math.floor(Math.random()*fallbackCards.length)]}` : '/images/gallery/placeholder.jpg')}?q=80&w=1200&auto=format&fit=crop`}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        onClick={handleImageClick}
                        onError={(e) => {
                          const match = cardForDestination(t.destination || t.name);
                          const fallback = match ? `/images/small-cards/${match}` : (fallbackCards.length ? `/images/small-cards/${fallbackCards[Math.floor(Math.random()*fallbackCards.length)]}` : '/images/gallery/placeholder.jpg');
                          (e.currentTarget as HTMLImageElement).src = `${fallback}?q=80&w=1200&auto=format&fit=crop`;
                        }}
                      />
const createSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const PopularPlaces: React.FC<Props> = () => {
  const tours = TOURS_DATA as Tour[];
  const fallbackCards: string[] = Array.isArray((smallCards as any).images)
    ? (smallCards as any).images.filter((n: string) => typeof n === 'string' && !n.toLowerCase().includes('gitkeep'))
    : [];
  const cardMap: Record<string, string> = (cardMapJson as any)?.map || {};

  const cardForDestination = (dest: string): string | null => {
    const d = (dest || '').toLowerCase();
    const pick = (keywords: string[]) => fallbackCards.find(fn => keywords.some(k => fn.toLowerCase().includes(k)) ) || null;
    if (d.includes('zanzibar') || d.includes('tanzania')) return pick(['zanzibar','nakupenda','jet ski','boat','stone']);
    if (d.includes('cape') || d.includes('south africa')) return pick(['cape','cpt','camps bay','table','sunset--cruise','capetown']);
    if (d.includes('lesotho')) return pick(['lesotho']);
    if (d.includes('angola') || d.includes('lubango')) return pick(['angola','lubango','tunduvala']);
    if (d.includes('maldives')) return pick(['maldives']);
    if (d.includes('bali') || d.includes('indonesia')) return pick(['bali']);
    if (d.includes('zambia') || d.includes('victoria')) return pick(['victoria']);
    return null;
  };
  const [active, setActive] = useState(0);
  const [flipping, setFlipping] = useState(false);
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
    // navigate to home with query so the Tours section will handle scrolling and flyer opening
    navigate(`/?tour=${encodeURIComponent(slug)}#tours`);
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

          const isActive = idx === 0;

          const combinedTransform = `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`;

          const handleImageClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (flipping || !isActive) return;
            setFlipping(true);
            // show backside for a moment, then advance
            window.setTimeout(() => {
              setActive((s) => (s + 1) % tours.length);
              setFlipping(false);
            }, 900);
          };

          return (
            <article
              key={t.slug ?? t.name}
              className="absolute left-0 right-0 mx-auto w-76 rounded-[24px] overflow-hidden border bg-white/5 backdrop-blur-md shadow-2xl flex flex-col cursor-pointer"
              style={{
                transform: combinedTransform,
                zIndex: 50 - idx,
                opacity,
                transition: 'transform 700ms ease-in-out, opacity 600ms ease-in-out'
              }}
              onClick={() => onExplore(t)}
              onMouseEnter={() => { pausedRef.current = true; }}
              onMouseLeave={() => { pausedRef.current = false; }}
            >
              <div className="relative h-80 w-full overflow-hidden" style={{ perspective: 1200 }}>
                    <img
                      src={`${(t.images && t.images[0]) ? t.images[0] : (() => { const specific = cardMap[t.slug ?? '']; if (specific) return `/images/small-cards/${specific}`; return (fallbackCards.length ? `/images/small-cards/${fallbackCards[Math.floor(Math.random()*fallbackCards.length)]}` : '/images/gallery/placeholder.jpg'); })()}?q=80&w=1200&auto=format&fit=crop`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 700ms ease',
                    transform: isActive && flipping ? 'rotateY(180deg)' : 'rotateY(0deg)'
                          const specific = cardMap[t.slug ?? ''] || cardForDestination(t.destination || t.name);
                          const fallback = specific ? `/images/small-cards/${specific}` : (fallbackCards.length ? `/images/small-cards/${fallbackCards[Math.floor(Math.random()*fallbackCards.length)]}` : '/images/gallery/placeholder.jpg');
                  {/* Front face */}
                  <div style={{ backfaceVisibility: 'hidden' as const }} className="absolute inset-0">
                    <img
                      src={`${(t.images && t.images[0])
                        ? t.images[0]
                        : (() => {
                            const match = cardForDestination(t.destination || t.name);
                            if (match) return `/images/small-cards/${match}`;
                            if (fallbackCards.length) return `/images/small-cards/${fallbackCards[Math.floor(Math.random()*fallbackCards.length)]}`;
                            return '/images/gallery/placeholder.jpg';
                          })()
                        }?q=80&w=1200&auto=format&fit=crop`}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onClick={handleImageClick}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute left-4 bottom-4 right-4 text-white">
                      <h4 className="text-lg font-semibold drop-shadow">{t.name}</h4>
                      <p className="text-sm text-white/80 mt-1">{t.destination}</p>
                    </div>
                  </div>

                  {/* Back face */}
                  <div style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' as const }} className="absolute inset-0 bg-gradient-to-b from-safari-900/60 to-black/60 p-4 flex flex-col justify-between text-white">
                    <div>
                      <h4 className="text-xl font-bold">{t.name}</h4>
                      <p className="text-sm mt-2">{t.description}</p>
                      <ul className="mt-3 text-sm space-y-1">
                        {t.itinerary.slice(0, 3).map((it, idx) => (
                          <li key={idx} className="opacity-90">• {it}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button onClick={(e) => { e.stopPropagation(); onExplore(t); }} className="bg-white/10 hover:bg-white/20 py-2 px-4 rounded-md">Explore</button>
                    </div>
                  </div>
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
