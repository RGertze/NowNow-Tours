import React from 'react';
import ToursNew from '../components/ToursNew';

const Adventures: React.FC = () => {
  return (
    <div className="min-h-screen">
      <ToursNew showAll={true} showFilters={true} />
    </div>
  );
};

export default Adventures;
