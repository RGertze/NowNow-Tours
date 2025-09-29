import React from 'react';
import { motion } from 'framer-motion';
import { ScrollMotion } from '../motion/MotionWrapper';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { fadeUp, staggerContainer } from '../motion/motionVariants';

// Icons
const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
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
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.1,
      rotate: prefersReducedMotion ? 0 : 5,
      y: prefersReducedMotion ? 0 : -2,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="group bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-stone-100 hover:border-sky-200"
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
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-sky-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-sky-200 group-hover:to-orange-200 transition-colors duration-300"
        variants={iconVariants}
        whileHover="hover"
      >
        <div className="text-sky-600 group-hover:text-sky-700 transition-colors duration-300">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-xl font-bold font-display text-sky-800 mb-3 group-hover:text-sky-700 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-stone-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const WhyChooseUs: React.FC = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  const features = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Safety First",
      description: "Your security and wellbeing are our top priorities. We work only with vetted guides and trusted accommodations, ensuring peace of mind throughout your journey."
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: "Authentic Experiences",
      description: "Connect with local culture through genuine interactions. Our tours go beyond tourist attractions to create meaningful connections with local communities."
    },
    {
      icon: <UsersIcon className="w-8 h-8" />,
      title: "Expert Local Guides",
      description: "Our passionate guides are storytellers and cultural ambassadors who bring destinations to life with their deep knowledge and infectious enthusiasm."
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: "Hassle-Free Planning",
      description: "From visa assistance to airport transfers, we handle every detail. Just pack your bags and prepare for the adventure of a lifetime."
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-br from-white via-stone-50 to-sky-50">
      <div className="max-width-container container-padding">
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
            Why Choose <span className="gradient-text">NowNow Tours</span>
          </motion.h2>
          <motion.p 
            className="text-lg lg:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed mb-8"
            variants={fadeUp}
          >
            We don't just plan trips—we craft transformative experiences that connect you 
            with the heart and soul of Africa while ensuring your comfort and safety every step of the way.
          </motion.p>
          
          {/* Decorative Element */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-sky-500 to-orange-500 mx-auto rounded-full"
            variants={fadeUp}
          />
        </ScrollMotion>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollMotion
          className="text-center mt-16"
          type="fadeUp"
          threshold={0.3}
        >
          <motion.div 
            className="bg-gradient-to-r from-sky-600 to-orange-500 rounded-3xl p-8 md:p-12 text-white"
            variants={fadeUp}
          >
            <h3 className="text-2xl md:text-3xl font-bold font-display mb-4">
              Ready to Start Your African Adventure?
            </h3>
            <p className="text-sky-100 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the magic of Africa with us. 
              Your unforgettable journey is just one conversation away.
            </p>
            <motion.button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-white text-sky-700 font-semibold py-4 px-8 rounded-full hover:bg-stone-100 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600"
              whileHover={{ 
                scale: 1.05,
                y: -2 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Planning Today
            </motion.button>
          </motion.div>
        </ScrollMotion>
      </div>
    </section>
  );
};

export default WhyChooseUs;