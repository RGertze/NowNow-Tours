import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Custom: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    duration: '',
    budget: '',
    groupSize: '',
    travelStyle: '',
    interests: [] as string[],
    accommodation: '',
    additionalInfo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter((i) => i !== interest)
        : [...formData.interests, interest],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `
🌍 Custom Tour Request

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}

📍 Destination: ${formData.destination}
⏱️ Duration: ${formData.duration}
💰 Budget: ${formData.budget}
👥 Group Size: ${formData.groupSize}

🎨 Travel Style: ${formData.travelStyle}
🏨 Accommodation: ${formData.accommodation}
🎯 Interests: ${formData.interests.join(', ')}

📝 Additional Info:
${formData.additionalInfo}
    `.trim();

    const whatsappUrl = `https://wa.me/264812297409?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const interestOptions = [
    'Wildlife Safari',
    'Beach & Relaxation',
    'Adventure Sports',
    'Cultural Tours',
    'Photography',
    'Hiking & Trekking',
    'Food & Wine',
    'Historical Sites',
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-baobab-800 mb-4">
            Create Your Custom Adventure
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Design a personalized African experience tailored to your preferences, interests, and budget
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s
                        ? 'bg-sunset-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > s ? 'bg-sunset-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl text-baobab-800 mb-4 font-semibold">
                    Tell Us About Yourself
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Group Size *
                      </label>
                      <input
                        type="number"
                        name="groupSize"
                        value={formData.groupSize}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full px-6 py-3 bg-sunset-500 hover:bg-sunset-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Continue to Trip Details
                  </button>
                </motion.div>
              )}

              {/* Step 2: Trip Details */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl text-baobab-800 mb-4 font-semibold">
                    Your Dream Trip Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Destination *
                      </label>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                        placeholder="e.g., South Africa, Zimbabwe, Tanzania"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration *
                      </label>
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      >
                        <option value="">Select duration</option>
                        <option value="3-5 days">3-5 days</option>
                        <option value="6-9 days">6-9 days</option>
                        <option value="10-14 days">10-14 days</option>
                        <option value="15+ days">15+ days</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Budget Range *
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      >
                        <option value="">Select budget</option>
                        <option value="Under N$10,000">Under N$10,000</option>
                        <option value="N$10,000 - N$20,000">N$10,000 - N$20,000</option>
                        <option value="N$20,000 - N$30,000">N$20,000 - N$30,000</option>
                        <option value="N$30,000+">N$30,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Travel Style *
                      </label>
                      <select
                        name="travelStyle"
                        value={formData.travelStyle}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      >
                        <option value="">Select style</option>
                        <option value="Budget">Budget</option>
                        <option value="Mid-range">Mid-range</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Adventure">Adventure</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 px-6 py-3 bg-sunset-500 hover:bg-sunset-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      Continue to Preferences
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Preferences */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl text-baobab-800 mb-4 font-semibold">
                    Your Preferences
                  </h2>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Interests (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestToggle(interest)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            formData.interests.includes(interest)
                              ? 'bg-sunset-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Accommodation
                    </label>
                    <select
                      name="accommodation"
                      value={formData.accommodation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                    >
                      <option value="">Select accommodation</option>
                      <option value="Budget Hostels">Budget Hostels</option>
                      <option value="Mid-range Hotels">Mid-range Hotels</option>
                      <option value="Luxury Hotels">Luxury Hotels</option>
                      <option value="Safari Lodges">Safari Lodges</option>
                      <option value="Beach Resorts">Beach Resorts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any special requests, dietary restrictions, or other preferences?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      Send Request via WhatsApp
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Custom;
