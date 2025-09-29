import React, { useState } from 'react';
import { X, MapPin, Calendar, Users, Heart, Camera, Mountain, Waves, Building, Utensils, Star, ArrowRight, ArrowLeft } from 'lucide-react';

interface TravelPreferences {
  destinations: string[];
  travelStyle: string;
  activities: string[];
  budget: string;
  duration: string;
  travelers: number;
  interests: string[];
  accommodation: string;
}

interface TravelPlanningWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const TravelPlanningWizard: React.FC<TravelPlanningWizardProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState<TravelPreferences>({
    destinations: [],
    travelStyle: '',
    activities: [],
    budget: '',
    duration: '',
    travelers: 2,
    interests: [],
    accommodation: ''
  });

  const totalSteps = 6;

  if (!isOpen) return null;

  const updatePreference = (key: keyof TravelPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: keyof TravelPreferences, item: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(item)
        ? (prev[key] as string[]).filter(i => i !== item)
        : [...(prev[key] as string[]), item]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    // Destination-based recommendations
    if (preferences.destinations.includes('beach')) {
      recommendations.push('🏖️ Zanzibar Getaway - Perfect for beach lovers with pristine white sands');
    }
    if (preferences.destinations.includes('city')) {
      recommendations.push('🏙️ Cape Town Adventure - Urban exploration with stunning mountain views');
    }
    if (preferences.destinations.includes('nature')) {
      recommendations.push('🌿 Angolan Wonders - Untouched natural beauty and wildlife');
    }
    if (preferences.destinations.includes('luxury')) {
      recommendations.push('✨ Dubai Stopover - Modern luxury and world-class experiences');
    }

    // Activity-based recommendations
    if (preferences.activities.includes('wildlife')) {
      recommendations.push('🦁 Safari experiences in Kissama National Park');
    }
    if (preferences.activities.includes('culture')) {
      recommendations.push('🏛️ Stone Town cultural tours and spice farm visits');
    }
    if (preferences.activities.includes('adventure')) {
      recommendations.push('🏔️ Table Mountain hiking and Cape Peninsula exploration');
    }

    return recommendations.length > 0 ? recommendations : [
      '🌍 Custom African adventure tailored to your preferences',
      '📞 Personal consultation with our travel experts',
      '🎯 Curated experiences based on your interests'
    ];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">What calls to your adventurous spirit?</h3>
              <p className="text-gray-600">Select the destinations that excite you most</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'beach', icon: Waves, label: 'Pristine Beaches', desc: 'Crystal clear waters & white sand' },
                { id: 'city', icon: Building, label: 'Vibrant Cities', desc: 'Urban culture & nightlife' },
                { id: 'nature', icon: Mountain, label: 'Wild Nature', desc: 'Untouched landscapes & wildlife' },
                { id: 'luxury', icon: Star, label: 'Luxury Escapes', desc: 'Premium experiences & comfort' }
              ].map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => toggleArrayItem('destinations', dest.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    preferences.destinations.includes(dest.id)
                      ? 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-gray-200 hover:border-orange-300 text-gray-700'
                  }`}
                >
                  <dest.icon className="w-8 h-8 mb-2" />
                  <h4 className="font-semibold">{dest.label}</h4>
                  <p className="text-sm opacity-75">{dest.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">What's your travel style?</h3>
              <p className="text-gray-600">How do you like to explore the world?</p>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'adventurous', label: '🎒 Adventurous Explorer', desc: 'Off the beaten path, authentic experiences' },
                { id: 'relaxed', label: '🌴 Relaxed Traveler', desc: 'Comfortable pace, leisure activities' },
                { id: 'cultural', label: '🎭 Cultural Enthusiast', desc: 'Museums, history, local traditions' },
                { id: 'luxury', label: '👑 Luxury Seeker', desc: 'Premium accommodations, fine dining' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => updatePreference('travelStyle', style.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    preferences.travelStyle === style.id
                      ? 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-gray-200 hover:border-orange-300 text-gray-700'
                  }`}
                >
                  <h4 className="font-semibold">{style.label}</h4>
                  <p className="text-sm opacity-75">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">What activities make you come alive?</h3>
              <p className="text-gray-600">Select all that interest you</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'wildlife', icon: '🦁', label: 'Wildlife Safari' },
                { id: 'culture', icon: '🏛️', label: 'Cultural Tours' },
                { id: 'adventure', icon: '🏔️', label: 'Adventure Sports' },
                { id: 'food', icon: '🍽️', label: 'Food Experiences' },
                { id: 'photography', icon: '📸', label: 'Photography' },
                { id: 'relaxation', icon: '🧘', label: 'Spa & Wellness' }
              ].map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => toggleArrayItem('activities', activity.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    preferences.activities.includes(activity.id)
                      ? 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-gray-200 hover:border-orange-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{activity.icon}</div>
                  <div className="text-sm font-medium">{activity.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Let's talk budget & duration</h3>
              <p className="text-gray-600">Help us tailor the perfect experience</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Budget per person</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'budget', label: '$500 - $1,500', desc: 'Great value adventures' },
                    { id: 'mid', label: '$1,500 - $3,000', desc: 'Comfortable experiences' },
                    { id: 'luxury', label: '$3,000+', desc: 'Premium luxury travel' }
                  ].map((budget) => (
                    <button
                      key={budget.id}
                      onClick={() => updatePreference('budget', budget.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        preferences.budget === budget.id
                          ? 'border-orange-500 bg-orange-50 text-orange-800'
                          : 'border-gray-200 hover:border-orange-300 text-gray-700'
                      }`}
                    >
                      <div className="font-semibold">{budget.label}</div>
                      <div className="text-sm opacity-75">{budget.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Trip duration</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'short', label: '3-5 days' },
                    { id: 'week', label: '1 week' },
                    { id: 'extended', label: '2 weeks' },
                    { id: 'long', label: '3+ weeks' }
                  ].map((duration) => (
                    <button
                      key={duration.id}
                      onClick={() => updatePreference('duration', duration.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        preferences.duration === duration.id
                          ? 'border-orange-500 bg-orange-50 text-orange-800'
                          : 'border-gray-200 hover:border-orange-300 text-gray-700'
                      }`}
                    >
                      {duration.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Group details</h3>
              <p className="text-gray-600">Who's joining this adventure?</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Number of travelers</label>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => updatePreference('travelers', Math.max(1, preferences.travelers - 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">
                    {preferences.travelers}
                  </span>
                  <button
                    onClick={() => updatePreference('travelers', preferences.travelers + 1)}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Accommodation preference</label>
                <div className="space-y-2">
                  {[
                    { id: 'budget', label: 'Budget-friendly', desc: 'Hostels, guesthouses' },
                    { id: 'standard', label: 'Standard comfort', desc: '3-star hotels' },
                    { id: 'luxury', label: 'Luxury experience', desc: '4-5 star resorts' }
                  ].map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => updatePreference('accommodation', acc.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        preferences.accommodation === acc.id
                          ? 'border-orange-500 bg-orange-50 text-orange-800'
                          : 'border-gray-200 hover:border-orange-300 text-gray-700'
                      }`}
                    >
                      <div className="font-semibold">{acc.label}</div>
                      <div className="text-sm opacity-75">{acc.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">🎉 Your Perfect African Adventure Awaits!</h3>
              <p className="text-gray-600">Based on your preferences, here's what we recommend:</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 space-y-4">
              <h4 className="font-bold text-lg text-gray-800 mb-3">✨ Personalized Recommendations:</h4>
              <div className="space-y-3">
                {generateRecommendations().map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-lg">{rec.split(' ')[0]}</div>
                    <div className="text-sm text-gray-700">{rec.substring(rec.indexOf(' ') + 1)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">🎯 Your Travel Profile:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Style:</strong> {preferences.travelStyle || 'Not specified'}</p>
                <p><strong>Duration:</strong> {preferences.duration || 'Flexible'}</p>
                <p><strong>Budget:</strong> {preferences.budget || 'To be discussed'}</p>
                <p><strong>Group size:</strong> {preferences.travelers} travelers</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  // Here you could save preferences and redirect to booking form
                  alert('Great! We\'ll use these preferences to create your perfect tour. Redirecting to booking form...');
                  onClose();
                }}
                className="btn-primary text-lg px-8 py-3"
              >
                🚀 Start My Adventure!
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold">✈️ Dream Trip Planner</h2>
            <p className="opacity-90">Step {currentStep} of {totalSteps}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close planner"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between p-6 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                alert('Your dream trip preferences have been saved! Our travel experts will contact you soon.');
                onClose();
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              🎯 Get My Custom Quote
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelPlanningWizard;