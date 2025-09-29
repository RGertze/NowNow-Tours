
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
import AIChat from './components/AIChat';

const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-safari-50 to-earth-50 text-baobab-800 font-body">
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
      <AIChat />
    </div>
  );
};

export default App;