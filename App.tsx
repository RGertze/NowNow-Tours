
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Tours from './components/Tours';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Downloads from './components/Downloads';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-stone-50 text-stone-800 font-sans">
      <Header />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="tours">
          <Tours />
        </div>
        <Testimonials />
        <Gallery />
        <div id="downloads">
          <Downloads />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;