import React, { useState, useEffect, useRef } from 'react';
import TourPlanningForm from './TourPlanningForm';
import PopularPlaces from './PopularPlaces';
import TripItinerary from './TripItinerary';

const Hero: React.FC = () => {
  const [isPlanningFormOpen, setIsPlanningFormOpen] = useState(false);
  const [itineraryOpen, setItineraryOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ title: string; img: string } | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting && entry.intersectionRatio > 0.25;
          setIsHeroVisible(visible);
          if (!visible) {
            // close any open itinerary when hero scrolls away
            setItineraryOpen(false);
          }
        });
      },
      { threshold: [0, 0.25, 0.5] }
    );

    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative w-full">
      {/* Background image placeholder - replace with your asset at /public/hero-bg.jpg */}
      <div className="relative h-[72vh] md:h-[78vh] lg:h-[88vh] w-full overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover brightness-90"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"></div>

        {/* decorative top-left image removed per request */}

        <div className="relative z-40 h-full flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-lg">
              Unlock Your Travel Dreams
              <br />
              <span className="bg-gradient-to-r from-sunset-400 to-safari-400 bg-clip-text text-transparent">With Us!!!</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/90 max-w-2xl mx-auto font-light">
              Discover the world one adventure at a time — life is short, book the trip.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => scrollToSection('tours')}
                className="rounded-2xl bg-sunset-500 hover:bg-sunset-600 text-white font-semibold px-6 py-3 shadow-xl text-lg"
              >
                Get Started
              </button>

              <button
                onClick={() => setIsPlanningFormOpen(true)}
                className="rounded-2xl bg-white/10 backdrop-blur-md text-white font-semibold px-5 py-3 hover:bg-white/20"
              >
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Right-side stacked popular place cards inside hero - only while visible */}
      {isHeroVisible && (
        <PopularPlaces
          onExplore={(place) => {
            setSelectedPlace(place);
            setItineraryOpen(true);
          }}
        />
      )}

      <TourPlanningForm isOpen={isPlanningFormOpen} onClose={() => setIsPlanningFormOpen(false)} />

      <TripItinerary isOpen={itineraryOpen} onClose={() => setItineraryOpen(false)} place={selectedPlace} />

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;