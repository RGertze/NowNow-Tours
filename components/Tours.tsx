import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { TOURS_DATA } from '../constants';
import type { Tour } from '../types';

const TourCard: React.FC<{ tour: Tour }> = ({ tour }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % tour.images.length);
  };

  return (
    <div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden flex flex-col card-hover border border-safari-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-64 overflow-hidden group">
        <div className="flex transition-transform ease-in-out duration-500 h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {tour.images.map((src, index) => (
            <img key={index} src={src} alt={`${tour.name} view ${index + 1}`} className="w-full h-full object-cover flex-shrink-0" />
          ))}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {tour.images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 z-10 text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={nextImage} 
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 z-10 text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {tour.images.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to image ${index + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/60'}`}
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); setCurrentIndex(index); }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="font-display text-2xl font-bold text-safari-800 mb-2">{tour.name}</h3>
          <p className="text-sm font-semibold text-sunset-600 uppercase tracking-wide">{tour.destination}</p>
        </div>
        
        <p className="text-baobab-700 mb-6 flex-grow leading-relaxed">{tour.description}</p>
        
        <div className="mb-6">
          <h4 className="font-semibold text-baobab-800 mb-3">Sample Itinerary:</h4>
          <ul className="space-y-2 text-baobab-600">
            {tour.itinerary.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-safari-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-safari-300 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-sm text-baobab-500 italic">And much more...</span>
            </li>
          </ul>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <p className="text-xl font-bold text-safari-800">{tour.priceRange}</p>
          <div className="text-right">
            <div className="text-xs text-baobab-500">Starting from</div>
          </div>
        </div>
        
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-auto w-full text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <FaWhatsapp className="text-lg" />
          Contact on WhatsApp
        </a>
      </div>
    </div>
  );
};

const Tours: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-earth-50 to-safari-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-sunset-200/30 to-transparent rounded-full -translate-y-48 -translate-x-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-safari-200/30 to-transparent rounded-full translate-y-40 translate-x-40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Our African Adventures
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-baobab-700 max-w-2xl mx-auto leading-relaxed">
            Curated experiences that showcase the authentic beauty, culture, and wildlife of Africa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {TOURS_DATA.map((tour, index) => (
            <TourCard key={index} tour={tour} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-baobab-600 mb-6">
            Can't find what you're looking for? We create custom itineraries too!
          </p>
          <button className="btn-primary">
            Request Custom Tour
          </button>
        </div>
      </div>
    </section>
  );
};

export default Tours;