import React from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Mr & Mrs Nekwaya',
    location: 'Zanzibar, Tanzania',
    rating: 5,
    text: 'This was us in Zanzibar — a truly magical experience. The planning was seamless, and we felt taken care of throughout. Thank you, Now Now Tours!',
    image: '/testimonials/nekwaya.jpg',
  },
  {
    id: 2,
    name: 'Mr & Mrs Nekwaya',
    location: 'Zanzibar, Tanzania',
    rating: 5,
    text: 'Our Zanzibar escape was unforgettable. Warm service, seamless planning, and beautiful moments captured. Now Now Tours made everything effortless for us – highly recommended!',
    image: '/testimonials/nekwaya.jpg', // Add this image file under public/testimonials/nekwaya.jpg
  },
  {
    id: 3,
    name: 'Lindi Sibanda',
    location: 'Harare, Zimbabwe',
    rating: 5,
    text: 'Smooth booking process and amazing memories created. The Victoria Falls trip exceeded all expectations. Thank you Now Now Tours!',
    image: '/testimonials/lindi.jpg',
  },
  {
    id: 4,
    name: 'David Mensah',
    location: 'Accra, Ghana',
    rating: 5,
    text: 'Professional service from start to finish. The group was fun, accommodations were great, and the experiences were unforgettable.',
    image: '/testimonials/david.jpg',
  },
  {
    id: 5,
    name: 'Amina Hassan',
    location: 'Dar es Salaam, Tanzania',
    rating: 5,
    text: 'Great value for money! The Zanzibar trip was a dream come true. Everything was organized perfectly and the team was always available.',
    image: '/testimonials/amina.jpg',
  },
  {
    id: 6,
    name: 'John Smith',
    location: 'London, UK',
    rating: 5,
    text: 'As a first-time visitor to Africa, I couldn\'t have asked for a better experience. The guides were knowledgeable and the itinerary was well-paced.',
    image: '/testimonials/john.jpg',
  },
];

const Reviews: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-baobab-800 mb-4">
            What Our Travelers Say
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Over 1,000+ happy travelers have experienced the magic of Africa with us
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 prose prose-baobab max-w-none">
            {TESTIMONIALS.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-sunset-400 to-sunset-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg text-baobab-800 font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed">"{review.text}"</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 bg-gradient-to-r from-sunset-500 to-sunset-600 rounded-2xl p-8 text-white text-center"
          >
            <h2 className="mb-4 font-semibold">Ready to Create Your Own Story?</h2>
            <p className="text-lg mb-6">Join thousands of happy travelers and experience Africa like never before</p>
            <a
              href="https://wa.me/264812297409?text=Hi! I want to book a tour"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-white text-sunset-500 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Your Adventure
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;
