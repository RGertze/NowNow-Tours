
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here (e.g., API call)
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sky-800">Get In Touch</h2>
          <p className="text-lg text-stone-600 mt-2">Have questions or ready to book your next adventure? Reach out!</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                <svg className="w-16 h-16 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-sky-800">Thank You!</h3>
                <p className="text-stone-600 mt-2">Your message has been sent. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold text-sky-800 mb-6">Send us a Message</h3>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-stone-700 font-medium mb-2">Name</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-stone-700 font-medium mb-2">Email</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-stone-700 font-medium mb-2">Message</label>
                  <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"></textarea>
                </div>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition duration-300">
                  Submit
                </button>
              </form>
            )}
          </div>
          {/* Contact Info & Map */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-sky-800 mb-4">Contact Information</h3>
                <div className="space-y-4 text-stone-700">
                    <p><i className="fas fa-phone mr-3 text-orange-500"></i> +1 (234) 567-890</p>
                    <p><i className="fas fa-envelope mr-3 text-orange-500"></i> contact@nownowtours.com</p>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="inline-block text-green-600 font-bold hover:underline">
                        <i className="fab fa-whatsapp mr-2"></i> Chat with us on WhatsApp
                    </a>
                </div>
            </div>
            <div className="bg-stone-300 h-64 rounded-lg shadow-lg flex items-center justify-center text-stone-500">
                <p>Embedded Google Map Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
