import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RequestTour: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: '',
    dates: '',
    groupSize: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `
🌍 Tour Request from ${formData.fullName}

📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
📍 Destination: ${formData.destination}
📅 Preferred Dates: ${formData.dates}
👥 Group Size: ${formData.groupSize}

📝 Message:
${formData.message}
    `.trim();

    const whatsappUrl = `https://wa.me/264812297409?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-baobab-800 mb-4 font-semibold">Request Sent!</h2>
          <p className="text-gray-700 mb-6">
            Your tour request has been sent via WhatsApp. Our team will get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-sunset-500 hover:bg-sunset-600 text-white rounded-lg font-semibold transition-colors"
          >
            Send Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-baobab-800 mb-4">
            Request a Custom Tour
          </h1>
          <p className="text-lg text-gray-700 mb-8 prose prose-baobab max-w-none">
            Tell us about your dream African adventure and we'll create a personalized itinerary just for you.
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
                  placeholder="+264 81 234 5678"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Destination *
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
                >
                  <option value="">Select destination...</option>
                  <option value="Cape Town, South Africa">Cape Town, South Africa</option>
                  <option value="Victoria Falls, Zimbabwe">Victoria Falls, Zimbabwe</option>
                  <option value="Lesotho Highlands">Lesotho Highlands</option>
                  <option value="Zanzibar, Tanzania">Zanzibar, Tanzania</option>
                  <option value="Bali, Indonesia">Bali, Indonesia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Custom Destination">Custom Destination</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Dates
                </label>
                <input
                  type="text"
                  name="dates"
                  value={formData.dates}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
                  placeholder="e.g. December 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Group Size
                </label>
                <input
                  type="number"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
                  placeholder="Number of travelers"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tell us about your trip
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all resize-none"
                placeholder="What kind of experience are you looking for? Any special requests or requirements?"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-sunset-500 hover:bg-sunset-600 text-white rounded-lg font-semibold transition-colors"
              >
                Send Request via WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  destination: '',
                  dates: '',
                  groupSize: '',
                  message: '',
                })}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestTour;
