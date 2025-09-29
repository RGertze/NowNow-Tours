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
    itinerary: ['Arrival & Stone Town Tour', 'Spice Farm & Jozani Forest', 'Safari Blue Sea Adventure', 'Nungwi Beach Relaxation', 'Departure'],
    priceRange: '$1,200 - $1,800',
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
    itinerary: ['Table Mountain Hike', 'Robben Island & V&A Waterfront', 'Cape Peninsula & Boulders Beach', 'Winelands Tour', 'Departure'],
    priceRange: '$1,500 - $2,200',
  },
  {
    images: [
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Luanda Cityscape
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // African Waterfall
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Safari Wildlife
    ],
    name: 'Angolan Wonders',
    destination: 'Angola',
    description: 'Discover the raw, untouched beauty of Angola. From the bustling capital Luanda to the stunning Kalandula Falls.',
    itinerary: ['Luanda City Tour', 'Miradouro da Lua', 'Kalandula Falls Visit', 'Kissama National Park Safari', 'Departure'],
    priceRange: '$2,000 - $2,800',
  },
  {
    images: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Dubai Skyline
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Desert Safari
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Dubai Marina
    ],
    name: 'Dubai Stopover',
    destination: 'United Arab Emirates',
    description: 'Add a touch of modern luxury to your African adventure with a stop in the dazzling city of Dubai.',
    itinerary: ['Burj Khalifa & Dubai Mall', 'Desert Safari Adventure', 'Old Dubai & Souks Tour', 'Marina Dhow Cruise', 'Departure'],
    priceRange: '$900 - $1,400',
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: 'NowNow Tours made our dream trip to Cape Town a reality. Every detail was perfect, and our guide was phenomenal. Truly an unforgettable experience!',
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
    description: 'All the details about our most popular beach escape. Itinerary, inclusions, and stunning photos.',
    fileUrl: '#',
  },
  {
    title: 'Cape Town Adventure Brochure',
    description: 'Explore the Mother City with this detailed guide. Learn about activities, sights, and pricing.',
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
