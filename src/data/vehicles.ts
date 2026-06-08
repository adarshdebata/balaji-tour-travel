import type { Vehicle } from "@/types";

export const VEHICLES: Vehicle[] = [
  // SUVs
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    category: "suv",
    image: "https://images.unsplash.com/photo-1615887110697-0819ec23465f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1748215210939-ad8b6c8c086d?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://imgd.aeplcdn.com/370x208/n/c6es93a_1572125.jpg?q=80",
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
    image: "https://www.forcemotors.com/wp-content/uploads/2025/02/Traveller-4020WB-CNG-salient-new.png",
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
    image: "https://www.forcemotors.com/wp-content/uploads/2025/02/Traveller-Wider-Body-3350WB-salient-img.webp",
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
    image: "https://www.forcemotors.com/wp-content/uploads/2025/02/URBANIA-1.png",
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
    image: "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/9600_15m_sleeper_FR_01a_hires-nbg?qlt=82&wid=1440&ts=1659609410809&dpr=off&fit=constrain",
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
