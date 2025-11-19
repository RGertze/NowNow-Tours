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
    <section id="downloads" className="py-24 bg-gradient-to-br from-white to-safari-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-earth-100 to-transparent rounded-full -translate-y-32 -translate-x-32 opacity-60"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Travel Resources & Documents
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-baobab-700 max-w-2xl mx-auto leading-relaxed">
            Download essential documents, trip brochures, and travel guides to prepare for your African adventure.
          </p>
        </div>
        
        {/* Documents grouped by category */}
        {sortedCategories.map((category) => (
          <div key={category} className="mb-16">
            <h3 className="font-display text-2xl font-bold text-baobab-800 mb-8 flex items-center gap-3">
              {category === 'Trip Brochure' && <FaFilePdf className="text-sunset-600" size={28} />}
              {category === 'Legal Document' && <FaFileContract className="text-safari-600" size={28} />}
              {category === 'Travel Guide' && <FaClipboardList className="text-earth-600" size={28} />}
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl">
              {groupedByCategory[category]?.map((doc, index) => (
                <DownloadCard key={index} doc={doc} />
              ))}
            </div>
          </div>
        ))}
        
        {/* Call to action */}
        <div className="text-center mt-20 pt-8 border-t border-safari-200">
          <div className="bg-gradient-to-r from-sunset-50 to-safari-50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-safari-100">
            <h3 className="font-display text-2xl font-bold text-safari-800 mb-4">
              Need a Custom Document?
            </h3>
            <p className="text-baobab-700 mb-6">
              Can't find the document you're looking for? Request a custom document tailored to your specific needs.
            </p>
            <button 
              onClick={() => setIsDownloadDocumentsOpen(true)}
              className="btn-primary"
            >
              Download Custom Document
            </button>
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
