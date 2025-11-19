import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Logo: React.FC<{ className?: string; isDark?: boolean }> = ({ className = "w-12 h-12", isDark = false }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
    {/* Outer circle */}
    <circle cx="100" cy="100" r="95" stroke={isDark ? "#1a1a1a" : "#000000"} strokeWidth="6" />
    
    {/* Inner arc - top */}
    <path d="M 50 100 A 50 50 0 0 1 150 100" stroke={isDark ? "#1a1a1a" : "#000000"} strokeWidth="6" fill="none" strokeLinecap="round" />
    
    {/* Airplane silhouette */}
    <g transform="translate(100, 85)">
      {/* Fuselage */}
      <path d="M -5 -8 L -3 5 L 0 8 L 3 5 L 5 -8" fill={isDark ? "#1a1a1a" : "#000000"} />
      {/* Left wing */}
      <path d="M -3 -2 L -20 0 L -3 1" fill={isDark ? "#1a1a1a" : "#000000"} />
      {/* Right wing */}
      <path d="M 3 -2 L 20 0 L 3 1" fill={isDark ? "#1a1a1a" : "#000000"} />
      {/* Tail fin */}
      <path d="M 0 5 L -2 12 L 0 10 L 2 12" fill={isDark ? "#1a1a1a" : "#000000"} />
    </g>
    
    {/* Left "Now" text */}
    <text x="45" y="95" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill={isDark ? "#1a1a1a" : "#000000"} textAnchor="middle" letterSpacing="1">
      Now
    </text>
    
    {/* Right "Now" text */}
    <text x="155" y="95" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill={isDark ? "#1a1a1a" : "#000000"} textAnchor="middle" letterSpacing="1">
      Now
    </text>
    
    {/* Bottom arc text path for "TOURS & SAFARIS" */}
    <defs>
      <path id="bottomArc" d="M 50 100 A 50 50 0 0 0 150 100" fill="none" />
    </defs>
    <text fill={isDark ? "#1a1a1a" : "#000000"} fontSize="13" fontWeight="bold" letterSpacing="0.5" fontFamily="Arial, sans-serif">
      <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
        TOURS &amp; SAFARIS
      </textPath>
    </text>
  </svg>
);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home', type: 'scroll' },
    { name: 'About', id: 'about', type: 'scroll' },
    { name: 'Tours', id: 'tours', type: 'scroll' },
    { name: 'Gallery', id: 'gallery', type: 'route' },
    { name: 'Downloads', id: 'downloads', type: 'scroll' },
    { name: 'Contact', id: 'contact', type: 'scroll' },
  ];
  
  const handleNavigation = (link: (typeof navLinks)[0]) => {
    if (link.type === 'route') {
      navigate(`/${link.id}`);
    } else {
      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 shadow-lg backdrop-blur-md border-b border-safari-100' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavigation(navLinks[0]); }} 
          className={`flex items-center gap-2 transition-all duration-300 hover:opacity-80 ${
            isScrolled ? 'text-safari-800' : 'text-white'
          }`}
          title="Now Now Tours & Safaris"
        >
          <Logo className="w-14 h-14" isDark={isScrolled} />
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              onClick={(e) => { e.preventDefault(); handleNavigation(link); }} 
              className={`font-medium transition-all duration-300 transform hover:scale-105 relative group ${
                isScrolled 
                  ? 'text-baobab-700 hover:text-sunset-600' 
                  : 'text-white/90 hover:text-sunset-300 text-shadow-sm'
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sunset-500 to-safari-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`focus:outline-none transition-colors duration-300 ${
              isScrolled ? 'text-baobab-800' : 'text-white'
            }`}
          >
            {isOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <nav className="flex flex-col items-center bg-white/98 backdrop-blur-md shadow-xl border-t border-safari-100 py-6">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              onClick={(e) => { e.preventDefault(); handleNavigation(link); }} 
              className="block py-3 px-6 text-baobab-700 hover:text-sunset-600 w-full text-center font-medium transition-colors duration-300 hover:bg-safari-50 rounded-lg mx-4"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;