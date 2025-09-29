
import React from 'react';
import { TESTIMONIALS_DATA } from '../constants';
import type { Testimonial } from '../types';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center">
    <img 
      src={testimonial.image} 
      alt={`Testimonial from ${testimonial.name}`}
      className="w-24 h-24 rounded-full mx-auto -mt-20 mb-4 border-4 border-orange-500 shadow-md"
    />
    <p className="text-stone-600 italic mb-4">"{testimonial.quote}"</p>
    <p className="font-bold text-sky-800">{testimonial.name}</p>
  </div>
);


const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-sky-100" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/az-subtle.png')"}}>
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-sky-800">What Our Travelers Say</h2>
                <p className="text-lg text-stone-600 mt-2">Stories from the heart of their journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 pt-12">
                {TESTIMONIALS_DATA.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    </section>
  );
};

export default Testimonials;
