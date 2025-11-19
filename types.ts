export interface Tour {
  images: string[];
  name: string;
  destination: string;
  description: string;
  itinerary: string[];
  priceRange: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  image: string;
}

export interface DownloadableDocument {
  title: string;
  description: string;
  fileUrl: string;
}
