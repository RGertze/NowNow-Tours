import React from 'react';
import { motion } from 'framer-motion';
import { TOURS_DATA } from '../constants';
import smallCards from '../content/small-cards.json';
import cardMapJson from '../content/tour-card-images.json';

const Upcoming: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-baobab-800 mb-4">
            Upcoming Tour Dates
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Book your spot on our next adventure. Limited spaces available!
          </p>

          <div className="space-y-6">
            {TOURS_DATA.map((tour, index) => (
              <motion.div
                key={tour.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    {/** Build image with robust fallbacks similar to ToursNew */}
                    {(() => {
                      const fallbackCards: string[] = Array.isArray((smallCards as any).images)
                        ? (smallCards as any).images.filter((n: string) => typeof n === 'string' && !n.toLowerCase().includes('gitkeep'))
                        : [];
                      const cardMap: Record<string, string | string[]> = (cardMapJson as any)?.map || {};
                      const getSpecific = (slug?: string, destination?: string): string | null => {
                        const v = (slug ? cardMap[slug] : undefined) ?? (destination ? cardMap[destination!] : undefined);
                        if (!v) return null;
                        if (Array.isArray(v)) {
                          const name = v[0];
                          if (!name) return null;
                          return name.startsWith('/images/') ? name : `/images/small-cards/${name}`;
                        }
                        return (v as string).startsWith('/images/') ? (v as string) : `/images/small-cards/${v}`;
                      };
                      const cardForDestination = (dest: string): string | null => {
                        const d = (dest || '').toLowerCase();
                        const pick = (keywords: string[]) => fallbackCards.find(fn => keywords.some(k => fn.toLowerCase().includes(k))) || null;
                        if (d.includes('zanzibar') || d.includes('tanzania')) return pick(['zanzibar','nakupenda','jet ski','boat','stone']);
                        if (d.includes('cape') || d.includes('south africa')) return pick(['cape','cpt','camps bay','table','sunset--cruise','capetown']);
                        if (d.includes('lesotho')) return pick(['lesotho']);
                        if (d.includes('angola') || d.includes('lubango')) return pick(['angola','lubango','tunduvala']);
                        if (d.includes('maldives')) return pick(['maldives']);
                        if (d.includes('bali') || d.includes('indonesia')) return pick(['bali']);
                        if (d.includes('zambia') || d.includes('victoria')) return pick(['victoria']);
                        return null;
                      };
                      const src = (tour.images && tour.images.length)
                        ? tour.images[0]
                        : (() => {
                            const specific = getSpecific(tour.slug, tour.destination);
                            if (specific) return specific;
                            const match = cardForDestination(tour.destination || tour.name);
                            if (match) return `/images/small-cards/${match}`;
                            if (fallbackCards.length) return `/images/small-cards/${fallbackCards[Math.floor(Math.random()*fallbackCards.length)]}`;
                            return '/images/gallery/Lubango.jpg';
                          })();
                      return (
                        <img
                          src={src}
                          alt={tour.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            const specific = getSpecific(tour.slug, tour.destination);
                            if (specific && img.src !== specific) { img.src = specific; return; }
                            const match = cardForDestination(tour.destination || tour.name);
                            if (match) { img.src = `/images/small-cards/${match}`; return; }
                            if (fallbackCards.length) { img.src = `/images/small-cards/${fallbackCards[Math.floor(Math.random()*fallbackCards.length)]}`; return; }
                            img.src = '/images/gallery/Lubango.jpg';
                          }}
                        />
                      );
                    })()}
                  </div>

                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-baobab-800 mb-2 font-semibold">{tour.name}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{tour.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-sunset-500">{tour.priceRange.split('·')[0].trim()}</div>
                        <div className="text-sm text-gray-500">{tour.duration || 'Flexible dates'}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-sunset-100 text-sunset-700 px-3 py-1 rounded-full font-semibold">
                        📅 {(tour.upcomingDates && tour.upcomingDates.length) ? tour.upcomingDates[0] : 'Multiple dates available'}
                      </span>
                      <span className="text-xs bg-safari-100 text-safari-700 px-3 py-1 rounded-full font-semibold">
                        👥 Group Tour
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        🏨 Accommodation Included
                      </span>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => window.open(tour.flyerUrl || '#', '_blank')}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold transition-colors"
                      >
                        View Itinerary
                      </button>
                      <a
                        href={`https://wa.me/264812297409?text=Hi! I want to book ${encodeURIComponent(tour.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        Book on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Upcoming;
