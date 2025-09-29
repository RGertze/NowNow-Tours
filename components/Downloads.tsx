import React from 'react';
import { DOWNLOADS_DATA } from '../constants';
import type { DownloadableDocument } from '../types';

const DownloadCard: React.FC<{ doc: DownloadableDocument }> = ({ doc }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start transform hover:-translate-y-1 transition-transform duration-300">
    <div className="flex items-center mb-4 w-full">
        <i className="fas fa-file-pdf text-4xl text-red-500 mr-4"></i>
        <h3 className="text-xl font-bold text-sky-800 flex-1">{doc.title}</h3>
    </div>
    <p className="text-stone-600 mb-6 flex-grow">{doc.description}</p>
    <a 
      href={doc.fileUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
    >
      <i className="fas fa-download"></i>
      Download PDF
    </a>
  </div>
);


const Downloads: React.FC = () => {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sky-800">Downloads & Resources</h2>
          <p className="text-lg text-stone-600 mt-2">Helpful documents to prepare for your trip.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DOWNLOADS_DATA.map((doc, index) => (
            <DownloadCard key={index} doc={doc} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Downloads;
