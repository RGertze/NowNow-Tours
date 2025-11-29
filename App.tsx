
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ToursNew from './components/ToursNew';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Downloads from './components/Downloads';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

// Page imports
import GalleryPage from './pages/Gallery';
import AboutPage from './pages/About';
import Adventures from './pages/Adventures';
import Upcoming from './pages/Upcoming';
import RequestTour from './pages/RequestTour';
import Reviews from './pages/Reviews';
import Memories from './pages/Memories';
import Resources from './pages/Resources';
import Custom from './pages/Custom';

const Home: React.FC = () => (
  <main>
    <div id="home">
      <Hero />
    </div>
    <div id="about">
      <About />
    </div>
    <div id="tours">
      <ToursNew maxCards={6} showFilters={true} />
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
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-br from-safari-50 to-earth-50 text-black font-body min-h-screen transition-colors duration-300">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/adventures" element={<Adventures />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/request" element={<RequestTour />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
        <Footer />
        <AIChat />
      </div>
    </BrowserRouter>
  );
};

export default App;