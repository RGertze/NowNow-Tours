import React, { useState } from 'react';

const CARDS = [
  { title: 'Beach Escape', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
  { title: 'Mountain Views', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470' },
  { title: 'Island Paradise', img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d' },
  { title: 'City Highlights', img: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c' },
];

type Props = {
  onExplore?: (place: { title: string; img: string }) => void;
};

const PopularPlaces: React.FC<Props> = ({ onExplore }) => {
  const [active, setActive] = useState(0);

  // small interval rotate to shuffle active card
  React.useEffect(() => {
    const t = setInterval(() => setActive((s) => (s + 1) % CARDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hidden md:block absolute right-8 top-1/2 transform -translate-y-1/2 z-50 pointer-events-auto">
      <div className="relative w-80 h-[420px]">
        {CARDS.map((c, i) => {
          const pos = i - active;
          // map pos to styles: center (0) top-left/right for others
          const base = 'absolute left-0 right-0 mx-auto w-72 h-64 rounded-[22px] overflow-hidden border bg-white/5 backdrop-blur-md shadow-2xl flex flex-col';
          const idx = ((i - active) % CARDS.length + CARDS.length) % CARDS.length;
          // calculate transform variations
          const translateY = idx === 0 ? '-6' : idx === 1 ? '8' : idx === 2 ? '16' : '24';
          const rotate = idx === 0 ? '-2' : idx === 1 ? '6' : idx === 2 ? '-8' : '10';
          const scale = idx === 0 ? 1 : idx === 1 ? 0.94 : idx === 2 ? 0.9 : 0.86;
          const opacity = idx === 0 ? 1 : idx === 1 ? 0.9 : idx === 2 ? 0.7 : 0.5;

          return (
            <div
              key={c.title}
              className={`${base} transition-transform duration-700 ease-in-out`} 
              style={{
                transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                zIndex: 40 - idx,
                opacity,
                border: '1px solid rgba(255,255,255,0.12)'
              }}
            >
              <div className="h-36 w-full overflow-hidden">
                <img src={`${c.img}?q=80&w=800&auto=format&fit=crop`} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-white font-semibold text-lg">{c.title}</h4>
                  <p className="text-sm text-white/70 mt-1">A curated trip with highlights and local experiences.</p>
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => onExplore?.(c)}
                    className="bg-sunset-500 hover:bg-sunset-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularPlaces;
