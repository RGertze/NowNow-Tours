import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import Tours from './components/Tours';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Downloads from './components/Downloads';
import Footer from './components/Footer';
import AnimationToggle from './components/AnimationToggle';

// Import global styles
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <div className="bg-stone-50 text-stone-800 font-sans antialiased">
      {/* Header with scroll progress */}
      <Header />
      
      {/* Main content */}
      <main>
        {/* Hero section with canvas and Ken Burns effect */}
        <section id="home">
          <Hero />
        </section>
        
        {/* Why Choose Us section */}
        <WhyChooseUs />
        
        {/* About section with scroll reveals */}
        <section id="about">
          <About />
        </section>
        
        {/* Tours section with hover effects and quick view */}
        <section id="tours">
          <Tours />
        </section>
        
        {/* Testimonials with video lightbox */}
        <Testimonials />
        
        {/* Gallery with masonry layout and lightbox */}
        <Gallery />
        
        {/* Downloads section */}
        <section id="downloads">
          <Downloads />
        </section>
        
        {/* Contact form with validation and confetti */}
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      {/* Footer with gradient animations */}
      <Footer />
      
      {/* Accessibility animation toggle */}
      <AnimationToggle />
    </div>
  );
};

export default App;