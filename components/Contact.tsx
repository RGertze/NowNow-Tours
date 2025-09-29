
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-safari-50 to-earth-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-sunset-200/20 to-transparent rounded-full -translate-y-40 -translate-x-40"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-safari-200/20 to-transparent rounded-full translate-y-32 translate-x-32"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Let's Plan Your Adventure
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-baobab-700 max-w-2xl mx-auto leading-relaxed">
            Ready to explore Africa? We're here to make your dream journey a reality.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:w-1/2 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-safari-100">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl font-bold text-safari-800 mb-4">Asante Sana!</h3>
                <p className="text-baobab-600 text-lg">Your message has been sent. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-safari-800 mb-6">Send us a Message</h3>
                
                <div>
                  <label htmlFor="name" className="block text-baobab-700 font-semibold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full px-4 py-3 border-2 border-safari-200 rounded-xl focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500 outline-none transition-all duration-300 bg-white/80" 
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-baobab-700 font-semibold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-3 border-2 border-safari-200 rounded-xl focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500 outline-none transition-all duration-300 bg-white/80" 
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-baobab-700 font-semibold mb-2">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    className="w-full px-4 py-3 border-2 border-safari-200 rounded-xl focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500 outline-none transition-all duration-300 bg-white/80 resize-none" 
                    placeholder="Tell us about your dream African adventure..."
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full btn-primary text-lg py-4">
                  Send Message
                </button>
              </form>
            )}
          </div>
          
          {/* Contact Info & Map */}
          <div className="lg:w-1/2 space-y-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-safari-100">
              <h3 className="font-display text-2xl font-bold text-safari-800 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sunset-500 to-safari-600 rounded-full flex items-center justify-center">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-baobab-800">Call Us</p>
                    <p className="text-baobab-600">+1 (234) 567-890</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sunset-500 to-safari-600 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-baobab-800">Email Us</p>
                    <p className="text-baobab-600">contact@nownowtours.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-baobab-800">WhatsApp</p>
                    <button 
                      onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                      className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                    >
                      Chat with us instantly
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl border border-safari-100 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.474!2d18.4241!3d-33.9249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5e5b9a0c2329%3A0x801c1b2b0a0c2329!2sV%26A%20Waterfront%2C%20Cape%20Town%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                width="100%"
                height="256"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NowNow Tours - V&A Waterfront, Cape Town"
                className="w-full h-64"
              ></iframe>
              <div className="p-4 bg-gradient-to-r from-safari-50 to-earth-50">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-safari-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-safari-800">Our Office</p>
                    <p className="text-sm text-baobab-600">V&A Waterfront, Cape Town, South Africa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
