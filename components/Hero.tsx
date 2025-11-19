import React, { useState, useEffect } from 'react';
import { HERO_IMAGES } from '../constants';
import TourPlanningForm from './TourPlanningForm';

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlanningFormOpen, setIsPlanningFormOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);
    
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 z-10"></div>
      {HERO_IMAGES.map((src, index) => (
         <img 
            key={index}
            src={src} 
            alt="Stunning African landscapes and safari adventures" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transition: 'opacity 1.5s ease-in-out, transform 2s ease-in-out',
              opacity: index === currentIndex ? 1 : 0,
              transform: `scale(${index === currentIndex ? 1 : 1.08})`,
            }}
          />
      ))}
      <div className="relative z-20 text-center px-4 animate-fade-in">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-shadow animate-slide-up">
          Discover Africa with{' '}
          <span className="bg-gradient-to-r from-sunset-400 to-safari-400 bg-clip-text text-transparent">
            Now Now Tours & Safaris
          </span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 text-shadow-sm font-light leading-relaxed animate-slide-up">
          We create authentic, memorable, and hassle-free travel experiences across the magnificent continent of Africa.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
          <button 
            onClick={() => scrollToSection('tours')} 
            className="btn-primary shadow-2xl"
          >
            Explore Our Tours
          </button>
          <button 
            onClick={() => setIsPlanningFormOpen(true)} 
            className="btn-secondary shadow-xl"
          >
            Plan Your Journey
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <TourPlanningForm 
        isOpen={isPlanningFormOpen} 
        onClose={() => setIsPlanningFormOpen(false)} 
      />
    </section>
  );
};

export default Hero;