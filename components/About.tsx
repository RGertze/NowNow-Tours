import React from 'react';
import { motion } from 'framer-motion';
import { ScrollMotion } from '../motion/MotionWrapper';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { fadeUp, fadeLeft, fadeRight } from '../motion/motionVariants';

const About: React.FC = () => {
  const [imageRef, isImageVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  });
  
  const [contentRef, isContentVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  // Parallax effect for image
  const imageParallaxVariants = {
    initial: {
      opacity: 0,
      scale: 1.1,
      x: -30,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const contentVariants = {
    initial: {
      opacity: 0,
      x: 30,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.8,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const statsVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const stats = [
    { number: '500+', label: 'Happy Travelers' },
    { number: '15+', label: 'Countries Covered' },
    { number: '5+', label: 'Years Experience' },
    { number: '98%', label: 'Customer Satisfaction' }
  ];

  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-sky-50/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-orange-50/30 to-transparent pointer-events-none" />
      
      <div className="max-width-container container-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            ref={imageRef}
            className="relative"
            variants={imageParallaxVariants}
            initial="initial"
            animate={isImageVisible ? "animate" : "initial"}
            whileHover="hover"
          >
            <div className="relative group">
              {/* Main Image */}
              <motion.img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop"
                alt="Friendly tour guide with warm smile, representing our commitment to personal service" 
                className="rounded-3xl shadow-strong w-full object-cover aspect-[4/3]"
                loading="lazy"
                decoding="async"
              />
              
              {/* Floating Stats Card */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-strong border border-stone-100"
                variants={statsVariants}
                initial="initial"
                animate={isImageVisible ? "animate" : "initial"}
                whileHover={{
                  y: prefersReducedMotion ? 0 : -4,
                  transition: {
                    duration: 0.2,
                    ease: 'easeOut',
                  },
                }}
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isImageVisible ? 1 : 0,
                        scale: isImageVisible ? 1 : 0.8,
                        transition: {
                          duration: prefersReducedMotion ? 0.01 : 0.4,
                          delay: prefersReducedMotion ? 0 : 0.6 + index * 0.1,
                        },
                      }}
                    >
                      <div className="text-xl md:text-2xl font-bold text-sky-800">
                        {stat.number}
                      </div>
                      <div className="text-xs text-stone-600 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-80" />
              <div className="absolute top-1/4 -right-2 w-6 h-6 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full opacity-70" />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            ref={contentRef}
            className="space-y-8"
            variants={contentVariants}
            initial="initial"
            animate={isContentVisible ? "animate" : "initial"}
          >
            {/* Header */}
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-sky-800 mb-6 leading-tight">
                We make travel{' '}
                <span className="gradient-text">easy, safe, and unforgettable</span>
              </h2>
              
              <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-orange-500 rounded-full mb-6" />
            </motion.div>

            {/* Story */}
            <motion.div className="space-y-6" variants={fadeUp}>
              <p className="text-lg text-stone-600 leading-relaxed">
                NowNow Tours was born from a passion for sharing the incredible diversity 
                and beauty of Africa with the world. We are a small, dedicated team of travel 
                experts who believe in creating authentic connections and journeys that go 
                beyond the typical tourist trail.
              </p>
              
              <p className="text-lg text-stone-600 leading-relaxed">
                From the moment you contact us, we handle every detail with care, ensuring 
                your safety, comfort, and peace of mind. Our local guides are not just experts; 
                they are storytellers and friends who will make your adventure truly special.
              </p>
            </motion.div>

            {/* Key Values */}
            <motion.div className="space-y-4" variants={fadeUp}>
              <h3 className="text-xl font-bold font-display text-sky-800 mb-4">
                Our Promise to You
              </h3>
              
              <div className="space-y-3">
                {[
                  {
                    title: 'Authentic Cultural Immersion',
                    description: 'Connect with local communities and traditions in meaningful ways'
                  },
                  {
                    title: 'Uncompromising Safety Standards', 
                    description: 'Your wellbeing is our priority, backed by comprehensive insurance'
                  },
                  {
                    title: 'Personalized Service',
                    description: 'Tailored experiences that match your interests and travel style'
                  }
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors duration-200 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isContentVisible ? 1 : 0,
                      x: isContentVisible ? 0 : -20,
                      transition: {
                        duration: prefersReducedMotion ? 0.01 : 0.5,
                        delay: prefersReducedMotion ? 0 : 0.8 + index * 0.1,
                      },
                    }}
                    whileHover={{
                      x: prefersReducedMotion ? 0 : 4,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-sky-500 to-orange-500 rounded-full mt-3 group-hover:scale-125 transition-transform duration-200" />
                    <div>
                      <h4 className="font-semibold text-sky-800 mb-1 group-hover:text-sky-700 transition-colors duration-200">
                        {value.title}
                      </h4>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <motion.button
                onClick={() => {
                  const element = document.getElementById('tours');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                whileHover={{ 
                  scale: prefersReducedMotion ? 1 : 1.05,
                  y: prefersReducedMotion ? 0 : -2 
                }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              >
                Explore Our Tours
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;