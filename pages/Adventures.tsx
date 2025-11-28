import React from 'react';
import { motion } from 'framer-motion';
import { TOURS_DATA } from '../constants';

const Adventures: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-baobab-800 mb-4">
            Our African Adventures
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Explore our curated selection of unforgettable journeys across Southern Africa
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOURS_DATA.map((tour, index) => (
              <motion.div
                key={tour.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tour.image || '/hero-bg.jpg'}
                    alt={tour.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/hero-bg.jpg';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-sunset-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {tour.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-baobab-800 mb-2">{tour.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{tour.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.highlights?.slice(0, 3).map((highlight, i) => (
                      <span
                        key={i}
                        className="text-xs bg-safari-100 text-safari-700 px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => window.open(tour.flyerUrl || '#', '_blank')}
                      className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold transition-colors"
                    >
                      View Details
                    </button>
                    <a
                      href={`https://wa.me/264812297409?text=Hi! I'm interested in ${encodeURIComponent(tour.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors text-center"
                    >
                      Book Now
                    </a>
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

export default Adventures;
