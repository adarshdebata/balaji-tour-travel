import type { NavItem } from "@/types";

export const SITE_CONFIG = {
  name: "Balaji Tour & Travel Line",
  shortName: "Balaji Travels",
  tagline: "Unveiling Luxury, Crafting Journeys",
  description:
    "Premium Tempo Traveller, SUV, and Luxury Coach rentals across Delhi NCR. Family tours, corporate travel, pilgrimages, and group journeys done right.",
  url: "https://balajitourandtravelline.com",
  ogImage: "/images/og-image.jpg",
  founded: 2000,
} as const;

export const CONTACT = {
  phonePrimary: "+91 98765 43210",
  phoneSecondary: "+91 98765 43211",
  whatsapp: "+91 98765 43210",
  email: "info@balajitourandtravelline.com",
  address: {
    line1: "Sector 22, Noida",
    line2: "Gautam Buddh Nagar",
    city: "Delhi NCR",
    state: "Uttar Pradesh",
    pincode: "201301",
    country: "India",
  },
  hours: "24 / 7 Available",
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Fleet",
    href: "/fleet",
    children: [
      { label: "SUV", href: "/fleet/suv" },
      { label: "Tempo Traveller", href: "/fleet/tempo-traveller" },
      { label: "Luxury Coaches", href: "/fleet/luxury-coaches" },
    ],
  },
  { label: "Destinations", href: "/destinations" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const STATS = [
  { label: "Years of Experience", value: 25, suffix: "+" },
  { label: "Coaches in Fleet", value: 80, suffix: "+" },
  { label: "Happy Customers", value: 12000, suffix: "+" },
  { label: "Cities Covered", value: 150, suffix: "+" },
] as const;
