import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Map, Clipboard } from 'lucide-react';

const RESOURCES = [
  {
    id: 1,
    title: 'Cape Town Travel Guide',
    description: 'Complete itinerary, packing list, and tips for your Cape Town adventure',
    type: 'PDF',
    icon: FileText,
    url: '/resources/cape-town-guide.pdf',
  },
  {
    id: 2,
    title: 'Victoria Falls Brochure',
    description: 'Detailed information about the Victoria Falls tour package',
    type: 'PDF',
    icon: FileText,
    url: '/resources/victoria-falls-brochure.pdf',
  },
  {
    id: 3,
    title: 'Lesotho Highlands Map',
    description: 'Interactive map and route guide for Lesotho tour',
    type: 'PDF',
    icon: Map,
    url: '/resources/lesotho-map.pdf',
  },
  {
    id: 4,
    title: 'Africa Packing Checklist',
    description: 'Essential items to pack for your African adventure',
    type: 'PDF',
    icon: Clipboard,
    url: '/resources/packing-checklist.pdf',
  },
  {
    id: 5,
    title: 'Zanzibar Beach Guide',
    description: 'Best beaches, activities, and local tips for Zanzibar',
    type: 'PDF',
    icon: FileText,
    url: '/resources/zanzibar-guide.pdf',
  },
  {
    id: 6,
    title: 'Safari Photography Tips',
    description: 'Expert tips for capturing the perfect wildlife photos',
    type: 'PDF',
    icon: FileText,
    url: '/resources/photography-tips.pdf',
  },
];

const Resources: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-baobab-800 mb-4">
            Resource Hub
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Download helpful guides, packing lists, and travel resources for your African adventure
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 prose prose-baobab max-w-none">
            {RESOURCES.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-sunset-400 to-sunset-600 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl text-baobab-800 mb-2 font-semibold">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-safari-100 text-safari-700 px-3 py-1 rounded-full font-semibold">
                          {resource.type}
                        </span>
                        
                        <button
                          onClick={() => window.open(resource.url, '_blank')}
                          className="flex items-center gap-2 px-4 py-2 bg-sunset-500 hover:bg-sunset-600 text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 bg-gradient-to-r from-safari-500 to-earth-500 rounded-2xl p-8 text-white"
          >
            <h2 className="text-2xl mb-3 font-semibold">Need More Information?</h2>
            <p className="text-lg mb-6">
              Can't find what you're looking for? Contact us on WhatsApp and we'll send you any additional resources you need.
            </p>
            <a
              href="https://wa.me/264812297409?text=Hi! I need travel resources"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-white text-safari-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 text-center text-sm text-gray-600"
          >
            <p>All resources are free to download. Updates are published regularly.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
