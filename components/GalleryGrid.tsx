import React, { useState, useEffect } from 'react';

interface GalleryGridProps {
  images: string[];
  title?: string;
  description?: string;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  title = 'Our Journeys & Memories',
  description = 'A curated collection of moments from our tours across Africa — landscapes, wildlife, people, and unforgettable experiences.',
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Lightbox controls
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(-1);
  const prev = () =>
    setLightboxIndex((idx) => (idx - 1 + images.length) % images.length);
  const next = () =>
    setLightboxIndex((idx) => (idx + 1) % images.length);

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
  }, [lightboxIndex, images.length]);

  // Preload neighbor images
  useEffect(() => {
    if (lightboxIndex === -1 || !images.length) return;
    const toPreload = [
      images[(lightboxIndex + 1) % images.length],
      images[(lightboxIndex - 1 + images.length) % images.length],
    ];
    toPreload.forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, [lightboxIndex, images]);

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

      {/* Responsive Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((src, i) => (
          <figure
            key={i}
            className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-white/80 to-white/40 shadow-lg hover:shadow-2xl border border-safari-100/50 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => openLightbox(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(i);
              }
            }}
          >
            <div className="relative h-64 overflow-hidden bg-gray-200">
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-110"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>
            {/* Caption overlay */}
            <figcaption className="absolute left-0 bottom-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <p className="text-sm text-white line-clamp-2 font-medium">
                Click to view
              </p>
              <p className="text-xs text-white/70 mt-1">
                {i + 1} of {images.length}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

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
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-all duration-200 transform hover:scale-110"
              aria-label="Close lightbox"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Main image with smooth transitions */}
            <img
              src={images[lightboxIndex]}
              alt={`Preview ${lightboxIndex + 1}`}
              className="w-full h-[70vh] lg:h-[80vh] object-contain mx-auto rounded-lg shadow-2xl animate-slide-up"
            />

            {/* Previous button */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 z-20 transition-all duration-200 transform hover:scale-110 hover:-translate-x-1"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 z-20 transition-all duration-200 transform hover:scale-110 hover:translate-x-1"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Counter with enhanced styling */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 text-white bg-gradient-to-r from-black/50 to-black/40 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
