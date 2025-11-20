
import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../constants';
import type { Testimonial } from '../types';
import TravelPlanningWizard from './TravelPlanningWizard';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="group relative h-full">
    <div className="absolute inset-0 bg-gradient-to-r from-sunset-400 to-safari-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur group-hover:blur-xl"></div>
    <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center border border-white/50 group-hover:border-safari-200 transform transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
      <img 
        src={testimonial.image} 
        alt={`Happy customer ${testimonial.name}`}
        className="w-20 h-20 rounded-full border-4 border-sunset-400 shadow-lg object-cover"
      />
    </div>
    
    {/* Quote icon */}
    <div className="text-safari-300 text-4xl mb-4 mt-8">"</div>
    
    <p className="text-baobab-700 italic mb-6 text-lg leading-relaxed">
      {testimonial.quote}
    </p>
    
    <div className="flex justify-center mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-sunset-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    
    <p className="font-semibold text-safari-800 text-lg">{testimonial.name}</p>
    <p className="text-baobab-500 text-sm">Verified Traveler</p>
    </div>
  </div>
);


const Testimonials: React.FC = () => {
  const [isPlanningWizardOpen, setIsPlanningWizardOpen] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-sunset-50 to-safari-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4841c' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-4">
            What Our Travelers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-baobab-700 max-w-2xl mx-auto leading-relaxed">
            Stories from the heart of their African journey with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-safari-100">
            <h3 className="font-display text-2xl font-bold text-safari-800 mb-4">
              Join Our Community of Happy Travelers
            </h3>
            <p className="text-baobab-700 mb-6">
              Ready to create your own unforgettable African adventure?
            </p>
            <button 
              onClick={() => setIsPlanningWizardOpen(true)}
              className="btn-primary"
            >
              Start Planning Today
            </button>
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
