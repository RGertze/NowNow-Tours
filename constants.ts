import type { Tour, Testimonial, DownloadableDocument } from './types';

// Create placeholder data URLs for images to avoid external requests
const createPlaceholderImage = (width: number, height: number, color: string, label: string) => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="24" fill="white">
        ${label}
      </text>
    </svg>
  `)}`;
};

export const HERO_IMAGES = [
    createPlaceholderImage(1966, 800, '#0ea5e9', 'Zanzibar Beach'),
    createPlaceholderImage(1974, 800, '#059669', 'Cape Town Views'),
    createPlaceholderImage(1936, 800, '#dc2626', 'Safari Adventure'),
    createPlaceholderImage(1974, 800, '#7c2d12', 'Desert Journey'),
];

export const TOURS_DATA: Tour[] = [
  {
    images: [
        createPlaceholderImage(800, 600, '#0ea5e9', 'Zanzibar Beach'),
        createPlaceholderImage(800, 600, '#06b6d4', 'Stone Town'),
        createPlaceholderImage(800, 600, '#0284c7', 'Spice Island'),
    ],
    name: 'Zanzibar Getaway',
    destination: 'Tanzania',
    description: 'Relax on the pristine white-sand beaches of the Spice Islands. Explore historic Stone Town and swim with turtles.',
    itinerary: ['Arrival & Stone Town Tour', 'Spice Farm & Jozani Forest', 'Safari Blue Sea Adventure', 'Nungwi Beach Relaxation', 'Departure'],
    priceRange: '$1,200 - $1,800',
  },
  {
    images: [
        createPlaceholderImage(800, 600, '#059669', 'Table Mountain'),
        createPlaceholderImage(800, 600, '#047857', 'Cape Peninsula'),
        createPlaceholderImage(800, 600, '#065f46', 'Winelands'),
    ],
    name: 'Cape Town Adventure',
    destination: 'South Africa',
    description: 'Experience the vibrant culture and breathtaking landscapes of the Mother City, from Table Mountain to the Cape Winelands.',
    itinerary: ['Table Mountain Hike', 'Robben Island & V&A Waterfront', 'Cape Peninsula & Boulders Beach', 'Winelands Tour', 'Departure'],
    priceRange: '$1,500 - $2,200',
  },
  {
    images: [
        createPlaceholderImage(800, 600, '#dc2626', 'Luanda City'),
        createPlaceholderImage(800, 600, '#b91c1c', 'Kalandula Falls'),
        createPlaceholderImage(800, 600, '#991b1b', 'Kissama Safari'),
    ],
    name: 'Angolan Wonders',
    destination: 'Angola',
    description: 'Discover the raw, untouched beauty of Angola. From the bustling capital Luanda to the stunning Kalandula Falls.',
    itinerary: ['Luanda City Tour', 'Miradouro da Lua', 'Kalandula Falls Visit', 'Kissama National Park Safari', 'Departure'],
    priceRange: '$2,000 - $2,800',
  },
  {
    images: [
        createPlaceholderImage(800, 600, '#7c2d12', 'Burj Khalifa'),
        createPlaceholderImage(800, 600, '#92400e', 'Desert Safari'),
        createPlaceholderImage(800, 600, '#a16207', 'Dubai Marina'),
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
    image: createPlaceholderImage(200, 200, '#6366f1', 'A&M'),
  },
  {
    quote: 'The Zanzibar getaway was pure magic. Safe, seamless, and so much fun. I felt completely looked after. Highly recommend this amazing company!',
    name: 'Samantha G.',
    image: createPlaceholderImage(200, 200, '#8b5cf6', 'SG'),
  },
];

export const GALLERY_IMAGES: string[] = [
    createPlaceholderImage(1600, 900, '#0ea5e9', 'Safari Adventure'),
    createPlaceholderImage(1600, 900, '#059669', 'Mountain Hike'),
    createPlaceholderImage(1600, 900, '#dc2626', 'Beach Sunset'),
    createPlaceholderImage(1600, 900, '#7c2d12', 'City Skyline'),
    createPlaceholderImage(1600, 900, '#6366f1', 'Cultural Tour'),
    createPlaceholderImage(1600, 900, '#8b5cf6', 'Wildlife'),
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
