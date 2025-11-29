import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { TOURS_DATA } from '../constants';
import smallCards from '../content/small-cards.json';
import cardMapJson from '../content/tour-card-images.json';
import type { Tour } from '../types';

// Country flag images
const COUNTRY_FLAGS: Record<string, string> = {
  'Tanzania': '/flags/Tanzania National Flag.jpg',
  'South Africa': '/flags/South Africa National Flag.jpg',
  'Angola': '/flags/Angola national Flag.jpg',
  'Zambia': '/flags/Zamibia National Flag.jpg',
  'Lesotho': '/flags/lesotho National Flag.jpg',
  'Indonesia': '/flags/Indonesia National Flag.jpg',
  'Maldives': '/flags/Maldives National Flag.jpg',
};

// Smart filter categories
const FILTER_CATEGORIES = [
  { label: 'All Trips', value: 'all' },
  { label: 'Wildlife & Safari', value: 'wildlife' },
  { label: 'Beach Paradise', value: 'beach' },
  { label: 'Cultural Journey', value: 'cultural' },
  { label: 'Adventure & Nature', value: 'adventure' },
  { label: 'Luxury Escapes', value: 'luxury' },
];

// Categorize tours
const categorizeTour = (tour: Tour): string[] => {
  const categories: string[] = [];
  const name = tour.name.toLowerCase();
  const dest = tour.destination.toLowerCase();
  const desc = tour.description.toLowerCase();
  
  if (name.includes('safari') || dest.includes('tanzania') || desc.includes('wildlife')) {
    categories.push('wildlife');
  }
  if (name.includes('beach') || name.includes('zanzibar') || name.includes('maldives') || dest.includes('maldives')) {
    categories.push('beach');
  }
  if (name.includes('cultural') || name.includes('bali') || desc.includes('culture') || desc.includes('temple')) {
    categories.push('cultural');
  }
  if (name.includes('adventure') || name.includes('falls') || name.includes('highlands') || desc.includes('mountain')) {
    categories.push('adventure');
  }
  if (name.includes('luxury') || name.includes('retreat') || dest.includes('maldives') || tour.priceRange.includes('54,300')) {
    categories.push('luxury');
  }
  
  return categories.length > 0 ? categories : ['adventure']; // default
};

interface TourCardProps {
  tour: Tour;
  onViewDetails: () => void;
  showComingSoon?: boolean;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onViewDetails, showComingSoon }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fallbackCards: string[] = Array.isArray((smallCards as any).images)
    ? (smallCards as any).images.filter((n: string) => typeof n === 'string' && !n.toLowerCase().includes('gitkeep'))
    : [];
  const cardMap: Record<string, string> = (cardMapJson as any)?.map || {};

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
  const cardForSlug = (slug?: string): string | null => {
    if (!slug) return null;
    const v = cardMap[slug];
    return v ? v : null;
  };

  // Auto-slide images every 3 seconds
  useEffect(() => {
    if (tour.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tour.images.length]);

  const price = tour.priceRange.split('·')[0].trim();
  const flag = COUNTRY_FLAGS[tour.destination] || '/flags/default.png';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
    >
      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={(tour.images && tour.images.length)
              ? tour.images[currentImageIndex]
              : (() => {
                  const specific = cardForSlug(tour.slug);
                  if (specific) return `/images/small-cards/${specific}`;
                  const match = cardForDestination(tour.destination || tour.name);
                  if (match) return `/images/small-cards/${match}`;
                  if (fallbackCards.length) return `/images/small-cards/${fallbackCards[Math.floor(Math.random()*fallbackCards.length)]}`;
                  return '/images/gallery/placeholder.jpg';
                })()
            }
            alt={`${tour.name} ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const specific = cardForSlug(tour.slug);
              const match = specific || cardForDestination(tour.destination || tour.name);
              const fallback = match ? `/images/small-cards/${match}` : (fallbackCards.length ? `/images/small-cards/${fallbackCards[Math.floor(Math.random()*fallbackCards.length)]}` : '/images/gallery/placeholder.jpg');
              (e.currentTarget as HTMLImageElement).src = fallback;
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        {/* Country Flag (top-right, circular) */}
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md overflow-hidden">
          <img
            src={flag}
            alt={`${tour.destination} flag`}
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/40?text=Flag'; }}
          />
        </div>
        
        {/* Coming Soon Badge */}
        {showComingSoon && (
          <div className="absolute top-3 left-3 bg-sunset-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase shadow-lg">
            Coming Soon
          </div>
        )}

        {/* Image indicators */}
        {tour.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {tour.images.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title & Location */}
        <h3 className="text-xl font-bold text-baobab-900 mb-1">{tour.name}</h3>
        <div className="flex items-center gap-1 text-sm text-baobab-600 mb-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{tour.destination}</span>
        </div>

        {/* Dates */}
        {tour.upcomingDates && tour.upcomingDates.length > 0 && (
          <div className="flex items-center gap-1 text-sm text-baobab-600 mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{tour.upcomingDates[0]}</span>
            {tour.upcomingDates.length > 1 && (
              <span className="text-safari-600 font-medium">+{tour.upcomingDates.length - 1} more</span>
            )}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-sunset-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-baobab-600 ml-1">5.0</span>
        </div>

        {/* Description */}
        <p className="text-sm text-baobab-700 mb-4 line-clamp-2 flex-grow">{tour.description}</p>

        {/* Price & Fees */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-baobab-900">{price}</span>
            <span className="text-sm text-baobab-600">/ person</span>
          </div>
          <p className="text-xs text-baobab-500 mt-1">Including park fees and guides</p>
        </div>

        {/* View Details Button */}
        <button
          onClick={onViewDetails}
          className="w-full bg-gradient-to-r from-safari-500 to-sunset-500 hover:from-safari-600 hover:to-sunset-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

interface DetailModalProps {
  tour: Tour;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ tour, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const price = tour.priceRange.split('·')[0].trim();
  const deposit = tour.priceRange.split('·')[1]?.trim();

  const whatsappMessage = selectedDate
    ? `Hi! I'm interested in booking ${tour.name} for the dates: ${selectedDate}. ${price}`
    : `Hi! I'm interested in ${tour.name}. ${price}`;
  
  const whatsappLink = `https://wa.me/264812297409?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header Image */}
        <div className="relative h-64">
          <img src={tour.images[0]} alt={tour.name} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          {/* Title & Location */}
          <h2 className="text-3xl font-bold text-baobab-900 mb-2">{tour.name}</h2>
          <div className="flex items-center gap-2 text-sunset-600 font-medium mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{tour.destination}</span>
          </div>

          {/* Description */}
          <p className="text-baobab-700 mb-6 leading-relaxed">{tour.description}</p>

          {/* Itinerary */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-baobab-900 mb-4">Package Includes</h3>
            <ul className="space-y-2">
              {tour.itinerary.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-baobab-700">
                  <svg className="w-5 h-5 text-safari-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Dates */}
          {tour.upcomingDates && tour.upcomingDates.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-baobab-900 mb-4">Select Your Travel Date</h3>
              <div className="grid grid-cols-2 gap-3">
                {tour.upcomingDates.map((date, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className={`relative rounded-lg px-4 py-3 text-center transition-all duration-300 transform hover:scale-105 ${
                      selectedDate === date
                        ? 'bg-gradient-to-br from-safari-500 to-sunset-500 border-2 border-sunset-600 shadow-lg'
                        : 'bg-safari-50 border-2 border-safari-200 hover:border-safari-400'
                    }`}
                  >
                    {selectedDate === date && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <svg className={`w-5 h-5 mx-auto mb-1 ${selectedDate === date ? 'text-white' : 'text-safari-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className={`text-sm font-medium ${selectedDate === date ? 'text-white' : 'text-baobab-900'}`}>{date}</span>
                  </button>
                ))}
              </div>
              {selectedDate && (
                <p className="text-center text-sm text-safari-700 font-medium mt-3 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Selected: {selectedDate}
                </p>
              )}
            </div>
          )}

          {/* Pricing */}
          <div className="bg-gradient-to-br from-safari-50 to-sunset-50 rounded-2xl p-6 mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-baobab-900">{price}</span>
              <span className="text-baobab-600">per person</span>
            </div>
            {deposit && (
              <p className="text-sm text-sunset-700 font-medium">{deposit}</p>
            )}
            {tour.extras?.dinner && (
              <p className="text-xs text-baobab-600 mt-2">Note: Dinner is at own cost</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaWhatsapp size={24} />
              {selectedDate ? 'Book Selected Date' : 'Book Now on WhatsApp'}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface ToursNewProps {
  showAll?: boolean;
  showFilters?: boolean;
  maxCards?: number;
}

const ToursNew: React.FC<ToursNewProps> = ({ showAll = false, showFilters = true, maxCards }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const filteredTours = TOURS_DATA.filter((tour) => {
    if (activeFilter === 'all') return true;
    const categories = categorizeTour(tour);
    return categories.includes(activeFilter);
  });

  const displayedTours = maxCards && !showAll ? filteredTours.slice(0, maxCards) : filteredTours;

  return (
    <section className="py-24 bg-gradient-to-br from-white via-safari-50 to-earth-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sunset-100 to-transparent rounded-full -translate-y-48 translate-x-48 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-safari-100 to-transparent rounded-full translate-y-40 -translate-x-40 opacity-40"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-baobab-900 mb-4">
            Best Travel Destinations
          </h2>
          <p className="text-lg text-baobab-600 max-w-2xl mx-auto">
            Explore the best properties in prime locations and take the next step towards your future today.
          </p>
        </div>

        {/* Filter Buttons */}
        {showFilters && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === cat.value
                  ? 'bg-baobab-900 text-white shadow-lg'
                  : 'bg-white text-baobab-700 hover:bg-baobab-100 shadow-md hover:shadow-lg'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        )}

        {/* Tour Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedTours.map((tour) => (
              <TourCard
                key={tour.slug}
                tour={tour}
                onViewDetails={() => setSelectedTour(tour)}
                showComingSoon={showAll && tour.destination === 'Maldives'}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More Button */}
        {!showAll && maxCards && filteredTours.length > maxCards && (
          <div className="text-center mt-12">
            <a
              href="/adventures"
              className="inline-block bg-gradient-to-r from-safari-500 to-sunset-500 hover:from-safari-600 hover:to-sunset-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Show More Destinations
            </a>
          </div>
        )}

        {/* Empty State */}
        {displayedTours.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-baobab-600">No tours found in this category.</p>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTour && (
          <DetailModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ToursNew;
