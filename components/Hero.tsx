import React, { useState, useEffect } from 'react';
import { HERO_IMAGES } from '../constants';

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {HERO_IMAGES.map((src, index) => (
         <img 
            key={index}
            src={src} 
            alt="Happy tourists on an adventure in Africa" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transition: 'opacity 1s ease-in-out, transform 1.5s ease-in-out',
              opacity: index === currentIndex ? 1 : 0,
              transform: `scale(${index === currentIndex ? 1 : 1.05})`,
            }}
          />
      ))}
      <div className="relative z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
          Discover Africa with NowNow Tours
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
          We create authentic, memorable, and hassle-free travel experiences across the continent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('tours')} 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            Explore Tours
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="bg-white/20 backdrop-blur-sm border-2 border-white hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;