import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  place?: { title: string; img: string } | null;
};

const TripItinerary: React.FC<Props> = ({ isOpen, onClose, place }) => {
  if (!isOpen) return null;

  return (
    <div style={{ zIndex: 9999 }} className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div onClick={(e) => e.stopPropagation()} className="relative w-11/12 max-w-3xl bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/8" style={{ pointerEvents: 'auto' }}>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">{place?.title ?? 'Trip Itinerary'}</h3>
              <p className="text-sm text-white/80 mt-1">A quick sample itinerary for your chosen destination.</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white">✕</button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
            <div>
              <h4 className="font-semibold">Day 1</h4>
              <p className="text-sm mt-1">Arrival, hotel check-in, sunset viewpoint and welcome dinner with cultural show.</p>

              <h4 className="font-semibold mt-4">Day 2</h4>
              <p className="text-sm mt-1">Guided day tour including local attractions and an off-the-beaten-path experience.</p>
            </div>
            <div>
              <h4 className="font-semibold">Day 3</h4>
              <p className="text-sm mt-1">Outdoor adventure: hiking, snorkelling or a boat trip (depending on destination).</p>

              <h4 className="font-semibold mt-4">Customize</h4>
              <p className="text-sm mt-1">Add extra nights, private transfers or special experiences. Contact us for a tailor-made plan.</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="bg-sunset-500 hover:bg-sunset-600 text-white px-4 py-2 rounded-lg">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripItinerary;
