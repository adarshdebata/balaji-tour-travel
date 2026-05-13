export interface Vehicle {
  id: string;
  name: string;
  category: "suv" | "tempo-traveller" | "luxury-coach";
  image: string;
  seating: number;
  luggage: string;
  ac: boolean;
  features: string[];
  pricePerKm: number;
  pricePerDay: number;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  image: string;
  shortDescription: string;
  locations: string[];
  bestTime: string;
  duration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  tripType: string;
  date: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Route {
  id: string;
  source: string;
  destination: string;
  distanceKm: number;
  estimatedHours: number;
  popularStops: string[];
}

export interface PricingTier {
  vehicleType: string;
  pricePerKm: number;
  minKmPerDay: number;
  driverAllowance: number;
  nightCharge: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
