import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TourPlanningForm from './TourPlanningForm';
import TripItinerary from './TripItinerary';
import PinCarousel from './PinCarousel';

const Hero: React.FC = () => {
  const [isPlanningFormOpen, setIsPlanningFormOpen] = useState(false);
  const [itineraryOpen, setItineraryOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ title: string; img: string } | null>(null);
  const [backgroundImage, setBackgroundImage] = useState('/hero-bg.jpg');
  const heroRef = useRef<HTMLElement | null>(null);

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
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* Ken Burns Background Zoom Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      >
        <motion.img
          key={backgroundImage}
          src={backgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop';
          }}
        />
      </motion.div>

      {/* Immersive Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>

      {/* Main Content Container */}
      <div className="relative z-40 h-full flex items-start justify-center px-4 md:px-6 pt-32 md:pt-40">
        <motion.div
          className="max-w-5xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Massive Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl leading-tight"
          >
            Effortless African
            <br />
            <span className="bg-gradient-to-r from-sunset-400 via-safari-400 to-sunset-300 bg-clip-text text-transparent">
              Adventures
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Plan less. Experience more. Local expertise and seamless support for journeys that matter.
          </motion.p>

          {/* CTA Buttons with Glassmorphism */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col md:flex-row justify-center items-center gap-4"
          >
            <motion.button
              {...buttonVariants}
              onClick={() => scrollToSection('tours')}
              className="px-8 py-4 bg-gradient-to-r from-sunset-500 to-sunset-600 hover:from-sunset-600 hover:to-sunset-700 text-white font-semibold rounded-full shadow-2xl text-lg"
            >
              Get Started
            </motion.button>

            <motion.button
              {...buttonVariants}
              onClick={() => setIsPlanningFormOpen(true)}
              className="px-8 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white font-semibold rounded-full shadow-xl hover:bg-white/30 text-lg transition-all"
            >
              Plan Your Trip
            </motion.button>
          </motion.div>

          {/* Pin-style 3D stacked carousel placed below CTAs */}
          <motion.div variants={itemVariants} className="mt-8">
            <PinCarousel onActiveChange={setBackgroundImage} autoplayInterval={4000} />
          </motion.div>
        </motion.div>
      </div>

      <TourPlanningForm isOpen={isPlanningFormOpen} onClose={() => setIsPlanningFormOpen(false)} />

      <TripItinerary isOpen={itineraryOpen} onClose={() => setItineraryOpen(false)} place={selectedPlace} />
    </section>
  );
};

export default Hero;