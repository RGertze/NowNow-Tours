import type { Tour, Testimonial, DownloadableDocument } from './types';

// High-quality African tourism images from Unsplash
export const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80', // Serengeti Safari
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Cape Town Table Mountain
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Zanzibar Beach
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80', // African Sunset
];

export const TOURS_DATA: Tour[] = [
  {
    images: [
        'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Zanzibar Beach
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Stone Town
        'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Spice Market
    ],
    name: 'Zanzibar Getaway',
    destination: 'Tanzania',
    description: 'Relax on the pristine white-sand beaches of the Spice Islands. Explore historic Stone Town and swim with turtles.',
    itinerary: ['Return ticket from Windhoek to Zanzibar', 'Boat Trip', 'Dolphin Snorkel'],
    priceRange: 'N$ 24,800 pp · N$ 2,500.00 Non-Refundable Deposit',
    upcomingDates: ['30 Jun - 06 Jul', '13 - 19 Dec'],
  },
  {
    images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Table Mountain
        'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Cape Peninsula
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Winelands
    ],
    name: 'Cape Town Adventure',
    destination: 'South Africa',
    description: 'Experience the vibrant culture and breathtaking landscapes of the Mother City, from Table Mountain to the Cape Winelands.',
    itinerary: ['Table Mountain', 'Daily Breakfast (included)', 'Wine Tasting', 'Soufriere Boat Cruise'],
    priceRange: 'N$ 6,800 pp · N$ 1,000.00 Non-Refundable Deposit',
    upcomingDates: ['08 - 13 May', '28 Aug - 02 Sep', '11 - 16 Dec', '30 Dec - 04 Jan 27'],
    extras: { dinner: 'own cost' },
  },
  {
    images: [
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Luanda Cityscape
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // African Waterfall
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Safari Wildlife
    ],
    name: 'Lubango Wonders',
    destination: 'Angola',
    description: 'Discover the raw, untouched beauty of Angola. From the bustling capital Luanda to the stunning Kalandula Falls.',
    itinerary: ['Cristo Rei Miradouro', 'Pulukua Resort', 'Beach Hopping'],
    priceRange: 'N$ 5,400 pp · N$ 1,000.00 Non-Refundable Deposit',
    upcomingDates: ['30 Apr - 05 May', '28 Sep - 03 Oct'],
  },
  {
    images: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Victoria Falls
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Falls viewpoint
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Sunset Cruise
    ],
    name: 'Victoria Falls',
    destination: 'Zambia',
    description: 'Experience the awe-inspiring Victoria Falls and the nearby Livingstone attractions for a memorable, water-themed escape.',
    itinerary: ['Day Visit to Victoria Falls', 'Livingstone Waterfront', 'Sunset Cruise (Optional)'],
    priceRange: 'N$ 7,650 pp · N$ 1,000.00 Non-Refundable Deposit',
    upcomingDates: ['29 Jun - 05 Jul', '21 - 27 Dec'],
  },
  {
    images: [
      'https://images.unsplash.com/photo-1508264165352-c5c0b6b9c1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Lesotho
    ],
    name: 'Lesotho Highlands Escape',
    destination: 'Lesotho',
    description: 'Snow-sport friendly escape to Afriski and scenic canyon views at Maletsunyane and Maliba Lodge.',
    itinerary: ['Accommodation', 'Round-trip flight', 'Afriski Mountain Resort snow', 'Maletsunyane', 'Daily breakfast', 'Maliba Lodge'],
    priceRange: 'N$ 13,800 pp · N$ 2,000.00 Non-Refundable Deposit',
    upcomingDates: ['29 Jul - 04 Aug'],
  },
  {
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Bali beach
    ],
    name: 'Bali Cultural & Adventure',
    destination: 'Indonesia',
    description: 'Explore temples, waterfalls, and iconic Bali experiences with comfortable stays and local highlights.',
    itinerary: ['Round-trip flight', '5 Nights Accommodation', 'Daily breakfast', 'Tibumana waterfall', 'Lempuyang Temple', 'Bali nest', 'Bali Swings', 'Floating breakfast', 'Ubud Market', 'Clubbing'],
    priceRange: 'N$ 33,500 pp · N$ 5,000.00 Non-Refundable Deposit',
    upcomingDates: ['01 - 07 Oct', '01 - 07 Dec'],
  },
  {
    images: [
      'https://images.unsplash.com/photo-1505765052456-7f3b2aedf5d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Maldives
    ],
    name: 'Maldives Seaside Retreat',
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
  {
    title: 'Zanzibar Getaway Brochure',
    description: 'All the details about our Zanzibar Getaway including itinerary, inclusions, and pricing (N$ 21,800 pp · N$ 2,500.00 Non-Refundable Deposit).',
    fileUrl: '#',
  },
  {
    title: 'Cape Town Adventure Brochure',
    description: 'Explore the Mother City with this detailed guide. Includes activities, sights, and pricing (N$ 6,800 pp · N$ 1,000.00 Non-Refundable Deposit).',
    fileUrl: '#',
  },
  {
    title: 'General Terms & Conditions',
    description: 'Our complete terms and conditions document. Please read before booking your tour.',
    fileUrl: '#',
  },
  {
    title: 'Essential Travel Checklist',
    description: 'A handy checklist to make sure you have everything you need for a smooth and enjoyable trip.',
    fileUrl: '#',
  },
];
