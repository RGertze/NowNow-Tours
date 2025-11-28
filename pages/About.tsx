import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGlobeAfrica, FaShieldAlt, FaDollarSign, FaSuitcase, FaMobileAlt, FaHeart, FaPlane, FaStar } from 'react-icons/fa';

const Logo: React.FC<{ className?: string; isDark?: boolean }> = ({ className = "w-12 h-12", isDark = false }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="95" stroke={isDark ? "#1a1a1a" : "#000000"} strokeWidth="6" />
    <path d="M 50 100 A 50 50 0 0 1 150 100" stroke={isDark ? "#1a1a1a" : "#000000"} strokeWidth="6" fill="none" strokeLinecap="round" />
    <g transform="translate(100, 85)">
      <path d="M -5 -8 L -3 5 L 0 8 L 3 5 L 5 -8" fill={isDark ? "#1a1a1a" : "#000000"} />
      <path d="M -3 -2 L -20 0 L -3 1" fill={isDark ? "#1a1a1a" : "#000000"} />
      <path d="M 3 -2 L 20 0 L 3 1" fill={isDark ? "#1a1a1a" : "#000000"} />
      <path d="M 0 5 L -2 12 L 0 10 L 2 12" fill={isDark ? "#1a1a1a" : "#000000"} />
    </g>
    <text x="45" y="95" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill={isDark ? "#1a1a1a" : "#000000"} textAnchor="middle" letterSpacing="1">Now</text>
    <text x="155" y="95" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill={isDark ? "#1a1a1a" : "#000000"} textAnchor="middle" letterSpacing="1">Now</text>
    <defs>
      <path id="bottomArc" d="M 50 100 A 50 50 0 0 0 150 100" fill="none" />
    </defs>
    <text fill={isDark ? "#1a1a1a" : "#000000"} fontSize="13" fontWeight="bold" letterSpacing="0.5" fontFamily="Arial, sans-serif">
      <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">TOURS &amp; SAFARIS</textPath>
    </text>
  </svg>
);

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: FaGlobeAfrica,
      title: "Hassle-Free Travel",
      description: "We handle everything—flights, accommodation, activities—so you can focus on making memories."
    },
    {
      icon: FaShieldAlt,
      title: "Safe & Trusted",
      description: "Professional guides, vetted partners, and 24/7 support ensure your safety every step of the way."
    },
    {
      icon: FaDollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees. Clear pricing with flexible payment plans and group discounts available."
    },
    {
      icon: FaSuitcase,
      title: "Expertly Curated Tours",
      description: "Handpicked destinations, local experiences, and itineraries designed by travel professionals."
    },
    {
      icon: FaMobileAlt,
      title: "Instant Support",
      description: "Reach us anytime via WhatsApp for quick responses, changes, or emergency assistance."
    },
    {
      icon: FaHeart,
      title: "Community of Travelers",
      description: "Join a vibrant community of adventurers, make new friends, and share unforgettable moments."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-safari-50 to-earth-50">
      {/* Header with Logo */}
      <div className="container mx-auto px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/')}
        >
          <Logo className="w-16 h-16" isDark={true} />
          <div>
            <p className="text-xs uppercase tracking-wider text-baobab-600 font-semibold">• About Us</p>
          </div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunset-100 text-sunset-700 text-sm font-semibold mb-6">
              <FaPlane className="text-sunset-600" />
              Namibia-Based Travel Experts
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-baobab-900 mb-6 leading-tight">
              Making African Adventures <span className="text-gradient bg-gradient-to-r from-sunset-500 to-safari-600 bg-clip-text text-transparent">Hassle-Free</span>
            </h1>
            <p className="text-lg text-baobab-700 leading-relaxed mb-8">
              Now Now Tours & Safaris is your trusted travel partner, specializing in curated group tours across Southern Africa and beyond. From Zanzibar's beaches to Victoria Falls' majesty, we design unforgettable journeys that are safe, affordable, and stress-free.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-baobab-900 hover:bg-baobab-800 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Explore Our Tours
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-48">
                <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80" alt="Safari Adventure" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">Safari Adventures</p>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-64">
                <img src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=600&q=80" alt="Beach Escapes" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">Beach Escapes</p>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-64">
                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80" alt="City Exploration" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">City Tours</p>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-48">
                <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" alt="Natural Wonders" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">Natural Wonders</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-start gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-baobab-100 text-baobab-700 text-sm font-semibold">
              <FaStar className="text-baobab-600" />
              About Us
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-baobab-900 mb-6">
                Our Vision for Seamless African Travel
              </h2>
              <p className="text-lg text-baobab-700 leading-relaxed mb-6">
                Now Now Tours envisions a world where <strong>exploring Africa is effortless</strong>. We believe every traveler deserves authentic experiences, from the savannahs of Zambia to the beaches of Zanzibar, without the stress of planning.
              </p>
              <p className="text-lg text-baobab-700 leading-relaxed">
                Rooted in Namibia, we combine local expertise with a passion for adventure, creating journeys that connect you with Africa's heart—its landscapes, cultures, and people.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?auto=format&fit=crop&w=500&q=80" alt="Tour Leader" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-4 left-4 text-white font-semibold">Expert Guides</p>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg mt-8">
                <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=500&q=80" alt="Group Travel" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-4 left-4 text-white font-semibold">Group Adventures</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-safari-50 to-sunset-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunset-100 text-sunset-700 text-sm font-semibold mb-4">
              <FaStar className="text-sunset-600" />
              Why Choose Now Now Tours
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-baobab-900 mb-6">
              Benefits That Make Us Different
            </h2>
            <p className="text-lg text-baobab-700 max-w-3xl mx-auto">
              We're more than a tour company—we're your travel partner, committed to making every journey seamless, safe, and unforgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sunset-500 to-safari-500 flex items-center justify-center mb-4 shadow-lg">
                  <IconComponent className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-baobab-900 mb-3">{benefit.title}</h3>
                <p className="text-baobab-700 leading-relaxed">{benefit.description}</p>
              </motion.div>
            );})}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-sunset-500 via-safari-500 to-earth-500">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6">
              Ready to Start Your African Adventure?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Chat with us on WhatsApp for instant support, custom packages, and more information about our upcoming tours. Let's make your dream trip a reality!
            </p>
            <a
              href="https://wa.me/264812297409?text=Hi! I'd like to learn more about Now Now Tours"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-safari-700 font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
