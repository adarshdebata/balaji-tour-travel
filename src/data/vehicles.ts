import type { Vehicle } from "@/types";

export const VEHICLES: Vehicle[] = [
  // SUVs
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    category: "suv",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80",
    seating: 7,
    luggage: "4 large bags",
    ac: true,
    features: ["Push-start ignition", "Leather interiors", "Touchscreen infotainment", "Cruise control", "Hill-assist", "Sunroof"],
    pricePerKm: 22,
    pricePerDay: 6500,
    description:
      "Commanding road presence with premium comfort. The Fortuner is built for highways, hill passes, and everything in between.",
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    category: "suv",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80",
    seating: 7,
    luggage: "3 large bags",
    ac: true,
    features: ["Captain seats (middle row)", "USB charging ports", "Roof-mount AC vents", "Plush legroom", "Soft suspension"],
    pricePerKm: 18,
    pricePerDay: 5500,
    description:
      "The most trusted choice for family tours and corporate travel. Smooth, spacious, and reliable mile after mile.",
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga",
    category: "suv",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
    seating: 6,
    luggage: "2 large bags",
    ac: true,
    features: ["Compact yet spacious", "Fuel efficient", "Rear AC vents", "Easy maneuverability", "Touchscreen audio"],
    pricePerKm: 14,
    pricePerDay: 4000,
    description:
      "A nimble crossover that fits city lanes without compromising on comfort. Ideal for smaller groups and short tours.",
  },

  // Tempo Travellers
  {
    id: "tt-20",
    name: "Traveller 20 Seater",
    category: "tempo-traveller",
    image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=1200&q=80",
    seating: 20,
    luggage: "Roof carrier + boot",
    ac: true,
    features: ["2x1 push-back seats", "LED reading lights", "Roof AC ducting", "Music system", "First-aid kit", "Curtains"],
    pricePerKm: 32,
    pricePerDay: 9500,
    description:
      "Our most popular tour coach. Designed for large families, college trips, and pilgrimages where comfort defines the journey.",
  },
  {
    id: "tt-12",
    name: "Traveller 12 Seater",
    category: "tempo-traveller",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80",
    seating: 12,
    luggage: "Generous boot space",
    ac: true,
    features: ["Captain reclining seats", "Wide windows", "Centralized AC", "Premium upholstery", "Bluetooth audio"],
    pricePerKm: 26,
    pricePerDay: 7500,
    description:
      "A balanced sweet spot for mid-sized groups. Premium feel, agile on hills, and comfortable on long highways.",
  },
  {
    id: "urbania",
    name: "Force Urbania Traveller",
    category: "tempo-traveller",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&q=80",
    seating: 13,
    luggage: "Custom luggage bay",
    ac: true,
    features: ["Business-class seats", "Climate-controlled cabin", "Mood lighting", "USB charging per seat", "Privacy curtains", "Bose-quality audio"],
    pricePerKm: 38,
    pricePerDay: 12000,
    description:
      "The flagship of premium group travel. Lounge-style seating, monocoque chassis, and a ride quality that feels closer to a luxury sedan.",
  },

  // Luxury Coaches
  {
    id: "coach-30",
    name: "30-Seater Luxury Coach",
    category: "luxury-coach",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
    seating: 30,
    luggage: "Underfloor luggage bay",
    ac: true,
    features: ["2x2 reclining seats", "Onboard washroom (optional)", "PA system", "LED TV", "Refrigerator", "Curtains"],
    pricePerKm: 48,
    pricePerDay: 16000,
    description:
      "Built for weddings, corporate offsites, and large pilgrimage groups. A first-class experience on wheels.",
  },
  {
    id: "coach-45",
    name: "45-Seater Volvo Coach",
    category: "luxury-coach",
    image: "https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=1200&q=80",
    seating: 45,
    luggage: "Twin luggage bays",
    ac: true,
    features: ["Pneumatic suspension", "Cabin-class seating", "Wi-Fi enabled", "Onboard refreshments", "Trained co-pilot", "Surveillance cameras"],
    pricePerKm: 62,
    pricePerDay: 22000,
    description:
      "The gold standard for premium group travel. Volvo's signature ride comfort across every kilometer of your route.",
  },
];

export const getVehiclesByCategory = (category: Vehicle["category"]) =>
  VEHICLES.filter((v) => v.category === category);

export const getVehicleById = (id: string) =>
  VEHICLES.find((v) => v.id === id);
