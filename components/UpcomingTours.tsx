import React from 'react';
import { TOURS_DATA } from '../constants';

const UpcomingTours: React.FC = () => {
  const toursWithDates = TOURS_DATA.filter(t => t.upcomingDates && t.upcomingDates.length > 0);

  if (toursWithDates.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="font-display text-3xl font-bold text-baobab-800">Upcoming Tour Dates</h3>
          <p className="text-baobab-600 mt-2">See the next scheduled departures and reserve your spot.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toursWithDates.map((tour, idx) => (
            <div key={idx} className="p-4 border rounded-lg shadow-sm bg-earth-50">
              <h4 className="font-semibold text-lg text-baobab-800 mb-2">{tour.name}</h4>
              <p className="text-sm text-baobab-600 mb-3">{tour.destination} — <span className="font-semibold text-safari-700">{tour.priceRange.split('·')[0].trim()}</span></p>
              <ul className="space-y-2">
                {tour.upcomingDates!.map((d, i) => (
                  <li key={i} className="text-sm text-baobab-600">
                    <strong className="text-safari-800">{d}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingTours;
