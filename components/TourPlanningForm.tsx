import React, { useState } from 'react';
import { X, MapPin, Users, Calendar, Home, Star, Plus, Minus } from 'lucide-react';
import { TOURS_DATA } from '../constants';

interface TourDestination {
  id: string;
  name: string;
  country: string;
  basePrice: number;
  image: string;
}

interface FormData {
  destinations: string[];
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  accommodationType: string;
  budgetRange: string;
  specialRequests: string;
  customActivities: string;
  dietaryRestrictions: string;
  accessibilityNeeds: string;
  transportPreference: string;
}

interface TourPlanningFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourDestinations: TourDestination[] = [
  {
    id: 'zanzibar',
    name: 'Zanzibar Getaway',
    country: 'Tanzania',
    basePrice: 1200,
    image: TOURS_DATA[0].images[0]
  },
  {
    id: 'cape-town',
    name: 'Cape Town Adventure',
    country: 'South Africa',
    basePrice: 1500,
    image: TOURS_DATA[1].images[0]
  },
  {
    id: 'angola',
    name: 'Angolan Wonders',
    country: 'Angola',
    basePrice: 2000,
    image: TOURS_DATA[2].images[0]
  },
  {
    id: 'dubai',
    name: 'Dubai Stopover',
    country: 'United Arab Emirates',
    basePrice: 900,
    image: TOURS_DATA[3].images[0]
  }
];

const TourPlanningForm: React.FC<TourPlanningFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    destinations: [],
    startDate: '',
    endDate: '',
    adults: 2,
    children: 0,
    accommodationType: 'standard',
    budgetRange: 'medium',
    specialRequests: '',
    customActivities: '',
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    transportPreference: 'flight'
  });

  const totalSteps = 5;

  if (!isOpen) return null;

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDestinationToggle = (destinationId: string) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.includes(destinationId)
        ? prev.destinations.filter(id => id !== destinationId)
        : [...prev.destinations, destinationId]
    }));
  };

  const calculateEstimatedPrice = () => {
    const selectedDestinations = tourDestinations.filter(dest => 
      formData.destinations.includes(dest.id)
    );
    
    let basePrice = selectedDestinations.reduce((sum, dest) => sum + dest.basePrice, 0);
    
    // Apply multipliers
    const totalPeople = formData.adults + formData.children;
    basePrice *= totalPeople;
    
    // Accommodation multiplier
    const accommodationMultiplier = {
      'budget': 0.8,
      'standard': 1.0,
      'luxury': 1.5,
      'premium': 2.0
    }[formData.accommodationType] || 1.0;
    
    basePrice *= accommodationMultiplier;
    
    // Children discount (50% off)
    const childrenDiscount = formData.children * 0.5;
    basePrice *= (1 - (childrenDiscount / totalPeople));
    
    return Math.round(basePrice);
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

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/tour-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Thank you! Your booking request has been submitted successfully. 
               Booking Reference: ${result.bookingReference}
               Estimated Price: $${result.estimatedPrice.toLocaleString()}
               
               We'll contact you within 24 hours with a personalized tour proposal.`);
        onClose();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Sorry, there was an error submitting your booking. Please try again or contact us directly.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Destinations</h3>
              <p className="text-gray-600 mb-6">Select one or more destinations for your African adventure</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tourDestinations.map((destination) => (
                  <div
                    key={destination.id}
                    className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      formData.destinations.includes(destination.id)
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => handleDestinationToggle(destination.id)}
                  >
                    <div className="relative h-32">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      {formData.destinations.includes(destination.id) && (
                        <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full p-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">{destination.name}</h4>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {destination.country}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-orange-600">From ${destination.basePrice}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Travel Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Adults
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange('adults', Math.max(1, formData.adults - 1))}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[60px] text-center text-gray-900 bg-white">
                      {formData.adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleInputChange('adults', formData.adults + 1)}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Children (Under 12)
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange('children', Math.max(0, formData.children - 1))}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[60px] text-center text-gray-900 bg-white">
                      {formData.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleInputChange('children', formData.children + 1)}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Accommodation & Budget</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Home className="w-4 h-4 inline mr-2" />
                    Accommodation Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: 'budget', label: 'Budget', desc: 'Hostels, guesthouses' },
                      { value: 'standard', label: 'Standard', desc: '3-star hotels' },
                      { value: 'luxury', label: 'Luxury', desc: '4-star hotels' },
                      { value: 'premium', label: 'Premium', desc: '5-star resorts' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 bg-white">
                        <input
                          type="radio"
                          name="accommodation"
                          value={option.value}
                          checked={formData.accommodationType === option.value}
                          onChange={(e) => handleInputChange('accommodationType', e.target.value)}
                          className="text-orange-600"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Budget Range (per person)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: 'low', label: 'Budget', desc: '$500 - $1,500' },
                      { value: 'medium', label: 'Standard', desc: '$1,500 - $3,000' },
                      { value: 'high', label: 'Luxury', desc: '$3,000+' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 bg-white">
                        <input
                          type="radio"
                          name="budget"
                          value={option.value}
                          checked={formData.budgetRange === option.value}
                          onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                          className="text-orange-600"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Special Requirements & Preferences</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transportation Preference
                  </label>
                  <select
                    value={formData.transportPreference}
                    onChange={(e) => handleInputChange('transportPreference', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                  >
                    <option value="flight">Flight</option>
                    <option value="road">Road Trip</option>
                    <option value="mixed">Mixed (Flight + Road)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Restrictions
                  </label>
                  <textarea
                    value={formData.dietaryRestrictions}
                    onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                    placeholder="Please specify any dietary restrictions, allergies, or preferences..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white placeholder-gray-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accessibility Needs
                  </label>
                  <textarea
                    value={formData.accessibilityNeeds}
                    onChange={(e) => handleInputChange('accessibilityNeeds', e.target.value)}
                    placeholder="Please describe any accessibility requirements or mobility needs..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white placeholder-gray-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Activities & Special Requests
                  </label>
                  <textarea
                    value={formData.customActivities}
                    onChange={(e) => handleInputChange('customActivities', e.target.value)}
                    placeholder="Tell us about any specific activities, experiences, or special requests you'd like to include in your tour..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white placeholder-gray-500"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Review Your Tour Plan</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Selected Destinations:</h4>
                  <div className="space-y-2">
                    {formData.destinations.map(destId => {
                      const dest = tourDestinations.find(d => d.id === destId);
                      return dest ? (
                        <div key={destId} className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-orange-600" />
                          <span className="text-gray-800">{dest.name}, {dest.country}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">Travel Dates:</h4>
                    <p className="text-gray-700">{formData.startDate} to {formData.endDate}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Travelers:</h4>
                    <p className="text-gray-700">{formData.adults} Adults, {formData.children} Children</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Accommodation:</h4>
                    <p className="capitalize text-gray-700">{formData.accommodationType}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Budget Range:</h4>
                    <p className="capitalize text-gray-700">{formData.budgetRange}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Estimated Total:</span>
                    <span className="text-2xl font-bold text-orange-600">${calculateEstimatedPrice().toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">*Final price may vary based on availability and specific requirements</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Plan Your Journey</h2>
            <p className="text-gray-600">Step {currentStep} of {totalSteps}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-800"
            aria-label="Close form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 bg-white">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i + 1 <= currentStep
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-md font-medium ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors"
              >
                Submit Tour Request
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={currentStep === 1 && formData.destinations.length === 0}
                className={`px-6 py-2 rounded-md font-medium ${
                  currentStep === 1 && formData.destinations.length === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPlanningForm;