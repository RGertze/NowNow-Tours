import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../constants';
import { ScrollMotion } from '../motion/MotionWrapper';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { fadeUp, staggerContainer, scaleIn } from '../motion/motionVariants';
import { VideoLightbox } from './VideoLightbox';
import type { Testimonial } from '../types';

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

const QuoteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.627 2.707-3.227V6.741c0-1.6-1.123-2.994-2.707-3.227A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.514C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
);

const StarIcon: React.FC<{ className?: string; filled?: boolean }> = ({ className, filled = true }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

interface VideoTestimonialProps {
  onPlay: () => void;
  index: number;
}

const VideoTestimonial: React.FC<VideoTestimonialProps> = ({ onPlay, index }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  const cardVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 30,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const playButtonVariants = {
    initial: { scale: 1 },
    animate: {
      scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
      transition: {
        duration: prefersReducedMotion ? 0.01 : 2,
        repeat: prefersReducedMotion ? 0 : Infinity,
        ease: 'easeInOut',
      },
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.15,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative bg-gradient-to-br from-sky-600 to-sky-700 rounded-3xl overflow-hidden shadow-strong group cursor-pointer"
      variants={cardVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      whileHover={{
        scale: prefersReducedMotion ? 1 : 1.02,
        y: prefersReducedMotion ? 0 : -4,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      }}
      onClick={onPlay}
    >
      {/* Background Video Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-sky-500 to-orange-500 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=800&auto=format&fit=crop"
          alt="Happy travelers sharing their experience"
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-lg group-hover:bg-white transition-colors duration-300"
            variants={playButtonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <PlayIcon className="w-12 h-12 text-sky-600 ml-1" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 text-white">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-orange-300">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5" />
            ))}
          </div>
          <span className="text-sky-100 font-medium">5.0</span>
        </div>
        
        <h3 className="text-xl font-bold font-display mb-2">
          Watch Sarah & Michael's Story
        </h3>
        <p className="text-sky-100 leading-relaxed">
          "Our Zanzibar adventure exceeded every expectation. Watch how NowNow Tours 
          turned our dream vacation into the experience of a lifetime."
        </p>
        
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/20">
          <img
            src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=100&auto=format&fit=crop"
            alt="Sarah and Michael"
            className="w-12 h-12 rounded-full border-2 border-white/30"
          />
          <div>
            <p className="font-semibold">Sarah & Michael</p>
            <p className="text-sky-200 text-sm">Zanzibar Getaway</p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full" />
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-400/10 rounded-full" />
    </motion.div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-stone-100 relative overflow-hidden group"
      variants={cardVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      whileHover={{
        y: prefersReducedMotion ? 0 : -4,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      }}
    >
      {/* Quote Icon */}
      <motion.div
        className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-sky-100 to-orange-100 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-70 transition-opacity duration-300"
        initial={{ rotate: -15, scale: 0.8 }}
        animate={{
          rotate: isVisible ? 0 : -15,
          scale: isVisible ? 1 : 0.8,
          transition: {
            duration: prefersReducedMotion ? 0.01 : 0.5,
            delay: prefersReducedMotion ? 0 : 0.3,
          },
        }}
      >
        <QuoteIcon className="w-8 h-8 text-sky-600" />
      </motion.div>

      {/* Stars */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex text-orange-400">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0,
                transition: {
                  duration: prefersReducedMotion ? 0.01 : 0.2,
                  delay: prefersReducedMotion ? 0 : 0.5 + i * 0.1,
                },
              }}
            >
              <StarIcon className="w-5 h-5" />
            </motion.div>
          ))}
        </div>
        <span className="text-stone-500 font-medium">5.0</span>
      </div>

      {/* Quote */}
      <blockquote className="text-stone-600 leading-relaxed mb-8 text-lg italic">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <motion.img
          src={testimonial.image}
          alt={`${testimonial.name} - satisfied customer`}
          className="w-16 h-16 rounded-full object-cover border-4 border-orange-100 shadow-soft"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: isVisible ? 1 : 0.8,
            opacity: isVisible ? 1 : 0,
            transition: {
              duration: prefersReducedMotion ? 0.01 : 0.4,
              delay: prefersReducedMotion ? 0 : 0.7,
            },
          }}
          whileHover={{
            scale: prefersReducedMotion ? 1 : 1.05,
            transition: { duration: 0.2 },
          }}
        />
        <div>
          <p className="font-bold text-sky-800 text-lg">{testimonial.name}</p>
          <p className="text-orange-500 font-medium text-sm">Verified Traveler</p>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-sky-50 to-transparent rounded-full transform translate-x-8 translate-y-8" />
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [headerRef, isHeaderVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  const handleVideoPlay = () => {
    setIsVideoOpen(true);
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <section className="section-spacing bg-gradient-to-br from-stone-50 via-white to-sky-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-sky-50/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-gradient-to-tl from-orange-50/30 to-transparent pointer-events-none" />
        
        <div className="max-width-container container-padding relative z-10">
          {/* Section Header */}
          <ScrollMotion
            ref={headerRef}
            className="text-center mb-16"
            type="fadeUp"
            threshold={0.3}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-sky-800 mb-6"
              variants={fadeUp}
            >
              What Our <span className="gradient-text">Travelers Say</span>
            </motion.h2>
            <motion.p 
              className="text-lg lg:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed mb-8"
              variants={fadeUp}
            >
              Stories from the heart of their journey. Real experiences from real travelers 
              who trusted us to create their African adventure.
            </motion.p>
            
            {/* Decorative Element */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-sky-500 to-orange-500 mx-auto rounded-full"
              variants={fadeUp}
            />
          </ScrollMotion>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Video Testimonial - Takes full height on left */}
            <div className="lg:col-span-1">
              <VideoTestimonial onPlay={handleVideoPlay} index={0} />
            </div>

            {/* Text Testimonials */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {TESTIMONIALS_DATA.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.name}-${index}`}
                  testimonial={testimonial}
                  index={index + 1}
                />
              ))}
            </div>
          </div>

          {/* Statistics Section */}
          <ScrollMotion
            className="text-center"
            type="fadeUp"
            threshold={0.3}
          >
            <motion.div 
              className="bg-gradient-to-r from-sky-600 to-orange-500 rounded-3xl p-8 md:p-12 text-white"
              variants={fadeUp}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {[
                  { number: '500+', label: 'Happy Travelers', sublabel: 'and counting' },
                  { number: '98%', label: 'Satisfaction Rate', sublabel: 'based on reviews' },
                  { number: '4.9/5', label: 'Average Rating', sublabel: 'across all platforms' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: prefersReducedMotion ? 0.01 : 0.5,
                        delay: prefersReducedMotion ? 0 : index * 0.1,
                      },
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sky-100 text-sm">
                      {stat.sublabel}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollMotion>
        </div>
      </section>

      {/* Video Lightbox */}
      <VideoLightbox
        videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        isOpen={isVideoOpen}
        onClose={handleVideoClose}
        title="Sarah & Michael's Zanzibar Adventure"
      />
    </>
  );
};

export default Testimonials;