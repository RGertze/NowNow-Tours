```
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TourPlanningForm from './TourPlanningForm';
import TripItinerary from './TripItinerary';

const Hero: React.FC = () => {
  const [isPlanningFormOpen, setIsPlanningFormOpen] = useState(false);
  const [itineraryOpen, setItineraryOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ title: string; img: string } | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (!heroRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio <= 0.25) {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop"
          alt="African Safari Landscape"
          className="w-full h-full object-cover scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 container mx-auto px-4 text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 inline-block">
          <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium tracking-wider uppercase">
            Experience Africa Like Never Before
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight"
        >
          Wilderness <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-300 to-safari-300">
            Reimagined
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Curated safaris and adventures tailored to your wildest dreams. 
          Immerse yourself in the untamed beauty of Africa.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => scrollToSection('tours')}
            className="group relative px-8 py-4 bg-white text-baobab-900 font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Explore Tours</span>
            <div className="absolute inset-0 bg-sunset-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>

          <button
            onClick={() => setIsPlanningFormOpen(true)}
            className="group px-8 py-4 bg-transparent border border-white/30 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
          >
            Plan Custom Trip
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto" />
      </motion.div>

      <TourPlanningForm isOpen={isPlanningFormOpen} onClose={() => setIsPlanningFormOpen(false)} />
      <TripItinerary isOpen={itineraryOpen} onClose={() => setItineraryOpen(false)} place={selectedPlace} />
    </section>
  );
};

export default Hero;
```