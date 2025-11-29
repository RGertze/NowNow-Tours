export interface Tour {
  images: string[];
  name: string;
  destination: string;
  description: string;
  itinerary: string[];
  priceRange: string;
  upcomingDates?: string[];
  extras?: { [key: string]: string };
  slug?: string;
  flyerUrl?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  image: string;
  tripCountry?: string; // Country of the trip experience
  tripDate?: string;    // Date or range of the trip
  rating?: number;      // 1-5 star rating
  videoUrl?: string;    // Optional future video testimonial
}

export interface DownloadableDocument {
  title: string;
  description: string;
  fileUrl: string;
  category?: string;
}
