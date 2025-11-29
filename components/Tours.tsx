import React, { useState, useRef, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { TOURS_DATA } from '../constants';
import type { Tour } from '../types';
import TourPlanningForm from './TourPlanningForm';
import UpcomingTours from './UpcomingTours';
import { useLocation } from 'react-router-dom';

const TourCard: React.FC<{ tour: Tour }> = ({ tour }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Split price and deposit (if provided with a separator '·') so we can style them separately
  const priceParts = tour.priceRange ? tour.priceRange.split('·').map((s) => s.trim()) : [tour.priceRange];

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
    <div className="group relative h-full w-80 md:w-96 flex-shrink-0 snap-start">
      <div className="absolute inset-0 bg-gradient-to-r from-sunset-400 to-safari-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur group-hover:blur-xl"></div>
      <div 
        className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden flex flex-col border border-white/50 group-hover:border-safari-200 transform transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="article"
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
          <h3 className="font-trip text-2xl font-semibold text-safari-800 mb-2">{tour.name}</h3>
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
          <div>
            <p className="text-xl font-bold text-safari-800">{priceParts[0]}</p>
            {priceParts[1] && (
                <p className="text-sm mt-1 flex items-center gap-2 text-red-600 font-semibold">
                  {/* small money/info icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M9 12h6" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <span>{priceParts[1]}</span>
                </p>
              )}
          </div>
        </div>
        
        <div className="flex gap-3 mt-auto">
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={20} />
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

const Tours: React.FC = () => {
  const [isPlanningFormOpen, setIsPlanningFormOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tourSlug = params.get('tour');
    if (!tourSlug) return;

    // find the tour index by slug
    const idx = TOURS_DATA.findIndex((t) => (t.slug ?? t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) === tourSlug);
    if (idx === -1) return;

    // scroll to the tour card
    requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;
      const card = container.children[idx] as HTMLElement | undefined;
      if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      // open flyer in new tab if available
      const tour = TOURS_DATA[idx];
      if (tour?.flyerUrl && tour.flyerUrl !== '#') {
        window.open(tour.flyerUrl, '_blank', 'noopener');
      }
    });
  }, [location.search]);

  const scrollByAmount = (amount: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // drag to scroll
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    startX = e.nativeEvent.clientX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft = scrollRef.current ? scrollRef.current.scrollLeft : 0;
  };
  const onMouseUp = () => { isDown = false; };
  const onMouseLeave = () => { isDown = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.nativeEvent.clientX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 1; // scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

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
        
        <div className="relative">
          <button
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-520)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-baobab-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            className="overflow-x-auto no-scrollbar scroll-smooth px-4 py-6 flex gap-6 items-stretch snap-x snap-mandatory"
          >
            {TOURS_DATA.map((tour, index) => (
              <TourCard key={index} tour={tour} />
            ))}
          </div>

          <button
            aria-label="Scroll right"
            onClick={() => scrollByAmount(520)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-baobab-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <UpcomingTours />

        <div className="text-center mt-16">
          <p className="text-baobab-600 mb-6">
            Want to add an optional request? Check out our option lists
          </p>
          <button 
            onClick={() => setIsPlanningFormOpen(true)}
            className="btn-primary"
          >
            Request Custom Tour
          </button>
        </div>
      </div>
      
      <TourPlanningForm 
        isOpen={isPlanningFormOpen} 
        onClose={() => setIsPlanningFormOpen(false)} 
      />
    </section>
  );
};

export default Tours;