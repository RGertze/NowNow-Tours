
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../constants';
import type { Testimonial } from '../types';
import TravelPlanningWizard from './TravelPlanningWizard';

const StarDisplay: React.FC<{ rating?: number; size?: number }> = ({ rating = 5, size = 16 }) => (
  <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-${size/4} h-${size/4} ${i < rating ? 'text-sunset-500' : 'text-safari-200'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -24 }}
    transition={{ duration: 0.4 }}
    className="group relative h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-safari-200 to-sunset-200 rounded-2xl opacity-0 group-hover:opacity-70 transition-all duration-300 blur group-hover:blur-lg"></div>
    <div className="relative bg-white p-6 rounded-2xl shadow-md text-left border border-safari-100 group-hover:border-sunset-300 transform transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-xl object-cover shadow-md"
        />
        <div className="flex-1">
          <h4 className="text-baobab-900 font-semibold mb-1">{testimonial.name}</h4>
          <p className="text-xs uppercase tracking-wide text-sunset-600 font-semibold mb-2">
            {testimonial.tripCountry ? `${testimonial.tripCountry}${testimonial.tripDate ? ' · '+testimonial.tripDate : ''}` : 'Traveler'}
          </p>
          <StarDisplay rating={testimonial.rating || 5} />
        </div>
      </div>
      <div className="mt-4 relative">
        <div className="absolute -top-6 -left-2 text-7xl font-serif text-safari-100 select-none" aria-hidden>“</div>
        <p className="text-sm text-baobab-700 leading-relaxed relative z-10">
          {testimonial.quote}
        </p>
      </div>
    </div>
  </motion.div>
);


const Testimonials: React.FC = () => {
  const [isPlanningWizardOpen, setIsPlanningWizardOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Form state
  const [name, setName] = useState('');
  const [tripCountry, setTripCountry] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [quote, setQuote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto rotate featured testimonial
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !tripCountry || !quote) {
      setError('Please fill in name, country, and your experience.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const newTestimonial: Testimonial = {
        name,
        tripCountry,
        tripDate,
        rating,
        quote,
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80',
      };
      setTestimonials((prev) => [newTestimonial, ...prev]);
      setFeaturedIndex(0);
      setName('');
      setTripCountry('');
      setTripDate('');
      setRating(5);
      setQuote('');
      setSubmitting(false);
    }, 600); // simulate async
  };

  return (
    <section className="py-24 bg-gradient-to-br from-sunset-50 to-safari-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4841c' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-baobab-100 text-baobab-700 text-sm font-medium shadow-sm">• Testimonials</div>
          <h2 className="mt-6 text-4xl lg:text-5xl font-bold tracking-tight text-baobab-900">What our travelers say</h2>
          <p className="mt-4 text-baobab-600 max-w-2xl">Trusted by travelers worldwide, here are their stories.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Featured video placeholder */}
          <div className="lg:col-span-1">
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-xl bg-baobab-900 aspect-[3/4] flex items-end"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60')] bg-cover bg-center opacity-70" />
              {/* Play button */}
              <button
                aria-label="Play testimonial video"
                className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </button>
              {/* Rotating featured testimonial overlay */}
              <div className="p-8 relative z-10 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-white text-lg font-medium leading-relaxed mb-6 line-clamp-6">“{testimonials[featuredIndex].quote}”</p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonials[featuredIndex].image}
                        alt={testimonials[featuredIndex].name}
                        className="w-14 h-14 rounded-xl object-cover ring-2 ring-white/50"
                      />
                      <div>
                        <p className="text-white font-semibold">{testimonials[featuredIndex].name}</p>
                        <p className="text-white/70 text-sm">
                          {testimonials[featuredIndex].tripCountry ? testimonials[featuredIndex].tripCountry : 'Traveler'}
                          {testimonials[featuredIndex].tripDate ? ` · ${testimonials[featuredIndex].tripDate}` : ''}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
            <p className="text-xs text-baobab-500 mt-3">Video testimonial placeholder (13–30s future content)</p>
          </div>

          {/* Testimonials list */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {testimonials.slice(0,6).map((t) => (
                  <TestimonialCard key={t.name + t.quote.slice(0,8)} testimonial={t} />
                ))}
              </AnimatePresence>
            </div>

            {/* Submission form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10 bg-white border border-safari-200 rounded-2xl p-8 shadow-md"
            >
              <h3 className="text-xl font-bold text-baobab-900 mb-4">Share your experience</h3>
              <p className="text-sm text-baobab-600 mb-6">Add your story and inspire future travelers. New reviews fade in automatically.</p>
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-baobab-700 mb-1">Your Name</label>
                  <input value={name} onChange={(e)=>setName(e.target.value)} className="rounded-lg border border-safari-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sunset-400" placeholder="E.g. Aisha" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-baobab-700 mb-1">Trip Country</label>
                  <input value={tripCountry} onChange={(e)=>setTripCountry(e.target.value)} className="rounded-lg border border-safari-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sunset-400" placeholder="E.g. Zanzibar" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-baobab-700 mb-1">Trip Date</label>
                  <input value={tripDate} onChange={(e)=>setTripDate(e.target.value)} className="rounded-lg border border-safari-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sunset-400" placeholder="E.g. Jun 2025" />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-xs font-semibold text-baobab-700 mb-2 flex items-center gap-2">Rating
                  <span className="text-xs text-baobab-500">({rating} / 5)</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1,2,3,4,5].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={()=>setRating(r)}
                      className={`p-2 rounded-md transition ${r <= rating ? 'text-sunset-500' : 'text-safari-300'} hover:scale-110`}
                      aria-label={`Set rating ${r}`}
                    >
                      <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="text-xs font-semibold text-baobab-700 mb-1">Your Experience</label>
                <textarea value={quote} onChange={(e)=>setQuote(e.target.value)} rows={4} className="w-full rounded-lg border border-safari-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sunset-400 resize-none" placeholder="Share a highlight or what made the trip special..." />
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-sunset-500 to-safari-500 hover:from-sunset-600 hover:to-safari-600 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlanningWizardOpen(true)}
                  className="px-6 py-3 rounded-full bg-white border border-safari-300 hover:border-sunset-400 text-baobab-700 font-semibold shadow-sm hover:shadow-md transition"
                >
                  Plan a Trip
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
      
      <TravelPlanningWizard 
        isOpen={isPlanningWizardOpen} 
        onClose={() => setIsPlanningWizardOpen(false)} 
      />
    </section>
  );
};

export default Testimonials;
