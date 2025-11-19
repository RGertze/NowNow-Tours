import React, { useState } from 'react';
import { FaFilePdf, FaDownload, FaFileContract, FaCalendar, FaClipboardList } from 'react-icons/fa';
import { DOWNLOADS_DATA } from '../constants';
import type { DownloadableDocument } from '../types';
import CustomDocumentRequest from './CustomDocumentRequest';

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'Trip Brochure':
      return <FaFilePdf className="text-white text-lg" />;
    case 'Legal Document':
      return <FaFileContract className="text-white text-lg" />;
    case 'Travel Guide':
      return <FaCalendar className="text-white text-lg" />;
    default:
      return <FaDownload className="text-white text-lg" />;
  }
};

const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'Trip Brochure':
      return 'from-sunset-500 to-sunset-600';
    case 'Legal Document':
      return 'from-safari-500 to-safari-600';
    case 'Travel Guide':
      return 'from-earth-500 to-earth-600';
    default:
      return 'from-baobab-500 to-baobab-600';
  }
};

const DownloadCard: React.FC<{ doc: DownloadableDocument }> = ({ doc }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col items-start card-hover border border-safari-100 relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-safari-100 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
    
    <div className="flex items-center mb-4 w-full relative z-10 gap-3">
      <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(doc.category)} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
        {getCategoryIcon(doc.category)}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-sunset-600 uppercase tracking-wide">{doc.category || 'Document'}</h3>
        <p className="text-lg font-bold text-safari-800 leading-tight">{doc.title}</p>
      </div>
    </div>
    
    <p className="text-baobab-600 mb-6 flex-grow leading-relaxed text-sm">{doc.description}</p>
    
    {doc.fileUrl === '#' ? (
      <button 
        disabled
        className="mt-auto w-full text-center bg-baobab-200 text-baobab-500 font-semibold py-3 px-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 border border-baobab-300 transition-all"
      >
        <FaDownload size={16} />
        Coming Soon
      </button>
    ) : (
      <a 
        href={doc.fileUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-full text-center bg-gradient-to-r from-sunset-500 to-safari-500 hover:from-sunset-600 hover:to-safari-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
      >
        <FaDownload size={16} />
        Download PDF
      </a>
    )}
  </div>
);

const Downloads: React.FC = () => {
  const [isDownloadDocumentsOpen, setIsDownloadDocumentsOpen] = useState(false);

  // Group documents by category
  const groupedByCategory = DOWNLOADS_DATA.reduce((acc, doc) => {
    const cat = doc.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(doc);
    return acc;
  }, {} as Record<string, DownloadableDocument[]>);

  const categoryOrder = ['Trip Brochure', 'Legal Document', 'Travel Guide'];
  const sortedCategories = categoryOrder.filter(cat => groupedByCategory[cat]);

  return (
    <section id="downloads" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-earth-100 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-sunset-100 to-transparent rounded-full translate-y-24 -translate-x-24 opacity-40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-earth-100 rounded-full">
            <span className="text-earth-700 font-semibold text-sm uppercase tracking-wider">📚 Resources Hub</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-baobab-800 mb-6 leading-tight">
            Travel Resources & Downloads
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-baobab-700 leading-relaxed">
            Everything you need to prepare for your African adventure. Download guides, brochures, legal documents, and travel checklists.
          </p>
        </div>
        
        {/* Documents organized by category */}
        {sortedCategories.map((category, catIdx) => (
          <div key={category} className={`mb-20 ${catIdx > 0 ? 'pt-16 border-t border-safari-100' : ''}`}>
            {/* Category header with animation */}
            <div className="flex items-center gap-4 mb-10 max-w-7xl mx-auto">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getCategoryColor(category)} flex items-center justify-center shadow-lg flex-shrink-0`}>
                {category === 'Trip Brochure' && <FaFilePdf className="text-white text-2xl" />}
                {category === 'Legal Document' && <FaFileContract className="text-white text-2xl" />}
                {category === 'Travel Guide' && <FaClipboardList className="text-white text-2xl" />}
              </div>
              <div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-baobab-800">
                  {category}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}></div>
                  <p className="text-sm text-baobab-600">
                    {groupedByCategory[category]?.length || 0} {groupedByCategory[category]?.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {groupedByCategory[category]?.map((doc, index) => (
                <DownloadCard key={index} doc={doc} />
              ))}
            </div>
          </div>
        ))}
        
        {/* Call to action - improved layout */}
        <div className="mt-20 pt-16 border-t border-safari-100 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* CTA Text */}
            <div>
              <h3 className="font-display text-3xl font-bold text-baobab-800 mb-4">
                Need Something Custom?
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full mb-6"></div>
              <p className="text-lg text-baobab-700 mb-6 leading-relaxed">
                Can't find the document you're looking for? We can create custom travel documents tailored to your specific needs and requirements.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-sunset-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-sunset-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-baobab-700">Personalized itineraries</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-sunset-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-sunset-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-baobab-700">Group-specific documents</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-sunset-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-sunset-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-baobab-700">Visa & travel info</span>
                </li>
              </ul>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-sunset-50 to-earth-50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-sunset-100 hover:shadow-2xl transition-all">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-sunset-200 rounded-full mb-4">
                  <span className="text-sunset-700 text-xs font-bold uppercase tracking-wider">Quick Request</span>
                </div>
                <h4 className="text-2xl font-bold text-safari-800">
                  Get Custom Documents
                </h4>
              </div>
              
              <p className="text-baobab-700 mb-8 text-sm leading-relaxed">
                Fill out a quick form and our team will prepare custom documents within 24 hours.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <FaCalendar className="text-sunset-600 text-lg flex-shrink-0" />
                  <span className="text-sm text-baobab-700"><strong>24-hour</strong> turnaround</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaDownload className="text-safari-600 text-lg flex-shrink-0" />
                  <span className="text-sm text-baobab-700"><strong>Instant</strong> email delivery</span>
                </div>
              </div>

              <button 
                onClick={() => setIsDownloadDocumentsOpen(true)}
                className="w-full btn-primary"
              >
                Request Custom Document
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <CustomDocumentRequest 
        isOpen={isDownloadDocumentsOpen} 
        onClose={() => setIsDownloadDocumentsOpen(false)} 
      />
    </section>
  );
};

export default Downloads;
