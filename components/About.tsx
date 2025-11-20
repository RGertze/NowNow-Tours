
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-safari-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sunset-100 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-earth-100 to-transparent rounded-full translate-y-24 -translate-x-24 opacity-60"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="/updates-jet-ski.jpg"
                alt="Couple on a jet ski in turquoise water"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'; }}
                className="rounded-2xl shadow-2xl w-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-sunset-500 to-safari-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-lg">5★</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <div className="space-y-4">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient leading-tight">
                We make travel easy, safe, and unforgettable
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-sunset-500 to-safari-500 rounded-full"></div>
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
