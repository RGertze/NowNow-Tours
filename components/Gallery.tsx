
import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES } from '../constants';

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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % GALLERY_IMAGES.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sky-800">Past Tours Gallery</h2>
          <p className="text-lg text-stone-600 mt-2">Moments we've shared, memories we've made.</p>
        </div>
        <div className="relative w-full max-w-4xl mx-auto rounded-lg shadow-2xl overflow-hidden">
          <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
              <div className="flex transition-transform ease-in-out duration-700" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {GALLERY_IMAGES.map((src, index) => (
                  <img key={index} src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover flex-shrink-0" />
                ))}
              </div>
          </div>
          <ArrowLeft onClick={prevSlide} />
          <ArrowRight onClick={nextSlide} />
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {GALLERY_IMAGES.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50'}`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
