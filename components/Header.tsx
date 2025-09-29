import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress, useScrolledPast } from '../hooks/useScrollProgress';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { fadeIn, slideInLeft, staggerContainer } from '../motion/motionVariants';

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

interface NavLink {
  name: string;
  id: string;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const isScrolled = useScrolledPast(16);
  const prefersReducedMotion = usePrefersReducedMotion();

  const navLinks: NavLink[] = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Tours', id: 'tours' },
    { name: 'Downloads', id: 'downloads' },
    { name: 'Contact', id: 'contact' },
  ];
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Header animation variants
  const headerVariants = {
    initial: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      backdropFilter: 'blur(0px)',
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Mobile menu variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
        when: 'beforeChildren',
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Logo hover variants
  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: prefersReducedMotion ? 1 : 1.05,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.2, 
        ease: 'easeOut' 
      }
    },
  };

  // Nav link hover variants
  const navLinkVariants = {
    initial: { 
      scale: 1,
      color: 'hsl(30, 6%, 25%)', // stone-700
    },
    hover: { 
      scale: prefersReducedMotion ? 1 : 1.05,
      color: 'hsl(25, 95%, 53%)', // orange-500
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.2, 
        ease: 'easeOut' 
      }
    },
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-600 to-orange-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          style={{ transformOrigin: '0%' }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.1,
            ease: 'easeOut',
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 mt-1"
        variants={headerVariants}
        initial="initial"
        animate={isScrolled ? 'scrolled' : 'initial'}
      >
        <div className="container-padding max-width-container">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { 
                e.preventDefault(); 
                scrollToSection('home'); 
              }}
              className="text-2xl lg:text-3xl font-bold font-display text-sky-800 cursor-pointer"
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
            >
              NowNow Tours
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection(link.id); 
                  }}
                  className="font-medium text-stone-700 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
                  variants={navLinkVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg p-2"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ 
                        rotate: 0, 
                        opacity: 1,
                        transition: {
                          duration: prefersReducedMotion ? 0.01 : 0.2,
                        }
                      }}
                      exit={{ 
                        rotate: 90, 
                        opacity: 0,
                        transition: {
                          duration: prefersReducedMotion ? 0.01 : 0.2,
                        }
                      }}
                    >
                      <CloseIcon className="w-7 h-7" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ 
                        rotate: 0, 
                        opacity: 1,
                        transition: {
                          duration: prefersReducedMotion ? 0.01 : 0.2,
                        }
                      }}
                      exit={{ 
                        rotate: -90, 
                        opacity: 0,
                        transition: {
                          duration: prefersReducedMotion ? 0.01 : 0.2,
                        }
                      }}
                    >
                      <MenuIcon className="w-7 h-7" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.nav 
                className="bg-white/95 backdrop-blur-md shadow-strong border-t border-stone-200"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="container-padding py-6 space-y-4">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        scrollToSection(link.id); 
                      }}
                      className="block py-3 px-4 text-lg font-medium text-stone-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors duration-200 cursor-pointer"
                      variants={menuItemVariants}
                      whileHover={{ 
                        scale: prefersReducedMotion ? 1 : 1.02,
                        x: prefersReducedMotion ? 0 : 4,
                      }}
                      whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;