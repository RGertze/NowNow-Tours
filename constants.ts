import type { Tour, Testimonial, DownloadableDocument } from './types';

export const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop', // Zanzibar
    'https://images.unsplash.com/photo-1563911674452-d34a4a53a81a?q=80&w=1974&auto=format&fit=crop', // Cape Town tourists
    'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1936&auto=format&fit=crop', // Safari
    'https://images.unsplash.com/photo-1604725333758-294b45151b72?q=80&w=1974&auto=format&fit=crop', // Hot air balloon
];

export const TOURS_DATA: Tour[] = [
  {
    images: [
        'https://images.unsplash.com/photo-1601752801594-8a892a01ce58?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1596913401214-4161f3d327ce?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1622329719488-063a8a9611ea?q=80&w=800&auto=format&fit=crop',
    ],
    name: 'Zanzibar Getaway',
    destination: 'Tanzania',
    description: 'Relax on the pristine white-sand beaches of the Spice Islands. Explore historic Stone Town and swim with turtles.',
    itinerary: ['Arrival & Stone Town Tour', 'Spice Farm & Jozani Forest', 'Safari Blue Sea Adventure', 'Nungwi Beach Relaxation', 'Departure'],
    priceRange: '$1,200 - $1,800',
  },
  {
    images: [
        'https://images.unsplash.com/photo-1590033431379-3c5a65a3d7e4?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1552599131-4ac53b49e099?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1629272134221-001d87d159a4?q=80&w=800&auto=format&fit=crop',
    ],
    name: 'Cape Town Adventure',
    destination: 'South Africa',
    description: 'Experience the vibrant culture and breathtaking landscapes of the Mother City, from Table Mountain to the Cape Winelands.',
    itinerary: ['Table Mountain Hike', 'Robben Island & V&A Waterfront', 'Cape Peninsula & Boulders Beach', 'Winelands Tour', 'Departure'],
    priceRange: '$1,500 - $2,200',
  },
  {
    images: [
        'https://images.unsplash.com/photo-1650372986438-c92a9b3a5394?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1652701410149-55688a14b35f?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1628286938221-9da8a523b169?q=80&w=800&auto=format&fit=crop',
    ],
    name: 'Angolan Wonders',
    destination: 'Angola',
    description: 'Discover the raw, untouched beauty of Angola. From the bustling capital Luanda to the stunning Kalandula Falls.',
    itinerary: ['Luanda City Tour', 'Miradouro da Lua', 'Kalandula Falls Visit', 'Kissama National Park Safari', 'Departure'],
    priceRange: '$2,000 - $2,800',
  },
  {
    images: [
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522956239912-11e2f759685e?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: 'The Zanzibar getaway was pure magic. Safe, seamless, and so much fun. I felt completely looked after. Highly recommend this amazing company!',
    name: 'Samantha G.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  },
];

export const GALLERY_IMAGES: string[] = [
    'https://images.unsplash.com/photo-1533106418989-88901b050f6f?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587740998493-4414f63be3a4?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504150558240-0b4fd23ab667?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549492423-400259a4e2e5?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1600&auto=format&fit=crop',
];

export const DOWNLOADS_DATA: DownloadableDocument[] = [
  {
    title: 'Zanzibar Getaway Brochure',
    description: 'All the details about our most popular beach escape. Itinerary, inclusions, and stunning photos.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'Cape Town Adventure Brochure',
    description: 'Explore the Mother City with this detailed guide. Learn about activities, sights, and pricing.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'General Terms & Conditions',
    description: 'Our complete terms and conditions document. Please read before booking your tour.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'Essential Travel Checklist',
    description: 'A handy checklist to make sure you have everything you need for a smooth and enjoyable trip.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];
