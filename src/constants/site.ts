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
  phonePrimary: "+919210506300",
  phoneSecondary: "+919891506300",
  whatsapp: "+919210506300",
  email: "balajitourandtravelline@gmail.com",
  address: {
    line1: "Axis Bank ATM, Swati Public School Building, D-1/41, Block D, New Kondli, Kondli",
    line2: "Gautam Buddh Nagar",
    city: "Delhi NCR",
    state: "Delhi",
    pincode: "110096",
    country: "India",
  },
  hours: "24 / 7 Available",
  socials: {
    facebook: "https://www.facebook.com/balajitourtravelsdelhi/",
    instagram: "https://www.instagram.com/balajitourtravellinedelhi/",
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
  { label: "Estimator", href: "/estimator" },
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
