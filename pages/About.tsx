import React from 'react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-baobab-800 mb-6">
            About Now Now Tours
          </h1>
          
          <div className="prose prose-baobab dark:prose-dark max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              We are a Namibia-based travel company specializing in curated group tours across Southern Africa. 
              Our goal is to make travel safe, affordable and memorable for everyone.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-baobab-800 mb-4 font-semibold">Our Mission</h3>
                <p className="text-gray-700">
                  To provide exceptional travel experiences that showcase the beauty, culture, and adventure 
                  of Southern Africa while ensuring safety, affordability, and unforgettable memories.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-baobab-800 mb-4 font-semibold">Our Vision</h3>
                <p className="text-gray-700">
                  To become Southern Africa's most trusted travel partner, connecting travelers with authentic 
                  experiences and creating lasting memories across the continent.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-sunset-500 to-sunset-600 rounded-2xl p-8 text-white">
              <h3 className="mb-4 font-semibold">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Over 1,000+ happy travelers across Africa</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Professional tour leaders with local expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Affordable group packages with transparent pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>24/7 WhatsApp support for all bookings</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Trusted & secure booking process</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
