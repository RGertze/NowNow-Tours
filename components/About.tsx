
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://picsum.photos/seed/guide/600/400" 
              alt="Friendly tour guide smiling" 
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-sky-800 mb-4">We make travel easy, safe, and unforgettable.</h2>
            <p className="text-stone-600 mb-4 leading-relaxed">
              NowNow Tours was born from a passion for sharing the incredible diversity and beauty of Africa with the world. We are a small, dedicated team of travel experts who believe in creating authentic connections and journeys that go beyond the typical tourist trail.
            </p>
            <p className="text-stone-600 leading-relaxed">
              From the moment you contact us, we handle every detail with care, ensuring your safety, comfort, and peace of mind. Our local guides are not just experts; they are storytellers and friends who will make your adventure truly special.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
