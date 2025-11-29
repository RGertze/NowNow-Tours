
import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES } from '../constants';
import galleryConfig from '../content/gallery.json';

const ArrowLeft: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 z-10 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const ArrowRight: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 z-10 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);


const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const dynamicImages: string[] = Array.isArray((galleryConfig as any).images) && (galleryConfig as any).images.length > 0
    ? (galleryConfig as any).images.map((name: string) => name.startsWith('/images/gallery/') ? name : `/images/gallery/${name}`)
    : GALLERY_IMAGES;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicImages.length);
  }, [dynamicImages.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + dynamicImages.length) % dynamicImages.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 6000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <section className="py-24 bg-gradient-to-br from-white to-earth-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-safari-100 to-transparent rounded-full -translate-y-36 translate-x-36 opacity-60"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Memories from Our Adventures
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-baobab-700 max-w-2xl mx-auto leading-relaxed">
            Captured moments from our travelers' incredible African journeys.
          </p>
        </div>
        
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-safari-100">
          <div className="relative h-96 md:h-[600px] w-full overflow-hidden">
            <div className="flex transition-transform ease-in-out duration-1000" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {dynamicImages.map((src, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative">
                  <img 
                    src={src} 
                    alt={`Beautiful African travel moment ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
              ))}
            </div>
          </div>
          
          <ArrowLeft onClick={prevSlide} />
          <ArrowRight onClick={nextSlide} />
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
            {dynamicImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  currentIndex === index ? 'bg-white scale-125 shadow-lg' : 'bg-white/60 hover:bg-white/80'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Image counter */}
          <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {dynamicImages.length}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-baobab-600 mb-6">
            Want to see more? Follow us on social media for daily updates!
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-baobab-700 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-safari-100">
              Instagram
            </button>
            <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-baobab-700 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-safari-100">
              Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
