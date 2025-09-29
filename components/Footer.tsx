import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';

const SocialIcon: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-orange-500 transition-all duration-300 transform hover:scale-110">
        <span className="text-2xl">{icon}</span>
    </a>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-sky-900 text-stone-300">
        <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold text-white">NowNow Tours</h3>
                    <p className="text-stone-400">Your African adventure starts here.</p>
                </div>
                <div className="flex justify-center gap-6 mb-6 md:mb-0">
                    <SocialIcon href="#whatsapp" icon={<FaWhatsapp />} />
                    <SocialIcon href="#instagram" icon={<FaInstagram />} />
                    <SocialIcon href="#facebook" icon={<FaFacebookF />} />
                </div>
            </div>
            <div className="border-t border-sky-800 mt-8 pt-6 text-center text-stone-400 text-sm">
                <p>&copy; {new Date().getFullYear()} NowNow Tours. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;