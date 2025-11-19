import React, { useState } from 'react';
import { X, FileText, Download, Send, CheckCircle, MapPin, Calendar, Users, Camera, Plane, Hotel } from 'lucide-react';

interface DocumentRequest {
  documentType: string;
  destination: string;
  travelDates: string;
  groupSize: string;
  specificRequests: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

interface CustomDocumentRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomDocumentRequest: React.FC<CustomDocumentRequestProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [request, setRequest] = useState<DocumentRequest>({
    documentType: '',
    destination: '',
    travelDates: '',
    groupSize: '',
    specificRequests: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });

  if (!isOpen) return null;

  const updateRequest = (field: keyof DocumentRequest, value: any) => {
    setRequest(prev => ({ ...prev, [field]: value }));
  };

  const updateContactInfo = (field: keyof DocumentRequest['contactInfo'], value: string) => {
    setRequest(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/custom-document-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert('Error submitting request: ' + result.error);
      }
    } catch (error) {
      console.error('Document request error:', error);
      alert('Sorry, there was an error submitting your request. Please try again.');
    }
  };

  const documentTypes = [
    {
      id: 'detailed-itinerary',
      icon: Calendar,
      title: 'Detailed Itinerary',
      description: 'Day-by-day breakdown with activities, meals, and accommodations',
      features: ['Hour-by-hour schedule', 'Activity descriptions', 'Meal recommendations', 'Transport details']
    },
    {
      id: 'travel-guide',
      icon: MapPin,
      title: 'Destination Travel Guide',
      description: 'Comprehensive guide with local insights and hidden gems',
      features: ['Local customs & etiquette', 'Best photo spots', 'Weather info', 'Packing checklist']
    },
    {
      id: 'budget-breakdown',
      icon: FileText,
      title: 'Budget Breakdown',
      description: 'Detailed cost analysis for your specific requirements',
      features: ['Cost per person', 'Optional extras', 'Payment schedule', 'Money-saving tips']
    },
    {
      id: 'group-package',
      icon: Users,
      title: 'Group Package Info',
      description: 'Special rates and arrangements for group travel',
      features: ['Group discounts', 'Team activities', 'Group logistics', 'Special arrangements']
    },
    {
      id: 'photography-guide',
      icon: Camera,
      title: 'Photography Guide',
      description: 'Best spots and times for capturing amazing photos',
      features: ['Golden hour locations', 'Equipment recommendations', 'Local photography rules', 'Instagram-worthy spots']
    },
    {
      id: 'visa-requirements',
      icon: Plane,
      title: 'Visa & Travel Requirements',
      description: 'Complete documentation and entry requirements',
      features: ['Visa requirements', 'Vaccination info', 'Travel insurance', 'Embassy contacts']
    }
  ];

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Request Submitted! 🎉</h3>
          <p className="text-gray-600 mb-6">
            Thank you! We'll prepare your custom {request.documentType.replace('-', ' ')} document and send it to your email within 24 hours.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>What's next?</strong><br />
              Our travel experts are already working on your personalized document. You'll receive it at {request.contactInfo.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            Perfect! Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold">📥 Download Custom Document</h2>
            <p className="opacity-90">Get personalized travel documents tailored to your needs</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close request form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">What document can we create for you?</h3>
                <p className="text-gray-600">Choose the type of personalized document you need</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentTypes.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      updateRequest('documentType', doc.id);
                      setCurrentStep(2);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all text-left hover:border-blue-400 hover:shadow-lg ${
                      request.documentType === doc.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <doc.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-2">{doc.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                        <div className="space-y-1">
                          {doc.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-gray-500">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Tell us about your trip</h3>
                <p className="text-gray-600">Help us customize your {documentTypes.find(d => d.id === request.documentType)?.title}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Destination(s)
                  </label>
                  <select
                    value={request.destination}
                    onChange={(e) => updateRequest('destination', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  >
                    <option value="">Select destination</option>
                    <option value="zanzibar">Zanzibar Getaway, Tanzania - N$ 21,800 pp</option>
                    <option value="cape-town">Cape Town Adventure, South Africa - N$ 6,800 pp</option>
                    <option value="lubango">Lubango Wonders, Angola - N$ 5,200 pp</option>
                    <option value="victoria-falls">Victoria Falls, Zambia - N$ 7,500 pp</option>
                    <option value="multi-destination">Multi-destination tour</option>
                    <option value="custom">Custom destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Travel Dates
                  </label>
                  <input
                    type="text"
                    value={request.travelDates}
                    onChange={(e) => updateRequest('travelDates', e.target.value)}
                    placeholder="e.g., June 2024 or Flexible"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Group Size
                  </label>
                  <select
                    value={request.groupSize}
                    onChange={(e) => updateRequest('groupSize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  >
                    <option value="">Select group size</option>
                    <option value="solo">Solo traveler</option>
                    <option value="couple">Couple (2 people)</option>
                    <option value="small-group">Small group (3-6 people)</option>
                    <option value="large-group">Large group (7+ people)</option>
                    <option value="family">Family with children</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Hotel className="w-4 h-4 inline mr-2" />
                    Accommodation Preference
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  >
                    <option value="">Select preference</option>
                    <option value="budget">Budget-friendly</option>
                    <option value="standard">Standard comfort</option>
                    <option value="luxury">Luxury experience</option>
                    <option value="mixed">Mix of options</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Requirements or Questions
                </label>
                <textarea
                  value={request.specificRequests}
                  onChange={(e) => updateRequest('specificRequests', e.target.value)}
                  placeholder="Tell us about any specific interests, dietary requirements, accessibility needs, or particular aspects you'd like us to focus on in your document..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Continue to Contact Info
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Almost done! 📧</h3>
                <p className="text-gray-600">Where should we send your custom document?</p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={request.contactInfo.name}
                    onChange={(e) => updateContactInfo('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={request.contactInfo.email}
                    onChange={(e) => updateContactInfo('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={request.contactInfo.phone}
                    onChange={(e) => updateContactInfo('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">📋 Request Summary:</h4>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p><strong>Document:</strong> {documentTypes.find(d => d.id === request.documentType)?.title}</p>
                  <p><strong>Destination:</strong> {request.destination || 'Not specified'}</p>
                  <p><strong>Travel Dates:</strong> {request.travelDates || 'Flexible'}</p>
                  <p><strong>Group Size:</strong> {request.groupSize || 'Not specified'}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!request.contactInfo.name || !request.contactInfo.email}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-8 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Request</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDocumentRequest;