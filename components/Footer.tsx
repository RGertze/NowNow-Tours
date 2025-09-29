import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';

const SocialIcon: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
      aria-label={label}
    >
        <span className="text-xl">{icon}</span>
    </a>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-baobab-900 via-safari-900 to-earth-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center lg:text-left">
            <h3 className="font-display text-3xl font-bold text-white mb-4">
              NowNow Tours
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Your gateway to authentic African adventures. We create unforgettable journeys that connect you with the heart and soul of Africa.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <SocialIcon href="https://wa.me/1234567890" icon={<FaWhatsapp />} label="WhatsApp" />
              <SocialIcon href="#instagram" icon={<FaInstagram />} label="Instagram" />
              <SocialIcon href="#facebook" icon={<FaFacebookF />} label="Facebook" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h4 className="font-display text-xl font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Tours', 'Gallery', 'Contact', 'Downloads'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '')}`} 
                    className="text-white/70 hover:text-sunset-300 transition-colors duration-300 hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="text-center lg:text-left">
            <h4 className="font-display text-xl font-bold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-sunset-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📞</span>
                </div>
                <span className="text-white/80">+1 (234) 567-890</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-safari-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✉️</span>
                </div>
                <span className="text-white/80">contact@nownowtours.com</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-earth-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🌍</span>
                </div>
                <span className="text-white/80">Across Beautiful Africa</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} NowNow Tours. All Rights Reserved. Made with ❤️ for Africa.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;