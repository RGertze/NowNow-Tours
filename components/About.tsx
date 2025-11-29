
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-safari-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sunset-100 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-earth-100 to-transparent rounded-full translate-y-24 -translate-x-24 opacity-60"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div id="who-we-are" className="w-full space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-baobab-100 text-baobab-700 text-sm font-medium shadow-sm dark:bg-baobab-700/40 dark:text-baobab-100">
              • Who we are?
            </div>
            {/* Tagline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug tracking-tight text-baobab-800 dark:text-safari-50 max-w-4xl mx-auto">
              We're a group of travel professionals, local guides, and <span className="font-bold">experience designers</span> working together to create journeys that matter. <span className="font-bold">From the first search to the last goodbye</span>, we take care of the details so your trip feels <span className="font-bold">effortless and personal.</span>
            </h2>
            {/* Image strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 max-w-3xl mx-auto">
              <img
                src="/about-waterfall.jpg"
                alt="Traveler near waterfall"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'; }}
                className="rounded-xl object-cover h-32 w-full shadow-md"
              />
              <img
                src="/about-mountain.jpg"
                alt="Mountain expedition"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517821099601-1a09678e1a37?auto=format&fit=crop&w=600&q=80'; }}
                className="rounded-xl object-cover h-32 w-full shadow-md"
              />
              <img
                src="/about-trekking.jpg"
                alt="Guided trekking group"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1525104885119-8806dd94ad58?auto=format&fit=crop&w=600&q=80'; }}
                className="rounded-xl object-cover h-32 w-full shadow-md"
              />
              <img
                src="/about-jeep.jpg"
                alt="Safari jeep adventure"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'; }}
                className="rounded-xl object-cover h-32 w-full shadow-md"
              />
            </div>
            
            <div className="space-y-6 text-baobab-700">
              <p className="text-lg leading-relaxed">
                Now Now Tours & Safaris was born from a passion for sharing the incredible diversity and beauty of Africa with the world. We are a small, dedicated team of travel experts who believe in creating authentic connections and journeys that go beyond the typical tourist trail.
              </p>
              <p className="text-lg leading-relaxed">
                From the moment you contact us, we handle every detail with care, ensuring your safety, comfort, and peace of mind. Our local guides are not just experts; they are storytellers and friends who will make your adventure truly special.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-safari-600 mb-2">500+</div>
                <div className="text-sm text-baobab-600 font-medium">Happy Travelers</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-sunset-600 mb-2">15+</div>
                <div className="text-sm text-baobab-600 font-medium">Destinations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
