import React from 'react';
import { motion } from 'framer-motion';
import { DOWNLOADS_DATA } from '../constants';
import { ScrollMotion } from '../motion/MotionWrapper';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { fadeUp, staggerContainer } from '../motion/motionVariants';
import type { DownloadableDocument } from '../types';

const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const ArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

interface DocumentCardProps {
  document: DownloadableDocument;
  index: number;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, index }) => {
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
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const shineVariants = {
    initial: { x: '-100%' },
    hover: {
      x: '100%',
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: 'easeInOut',
      },
    },
  };

  const handleDownload = () => {
    // In a real application, this would trigger the actual download
    window.open(document.fileUrl, '_blank', 'noopener,noreferrer');
  };

  const getFileType = (url: string): string => {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'PDF';
      case 'doc':
      case 'docx':
        return 'DOC';
      case 'xls':
      case 'xlsx':
        return 'XLS';
      default:
        return 'FILE';
    }
  };

  const getFileSize = (): string => {
    // Mock file sizes - in a real app, this would come from the API
    const sizes = ['2.4 MB', '1.8 MB', '3.1 MB', '1.2 MB'];
    return sizes[index % sizes.length];
  };

  return (
    <motion.div
      ref={ref}
      className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-stone-100 hover:border-sky-200 relative overflow-hidden"
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
      {/* Shine Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          variants={shineVariants}
          initial="initial"
          whileHover="hover"
        />
      </div>

      {/* File Type Badge */}
      <div className="absolute top-4 right-4">
        <span className="bg-gradient-to-r from-sky-100 to-orange-100 text-sky-700 text-xs font-bold px-2 py-1 rounded-full border border-sky-200">
          {getFileType(document.fileUrl)}
        </span>
      </div>

      {/* Icon */}
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-sky-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-sky-200 group-hover:to-orange-200 transition-colors duration-300"
        whileHover={{
          scale: prefersReducedMotion ? 1 : 1.1,
          rotate: prefersReducedMotion ? 0 : 5,
          transition: {
            duration: 0.2,
            ease: 'easeOut',
          },
        }}
      >
        <DocumentIcon className="w-8 h-8 text-sky-600 group-hover:text-sky-700 transition-colors duration-300" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold font-display text-sky-800 mb-3 group-hover:text-sky-700 transition-colors duration-300">
          {document.title}
        </h3>
        
        <p className="text-stone-600 leading-relaxed mb-4 line-clamp-3">
          {document.description}
        </p>

        {/* File Info */}
        <div className="flex items-center justify-between text-sm text-stone-500 mb-6">
          <span className="font-medium">{getFileSize()}</span>
          <span className="flex items-center gap-1">
            <SparklesIcon className="w-4 h-4" />
            Free Download
          </span>
        </div>

        {/* Download Button */}
        <motion.button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-3"
          whileHover={{
            scale: prefersReducedMotion ? 1 : 1.02,
            y: prefersReducedMotion ? 0 : -1,
          }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
        >
          <ArrowDownIcon className="w-5 h-5" />
          <span>Download Now</span>
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-tl from-sky-50 to-transparent rounded-full opacity-50" />
      <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-orange-50 to-transparent rounded-full opacity-30" />
    </motion.div>
  );
};

const Downloads: React.FC = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <section className="section-spacing bg-gradient-to-br from-white via-stone-50 to-sky-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-sky-50/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-orange-50/30 to-transparent pointer-events-none" />
      
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
            Travel <span className="gradient-text">Resources</span>
          </motion.h2>
          <motion.p 
            className="text-lg lg:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed mb-8"
            variants={fadeUp}
          >
            Download our comprehensive travel guides, brochures, and essential documents 
            to help you plan the perfect African adventure.
          </motion.p>
          
          {/* Decorative Element */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-sky-500 to-orange-500 mx-auto rounded-full"
            variants={fadeUp}
          />
        </ScrollMotion>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {DOWNLOADS_DATA.map((document, index) => (
            <DocumentCard
              key={`${document.title}-${index}`}
              document={document}
              index={index}
            />
          ))}
        </div>

        {/* Additional Info */}
        <ScrollMotion
          className="text-center"
          type="fadeUp"
          threshold={0.3}
        >
          <motion.div 
            className="bg-gradient-to-r from-sky-600 to-orange-500 rounded-3xl p-8 md:p-12 text-white"
            variants={fadeUp}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold font-display mb-4">
                Need Something Specific?
              </h3>
              <p className="text-sky-100 text-lg mb-6 leading-relaxed">
                Can't find what you're looking for? We can create custom itineraries, 
                detailed destination guides, and personalized travel documents just for you.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: '📋', title: 'Custom Itineraries', desc: 'Tailored day-by-day plans' },
                  { icon: '🗺️', title: 'Destination Guides', desc: 'In-depth local insights' },
                  { icon: '📄', title: 'Travel Documents', desc: 'Visa & permit assistance' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                      },
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sky-100 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
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
                Request Custom Documents
              </motion.button>
            </div>
          </motion.div>
        </ScrollMotion>
      </div>
    </section>
  );
};

export default Downloads;