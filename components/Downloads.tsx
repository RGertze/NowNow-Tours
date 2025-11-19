import React, { useState } from 'react';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import { DOWNLOADS_DATA } from '../constants';
import type { DownloadableDocument } from '../types';
import CustomDocumentRequest from './CustomDocumentRequest';

const DownloadCard: React.FC<{ doc: DownloadableDocument }> = ({ doc }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col items-start card-hover border border-safari-100 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-safari-100 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
    
    <div className="flex items-center mb-4 w-full relative z-10">
      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
        <FaFilePdf className="text-white text-xl" />
      </div>
      <h3 className="text-lg font-bold text-safari-800 flex-1 leading-tight">{doc.title}</h3>
    </div>
    
    <p className="text-baobab-600 mb-6 flex-grow leading-relaxed">{doc.description}</p>
    
    {doc.fileUrl === '#' ? (
      <button 
        disabled
        className="mt-auto w-full text-center bg-baobab-200 text-baobab-500 font-semibold py-3 px-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 border border-baobab-300"
      >
        <FaDownload />
        Coming Soon
      </button>
    ) : (
      <a 
        href={doc.fileUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-full text-center btn-primary flex items-center justify-center gap-2"
      >
        <FaDownload />
        Download PDF
      </a>
    )}
  </div>
);


const Downloads: React.FC = () => {
  const [isCustomRequestOpen, setIsCustomRequestOpen] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-white to-safari-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-earth-100 to-transparent rounded-full -translate-y-32 -translate-x-32 opacity-60"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Travel Resources
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-baobab-700 max-w-2xl mx-auto leading-relaxed">
            Essential documents and guides to help you prepare for your African adventure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {DOWNLOADS_DATA.map((doc, index) => (
            <DownloadCard key={index} doc={doc} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-safari-100">
            <h3 className="font-display text-2xl font-bold text-safari-800 mb-4">
              Need Something Specific?
            </h3>
            <p className="text-baobab-700 mb-6">
              Can't find the document you're looking for? Let us know and we'll create it for you.
            </p>
            <button 
              onClick={() => setIsCustomRequestOpen(true)}
              className="btn-primary"
            >
              Request Custom Document
            </button>
          </div>
        </div>
      </div>
      
      <CustomDocumentRequest 
        isOpen={isCustomRequestOpen} 
        onClose={() => setIsCustomRequestOpen(false)} 
      />
    </section>
  );
};

export default Downloads;
