import React from 'react';
import { motion } from 'framer-motion';
import { TOURS_DATA } from '../constants';

const Upcoming: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-baobab-800 mb-4">
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
                    <img
                      src={tour.image || '/hero-bg.jpg'}
                      alt={tour.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/hero-bg.jpg';
                      }}
                    />
                  </div>

                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-baobab-800 mb-2">{tour.name}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{tour.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-sunset-500">{tour.price}</div>
                        <div className="text-sm text-gray-500">{tour.duration}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-sunset-100 text-sunset-700 px-3 py-1 rounded-full font-semibold">
                        📅 {tour.dates || 'Multiple dates available'}
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
