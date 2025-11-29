import type { Tour, Testimonial, DownloadableDocument } from './types';

// HERO IMAGES
// Use locally imported hero images if you have added them under /public/images/hero/1.jpg .. etc.
// Fallback to Unsplash originals if local files are not yet provided.
export const HERO_IMAGES = [
  '/images/hero/1.jpg',
  '/images/hero/2.jpg',
  '/images/hero/3.jpg',
  '/images/hero/4.jpg'
];

// Helper to construct local tour image paths.
const localTourImages = (slug: string, count: number, remoteFallback: string[]): string[] => {
  const local = Array.from({ length: count }).map((_, i) => `/images/tours/${slug}/${i + 1}.jpg`);
  // We always return local paths; remoteFallback retained only for reference during migration.
  return local;
};

export const TOURS_DATA: Tour[] = [
  {
    images: localTourImages('zanzibar-getaway', 3, [
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?auto=format&fit=crop&w=800&q=80'
    ]),
    name: 'Zanzibar Getaway',
    slug: 'zanzibar-getaway',
    flyerUrl: '/flyers/zanzibar-getaway.pdf',
    destination: 'Tanzania',
    description: 'Relax on the pristine white-sand beaches of the Spice Islands. Explore historic Stone Town and swim with turtles.',
    itinerary: ['Return ticket from Windhoek to Zanzibar', 'Boat Trip', 'Dolphin Snorkel'],
    priceRange: 'N$ 24,800 pp · N$ 2,500.00 Non-Refundable Deposit',
    upcomingDates: ['30 Jun - 06 Jul', '13 - 19 Dec'],
  },
  {
    images: localTourImages('cape-town-adventure', 3, [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ]),
    name: 'Cape Town Adventure',
    slug: 'cape-town-adventure',
    flyerUrl: '/flyers/cape-town-adventure.pdf',
    destination: 'South Africa',
    description: 'Experience the vibrant culture and breathtaking landscapes of the Mother City, from Table Mountain to the Cape Winelands.',
    itinerary: ['Table Mountain', 'Daily Breakfast (included)', 'Wine Tasting', 'Soufriere Boat Cruise'],
    priceRange: 'N$ 6,800 pp · N$ 1,000.00 Non-Refundable Deposit',
    upcomingDates: ['08 - 13 May', '28 Aug - 02 Sep', '11 - 16 Dec', '30 Dec - 04 Jan 27'],
    extras: { dinner: 'own cost' },
  },
  {
    images: localTourImages('lubango-wonders', 3, [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80'
    ]),
    name: 'Lubango Wonders',
    slug: 'lubango-wonders',
    flyerUrl: '/flyers/lubango-wonders.pdf',
    destination: 'Angola',
    description: 'Discover the raw, untouched beauty of Angola. From the bustling capital Luanda to the stunning Kalandula Falls.',
    itinerary: ['Cristo Rei Miradouro', 'Pulukua Resort', 'Beach Hopping'],
    priceRange: 'N$ 5,400 pp · N$ 1,000.00 Non-Refundable Deposit',
    upcomingDates: ['30 Apr - 05 May', '28 Sep - 03 Oct'],
  },
  {
    images: localTourImages('victoria-falls', 3, [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80'
    ]),
    name: 'Victoria Falls',
    slug: 'victoria-falls',
    flyerUrl: '/flyers/victoria-falls.pdf',
    destination: 'Zambia',
    description: 'Experience the awe-inspiring Victoria Falls and the nearby Livingstone attractions for a memorable, water-themed escape.',
    itinerary: ['Day Visit to Victoria Falls', 'Livingstone Waterfront', 'Sunset Cruise (Optional)'],
    priceRange: 'N$ 7,650 pp · N$ 1,000.00 Non-Refundable Deposit',
    upcomingDates: ['29 Jun - 05 Jul', '21 - 27 Dec'],
  },
  {
    images: localTourImages('lesotho-highlands-escape', 3, [
      'https://images.unsplash.com/photo-1508264165352-c5c0b6b9c1d6?auto=format&fit=crop&w=800&q=80'
    ]),
    name: 'Lesotho Highlands Escape',
    slug: 'lesotho-highlands-escape',
    flyerUrl: '/flyers/lesotho-highlands-escape.pdf',
    destination: 'Lesotho',
    description: 'Snow-sport friendly escape to Afriski and scenic canyon views at Maletsunyane and Maliba Lodge.',
    itinerary: ['Accommodation', 'Round-trip flight', 'Afriski Mountain Resort snow', 'Maletsunyane', 'Daily breakfast', 'Maliba Lodge'],
    priceRange: 'N$ 13,800 pp · N$ 2,000.00 Non-Refundable Deposit',
    upcomingDates: ['29 Jul - 04 Aug'],
  },
  {
    images: localTourImages('bali-cultural-adventure', 3, [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ]),
    name: 'Bali Cultural & Adventure',
    slug: 'bali-cultural-adventure',
    flyerUrl: '/flyers/bali-cultural-adventure.pdf',
    destination: 'Indonesia',
    description: 'Explore temples, waterfalls, and iconic Bali experiences with comfortable stays and local highlights.',
    itinerary: ['Round-trip flight', '5 Nights Accommodation', 'Daily breakfast', 'Tibumana waterfall', 'Lempuyang Temple', 'Bali nest', 'Bali Swings', 'Floating breakfast', 'Ubud Market', 'Clubbing'],
    priceRange: 'N$ 33,500 pp · N$ 5,000.00 Non-Refundable Deposit',
    upcomingDates: ['01 - 07 Oct', '01 - 07 Dec'],
  },
  {
    images: localTourImages('maldives-seaside-retreat', 3, [
      'https://images.unsplash.com/photo-1505765052456-7f3b2aedf5d0?auto=format&fit=crop&w=800&q=80'
    ]),
    name: 'Maldives Seaside Retreat',
    slug: 'maldives-seaside-retreat',
    flyerUrl: '/flyers/maldives-seaside-retreat.pdf',
    destination: 'Maldives',
    description: 'Luxury island escape — more information and packages coming soon.',
    itinerary: ['More info coming soon'],
    priceRange: 'N$ 54,300 pp · More info coming soon',
    upcomingDates: [],
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: 'Now Now Tours & Safaris made our dream trip to Cape Town a reality. Every detail was perfect, and our guide was phenomenal. Truly an unforgettable experience!',
    name: 'Aisha & Mohammed',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80', // Happy couple
  },
  {
    quote: 'The Zanzibar getaway was pure magic. Safe, seamless, and so much fun. I felt completely looked after. Highly recommend this amazing company!',
    name: 'Samantha G.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80', // Smiling woman
  },
];

export const GALLERY_IMAGES: string[] = [
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80', // Safari Adventure
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80', // Table Mountain
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80', // African Sunset
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80', // Zanzibar Beach
    'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80', // Cultural Market
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80', // Waterfall
];

export const DOWNLOADS_DATA: DownloadableDocument[] = [
  // Trip Brochures
  {
    title: 'Zanzibar Getaway Brochure',
    description: 'Complete details about our Zanzibar Getaway: itinerary, inclusions, pricing (N$ 24,800 pp), and booking information.',
    fileUrl: '#',
    category: 'Trip Brochure',
  },
  {
    title: 'Cape Town Adventure Brochure',
    description: 'Explore the Mother City with this detailed guide. Activities, sights, pricing (N$ 6,800 pp), and travel tips.',
    fileUrl: '#',
    category: 'Trip Brochure',
  },
  {
    title: 'Lubango Wonders Brochure',
    description: 'Discover Angola\'s hidden gems. Itinerary, Cristo Rei, Pulukua Resort, pricing (N$ 5,400 pp).',
    fileUrl: '#',
    category: 'Trip Brochure',
  },
  {
    title: 'Victoria Falls Brochure',
    description: 'Experience the awe-inspiring Victoria Falls. Activities, Livingstone, pricing (N$ 7,650 pp).',
    fileUrl: '#',
    category: 'Trip Brochure',
  },
  {
    title: 'Lesotho Highlands Brochure',
    description: 'Snow, adventure, and scenic beauty. Afriski, Maletsunyane, pricing (N$ 13,800 pp).',
    fileUrl: '#',
    category: 'Trip Brochure',
  },
  {
    title: 'Bali Cultural & Adventure Brochure',
    description: 'Temples, waterfalls, and island magic. 5-night package, full itinerary, pricing (N$ 33,500 pp).',
    fileUrl: '#',
    category: 'Trip Brochure',
  },
  
  // Policy & Legal Documents
  {
    title: 'Terms & Conditions',
    description: 'General terms and conditions. Read before booking any tour with Now Now Tours & Safaris.',
    fileUrl: '#',
    category: 'Legal Document',
  },
  {
    title: 'Indemnity Form',
    description: 'Risk acknowledgment and indemnity form. Required for all tour bookings.',
    fileUrl: '#',
    category: 'Legal Document',
  },
  
  // Travel Guides & Checklists
  {
    title: 'Essential Travel Checklist',
    description: 'Complete packing checklist and travel preparation guide. Never leave anything behind!',
    fileUrl: '#',
    category: 'Travel Guide',
  },
  {
    title: 'Tour Dates Calendar',
    description: 'Full calendar of all upcoming tour departures for 2025. Plan your adventure now!',
    fileUrl: '#',
    category: 'Travel Guide',
  },
  {
    title: 'Travel Insurance Guide',
    description: 'Important information about travel insurance recommendations and coverage options.',
    fileUrl: '#',
    category: 'Travel Guide',
  },
];
