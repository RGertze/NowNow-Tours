import React, { useState } from 'react';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaArrowRight } from 'react-icons/fa';
import { TOURS_DATA } from '../constants';
import TourPlanningForm from './TourPlanningForm';

const UpcomingTours: React.FC = () => {
  const toursWithDates = TOURS_DATA.filter(t => t.upcomingDates && t.upcomingDates.length > 0);
  const [selectedDate, setSelectedDate] = useState<{ [key: number]: string }>({});
  const [isTourFormOpen, setIsTourFormOpen] = useState(false);
  const [bookingTour, setBookingTour] = useState<string | null>(null);

  if (toursWithDates.length === 0) return null;

  const handleBookNow = (tourName: string, tourIdx: number) => {
    const selectedDateValue = selectedDate[tourIdx];
    setBookingTour(selectedDateValue ? `${tourName} - ${selectedDateValue}` : tourName);
    setIsTourFormOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white via-safari-50 to-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sunset-100 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-earth-100 to-transparent rounded-full translate-y-24 -translate-x-24 opacity-40"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-sunset-100 rounded-full">
              <span className="text-sunset-700 font-semibold text-sm uppercase tracking-wider">📅 Limited Availability</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-baobab-800 mb-4 leading-tight">
              Upcoming Tour Dates
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-baobab-700 max-w-3xl mx-auto leading-relaxed">
              Secure your next adventure. Select your preferred departure date and embark on an unforgettable African experience.
            </p>
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {toursWithDates.map((tour, idx) => (
              <div
                key={idx}
                className="group relative h-full"
              >
                {/* Card with gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-sunset-400 to-safari-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur group-hover:blur-xl"></div>
                
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 h-full flex flex-col border border-white/50 group-hover:border-safari-200 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                  {/* Tour Info Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold text-safari-800 mb-2 group-hover:text-sunset-600 transition-colors">
                          {tour.name}
                        </h3>
                        <div className="flex items-center gap-2 text-baobab-600">
                          <FaMapMarkerAlt size={14} className="text-sunset-600" />
                          <span className="font-medium">{tour.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price badge */}
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-sunset-100 to-safari-100 rounded-xl border border-sunset-200">
                      <p className="text-sm font-semibold text-safari-700">
                        {tour.priceRange.split('·')[0].trim()}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-1 bg-gradient-to-r from-safari-100 to-transparent rounded-full my-6"></div>

                  {/* Dates Selection */}
                  <div className="flex-grow mb-6">
                    <p className="text-xs font-semibold text-baobab-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <FaCalendar size={12} className="text-sunset-600" />
                      Available Departures
                    </p>
                    
                    <div className="space-y-3">
                      {tour.upcomingDates!.map((date, i) => (
                        <div key={i} className="relative">
                          <input
                            type="radio"
                            id={`date-${idx}-${i}`}
                            name={`tour-date-${idx}`}
                            value={date}
                            checked={selectedDate[idx] === date}
                            onChange={(e) => setSelectedDate({ ...selectedDate, [idx]: e.target.value })}
                            className="hidden"
                          />
                          <label
                            htmlFor={`date-${idx}-${i}`}
                            className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 group/date ${
                              selectedDate[idx] === date
                                ? 'border-sunset-500 bg-gradient-to-r from-sunset-50 to-safari-50 shadow-lg'
                                : 'border-earth-100 bg-white hover:border-earth-300 hover:bg-earth-50'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedDate[idx] === date
                                ? 'border-sunset-500 bg-sunset-500'
                                : 'border-earth-300 bg-white group-hover/date:border-sunset-400'
                            }`}>
                              {selectedDate[idx] === date && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm font-semibold text-baobab-800">{date}</p>
                              <p className="text-xs text-baobab-600 mt-0.5">
                                {i === 0 ? '🔥 Most popular' : `Option ${i + 1}`}
                              </p>
                            </div>
                            {selectedDate[idx] === date && (
                              <div className="w-5 h-5 bg-sunset-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <button
                    onClick={() => handleBookNow(tour.name, idx)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform group-hover:translate-y-0 translate-y-0 ${
                      selectedDate[idx]
                        ? 'bg-gradient-to-r from-sunset-500 to-safari-500 text-white shadow-lg hover:shadow-xl hover:from-sunset-600 hover:to-safari-600'
                        : 'bg-earth-100 text-baobab-600 cursor-not-allowed'
                    }`}
                    disabled={!selectedDate[idx]}
                  >
                    <span>Book Now</span>
                    <FaArrowRight className={`transition-transform ${selectedDate[idx] ? 'group-hover:translate-x-1' : ''}`} size={16} />
                  </button>

                  {/* Date prompt */}
                  {!selectedDate[idx] && (
                    <p className="text-xs text-baobab-500 text-center mt-3 italic">
                      Select a date to continue
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Info section */}
          <div className="mt-16 pt-12 border-t border-safari-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-sunset-100 to-sunset-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <FaCalendar className="text-sunset-600" size={24} />
                </div>
                <h4 className="font-semibold text-baobab-800 mb-2">Flexible Dates</h4>
                <p className="text-sm text-baobab-600">Choose from multiple departure dates for your convenience</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-safari-100 to-safari-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <FaUsers className="text-safari-600" size={24} />
                </div>
                <h4 className="font-semibold text-baobab-800 mb-2">Group Friendly</h4>
                <p className="text-sm text-baobab-600">Book for individuals or customize for larger groups</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-earth-100 to-earth-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <FaArrowRight className="text-earth-600" size={24} />
                </div>
                <h4 className="font-semibold text-baobab-800 mb-2">Quick Process</h4>
                <p className="text-sm text-baobab-600">Select, book, and get personalized tour details in 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Planning Form Modal */}
      <TourPlanningForm isOpen={isTourFormOpen} onClose={() => setIsTourFormOpen(false)} />
    </>
  );
};

export default UpcomingTours;
