import React from 'react';
import { motion } from 'framer-motion';
import { ScrollMotion } from '../motion/MotionWrapper';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { fadeUp, staggerContainer, fadeIn } from '../motion/motionVariants';

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
  </svg>
);

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const EnvelopeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  index: number;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, label, color, index }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ref, isVisible] = useIntersectionObserver<HTMLAnchorElement>({
    threshold: 0.3,
  });

  const iconVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        w-12 h-12 rounded-xl flex items-center justify-center
        bg-white/5 backdrop-blur-sm border border-white/10
        hover:bg-white/10 hover:border-white/20 hover:shadow-glow
        transition-all duration-300 group
        focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent
      `}
      variants={iconVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      whileHover={{
        y: prefersReducedMotion ? 0 : -3,
        scale: prefersReducedMotion ? 1 : 1.1,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
      aria-label={label}
    >
      <div className={`${color} group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
    </motion.a>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, onClick }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="text-sky-200 hover:text-white transition-colors duration-200 text-sm relative group cursor-pointer"
      whileHover={{
        x: prefersReducedMotion ? 0 : 2,
        transition: { duration: 0.2 },
      }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
    </motion.a>
  );
};

const Footer: React.FC = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const waveVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 2,
        ease: 'easeInOut',
        repeat: prefersReducedMotion ? 0 : Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  const backgroundVariants = {
    animate: {
      background: [
        'linear-gradient(135deg, hsl(201, 90%, 27%) 0%, hsl(202, 80%, 24%) 100%)',
        'linear-gradient(135deg, hsl(202, 80%, 24%) 0%, hsl(201, 90%, 27%) 100%)',
      ],
      transition: {
        duration: prefersReducedMotion ? 0.01 : 8,
        repeat: prefersReducedMotion ? 0 : Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      },
    },
  };

  const socialLinks = [
    {
      href: 'https://wa.me/1234567890',
      icon: <i className="fab fa-whatsapp text-lg" />,
      label: 'Contact us on WhatsApp',
      color: 'text-green-400',
    },
    {
      href: '#',
      icon: <i className="fab fa-instagram text-lg" />,
      label: 'Follow us on Instagram',
      color: 'text-pink-400',
    },
    {
      href: '#',
      icon: <i className="fab fa-facebook-f text-lg" />,
      label: 'Like our Facebook page',
      color: 'text-blue-400',
    },
    {
      href: '#',
      icon: <i className="fab fa-twitter text-lg" />,
      label: 'Follow us on Twitter',
      color: 'text-sky-400',
    },
    {
      href: '#',
      icon: <i className="fab fa-youtube text-lg" />,
      label: 'Subscribe to our YouTube channel',
      color: 'text-red-400',
    },
  ];

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Tours', id: 'tours' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.footer
      className="relative overflow-hidden text-white"
      variants={backgroundVariants}
      animate="animate"
      style={{
        background: 'linear-gradient(135deg, hsl(201, 90%, 27%) 0%, hsl(202, 80%, 24%) 100%)',
      }}
    >
      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 400"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,100 C300,150 600,50 1200,100 L1200,400 L0,400 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            variants={waveVariants}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M0,150 C400,100 800,200 1200,150 L1200,400 L0,400 Z"
            fill="currentColor"
            opacity="0.1"
            variants={waveVariants}
            initial="initial"
            animate="animate"
          />
        </svg>
      </div>

      <div className="relative z-10 max-width-container container-padding py-16">
        {/* Main Footer Content */}
        <ScrollMotion
          ref={headerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          type="fadeUp"
          threshold={0.2}
        >
          {/* Brand Section */}
          <motion.div className="lg:col-span-2" variants={fadeUp}>
            <motion.h3 
              className="text-3xl font-bold font-display mb-4"
              whileHover={{
                scale: prefersReducedMotion ? 1 : 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <span className="gradient-text bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent">
                NowNow Tours
              </span>
            </motion.h3>
            <p className="text-sky-200 leading-relaxed mb-6 text-lg max-w-md">
              Your gateway to authentic African adventures. 
              We create unforgettable experiences that connect you with the heart and soul of Africa.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <motion.div 
                className="flex items-center gap-3 text-sky-200"
                whileHover={{ x: prefersReducedMotion ? 0 : 4 }}
              >
                <PhoneIcon className="w-5 h-5 text-orange-400" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 text-sky-200"
                whileHover={{ x: prefersReducedMotion ? 0 : 4 }}
              >
                <EnvelopeIcon className="w-5 h-5 text-orange-400" />
                <a href="mailto:contact@nownowtours.com" className="hover:text-white transition-colors">
                  contact@nownowtours.com
                </a>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3 text-sky-200"
                whileHover={{ x: prefersReducedMotion ? 0 : 4 }}
              >
                <MapPinIcon className="w-5 h-5 text-orange-400 mt-0.5" />
                <span>Based in Africa, Serving the World</span>
              </motion.div>
            </div>

            {/* Social Media */}
            <motion.div variants={fadeUp}>
              <h4 className="font-semibold mb-4 text-white">Follow Our Journey</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <SocialIcon
                    key={social.label}
                    href={social.href}
                    icon={social.icon}
                    label={social.label}
                    color={social.color}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h4 className="font-bold text-white mb-6 text-lg">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <div key={link.id}>
                  <FooterLink
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                  >
                    {link.name}
                  </FooterLink>
                </div>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter & CTA */}
          <motion.div variants={fadeUp}>
            <h4 className="font-bold text-white mb-6 text-lg">Stay Connected</h4>
            <div className="space-y-4">
              <p className="text-sky-200 text-sm leading-relaxed">
                Get travel tips, destination guides, and exclusive offers delivered to your inbox.
              </p>
              
              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-sky-900"
                whileHover={{
                  scale: prefersReducedMotion ? 1 : 1.05,
                  y: prefersReducedMotion ? 0 : -2,
                }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              >
                <i className="fab fa-whatsapp text-lg" />
                <span>Start Planning</span>
              </motion.a>

              <div className="pt-4 border-t border-sky-700">
                <p className="text-sky-200 text-sm mb-2">Business Hours:</p>
                <p className="text-white text-sm font-medium">Mon-Fri: 9AM-6PM EST</p>
                <p className="text-white text-sm font-medium">Weekend: 10AM-4PM EST</p>
              </div>
            </div>
          </motion.div>
        </ScrollMotion>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-sky-700/50 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: {
              duration: prefersReducedMotion ? 0.01 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.2,
            },
          }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              className="text-sky-200 text-sm text-center md:text-left"
              variants={fadeUp}
            >
              <p className="flex items-center gap-2 justify-center md:justify-start">
                © {new Date().getFullYear()} NowNow Tours. Made with
                <HeartIcon className="w-4 h-4 text-red-400" />
                in Africa.
              </p>
              <p className="mt-1">All rights reserved. Travel responsibly.</p>
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white/50"
              whileHover={{
                y: prefersReducedMotion ? 0 : -4,
                scale: prefersReducedMotion ? 1 : 1.05,
              }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              aria-label="Back to top"
            >
              <ArrowUpIcon className="w-5 h-5 text-white group-hover:text-orange-300 transition-colors duration-200" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;