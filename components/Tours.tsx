import React, { useState } from 'react';
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
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-56 overflow-hidden group">
        <div className="flex transition-transform ease-in-out duration-500 h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {tour.images.map((src, index) => (
            <img key={index} src={src} alt={`${tour.name} view ${index + 1}`} className="w-full h-full object-cover flex-shrink-0" />
          ))}
        </div>

        {tour.images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-1 z-10 text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={nextImage} 
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-1 z-10 text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {tour.images.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to image ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/60'}`}
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); setCurrentIndex(index); }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-sky-800 mb-2">{tour.name}</h3>
        <p className="text-sm font-semibold text-orange-500 uppercase mb-3">{tour.destination}</p>
        <p className="text-stone-600 mb-4 flex-grow">{tour.description}</p>
        <div className="mb-4">
          <h4 className="font-bold mb-2">Sample Itinerary:</h4>
          <ul className="list-disc list-inside text-stone-500 space-y-1">
            {tour.itinerary.slice(0, 3).map((item, index) => <li key={index}>{item}</li>)}
            <li>And more...</li>
          </ul>
        </div>
        <p className="text-lg font-bold text-stone-800 mb-4">{tour.priceRange}</p>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="mt-auto w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
          <i className="fab fa-whatsapp"></i>
          Contact on WhatsApp
        </a>
      </div>
    </div>
  );
};

const Tours: React.FC = () => {
  return (
    <section className="py-20 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sky-800">Our Adventures</h2>
          <p className="text-lg text-stone-600 mt-2">Curated experiences for the modern traveler.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TOURS_DATA.map((tour, index) => (
            <TourCard key={index} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tours;