import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface GalleryGridProps {
  images: string[];
  title?: string;
  description?: string;
}

const GROUP_SIZE = 8;
const CYCLE_MS = 5000; // 5s pause before next group

const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  title = 'Our Journeys & Memories',
  description = 'A curated collection of moments from our tours across Africa — landscapes, wildlife, people, and unforgettable experiences.',
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [groupIndex, setGroupIndex] = useState(0);
  const [entered, setEntered] = useState(true);

  // Prioritize latest pictures first
  const sortedImages = [...images].reverse();
  const totalGroups = Math.max(1, Math.ceil(sortedImages.length / GROUP_SIZE));
  const currentGroup = sortedImages.slice(
    groupIndex * GROUP_SIZE,
    groupIndex * GROUP_SIZE + GROUP_SIZE
  );

  // Ensure images appear instantly without initial delay
  useEffect(() => {
    setEntered(true);
  }, []);

  // Cycle groups every 5 seconds
  useEffect(() => {
    if (!sortedImages.length) return;
    const id = setInterval(() => {
      setGroupIndex((prev) => (prev + 1) % totalGroups);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [sortedImages.length, totalGroups]);

  // Lightbox controls
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(-1);
  const prev = () =>
    setLightboxIndex((idx) => (idx - 1 + sortedImages.length) % sortedImages.length);
  const next = () =>
    setLightboxIndex((idx) => (idx + 1) % sortedImages.length);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === -1) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, sortedImages.length]);

  // Preload neighbor images
  useEffect(() => {
    if (lightboxIndex === -1 || !sortedImages.length) return;
    const toPreload = [
      sortedImages[(lightboxIndex + 1) % sortedImages.length],
      sortedImages[(lightboxIndex - 1 + sortedImages.length) % sortedImages.length],
    ];
    toPreload.forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, [lightboxIndex, sortedImages]);

  const itemVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    in: { opacity: 1, scale: 1, y: 0 },
    out: { opacity: 0, scale: 0.92, y: -10 },
  };

  return (
    <>
      {/* Intro Section */}
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-safari-900 mb-4">
          {title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full mx-auto mb-6"></div>
        <p className="text-lg md:text-xl text-baobab-700 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </header>

      {/* Animated Masonry Grid of 8 with zoom-in on enter */}
      <AnimatePresence mode="wait">
        <motion.div
          key={groupIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 grid-cols-2 md:grid-cols-6 auto-rows-[140px] md:auto-rows-[140px]"
        >
          {currentGroup.map((src, i) => {
            // Multiple span patterns to vary visual rhythm per cycle
            const spanMapPatterns: string[][] = [
              [
                'md:col-span-3 md:row-span-3',
                'md:col-span-2 md:row-span-2',
                'md:col-span-1 md:row-span-2',
                'md:col-span-2 md:row-span-1',
                'md:col-span-1 md:row-span-1',
                'md:col-span-2 md:row-span-2',
                'md:col-span-1 md:row-span-1',
                'md:col-span-1 md:row-span-2',
              ],
              [
                'md:col-span-2 md:row-span-3',
                'md:col-span-3 md:row-span-2',
                'md:col-span-1 md:row-span-1',
                'md:col-span-2 md:row-span-1',
                'md:col-span-1 md:row-span-2',
                'md:col-span-2 md:row-span-2',
                'md:col-span-1 md:row-span-1',
                'md:col-span-1 md:row-span-2',
              ],
              [
                'md:col-span-3 md:row-span-2',
                'md:col-span-2 md:row-span-3',
                'md:col-span-1 md:row-span-1',
                'md:col-span-1 md:row-span-2',
                'md:col-span-2 md:row-span-1',
                'md:col-span-2 md:row-span-2',
                'md:col-span-1 md:row-span-1',
                'md:col-span-1 md:row-span-2',
              ],
            ];
            const spanMap = spanMapPatterns[groupIndex % spanMapPatterns.length];
            const spans = spanMap[i % spanMap.length];
            return (
            <motion.figure
              key={src + i}
              variants={itemVariants}
              initial="initial"
              animate={entered ? 'in' : 'initial'}
              exit="out"
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`group relative rounded-xl overflow-hidden ${spans}`}
              onClick={() => openLightbox(groupIndex * GROUP_SIZE + i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(groupIndex * GROUP_SIZE + i);
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sunset-400 to-safari-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur group-hover:blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white/80 to-white/40 h-full overflow-hidden rounded-xl border border-white/50 group-hover:border-safari-200 transform transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                <img
                  src={src}
                  alt={`Gallery image ${groupIndex * GROUP_SIZE + i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
              <figcaption className="absolute left-0 bottom-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <p className="text-sm text-white line-clamp-2 font-medium">Click to view</p>
                <p className="text-xs text-white/70 mt-1">{groupIndex * GROUP_SIZE + i + 1} of {sortedImages.length}</p>
              </figcaption>
            </motion.figure>
          );})}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Modal */}
      {lightboxIndex >= 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={closeLightbox}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative max-w-6xl w-full h-full lg:h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-all duration-200 transform hover:scale-110"
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={sortedImages[lightboxIndex]}
              alt={`Preview ${lightboxIndex + 1}`}
              className="w-full h-[70vh] lg:h-[80vh] object-contain mx-auto rounded-lg shadow-2xl animate-slide-up"
            />

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 z-20 transition-all duration-200 transform hover:scale-110 hover:-translate-x-1"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 z-20 transition-all duration-200 transform hover:scale-110 hover:translate-x-1"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 text-white bg-gradient-to-r from-black/50 to-black/40 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {lightboxIndex + 1} / {sortedImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
