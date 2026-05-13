import type { Route } from "@/types";

export const ROUTES: Route[] = [
  { id: "r1", source: "Delhi NCR", destination: "Manali", distanceKm: 540, estimatedHours: 12, popularStops: ["Chandigarh", "Bilaspur", "Mandi", "Kullu"] },
  { id: "r2", source: "Delhi NCR", destination: "Shimla", distanceKm: 365, estimatedHours: 8, popularStops: ["Karnal", "Ambala", "Solan"] },
  { id: "r3", source: "Delhi NCR", destination: "Rishikesh", distanceKm: 240, estimatedHours: 6, popularStops: ["Meerut", "Muzaffarnagar", "Haridwar"] },
  { id: "r4", source: "Delhi NCR", destination: "Jaipur", distanceKm: 280, estimatedHours: 5, popularStops: ["Gurugram", "Behror", "Shahpura"] },
  { id: "r5", source: "Delhi NCR", destination: "Agra", distanceKm: 230, estimatedHours: 4, popularStops: ["Faridabad", "Mathura", "Vrindavan"] },
  { id: "r6", source: "Delhi NCR", destination: "Nainital", distanceKm: 305, estimatedHours: 7, popularStops: ["Hapur", "Moradabad", "Haldwani"] },
  { id: "r7", source: "Delhi NCR", destination: "Srinagar", distanceKm: 870, estimatedHours: 18, popularStops: ["Jalandhar", "Jammu", "Patnitop"] },
  { id: "r8", source: "Delhi NCR", destination: "Mussoorie", distanceKm: 290, estimatedHours: 7, popularStops: ["Saharanpur", "Dehradun"] },
  { id: "r9", source: "Delhi NCR", destination: "Udaipur", distanceKm: 660, estimatedHours: 12, popularStops: ["Jaipur", "Ajmer", "Chittorgarh"] },
  { id: "r10", source: "Delhi NCR", destination: "Jaisalmer", distanceKm: 800, estimatedHours: 14, popularStops: ["Jaipur", "Jodhpur", "Pokhran"] },
  { id: "r11", source: "Delhi NCR", destination: "Haridwar", distanceKm: 215, estimatedHours: 5, popularStops: ["Meerut", "Muzaffarnagar", "Roorkee"] },
  { id: "r12", source: "Delhi NCR", destination: "Dharamshala", distanceKm: 480, estimatedHours: 10, popularStops: ["Chandigarh", "Una", "Kangra"] },
  { id: "r13", source: "Delhi NCR", destination: "Auli", distanceKm: 510, estimatedHours: 13, popularStops: ["Rishikesh", "Devprayag", "Joshimath"] },
  { id: "r14", source: "Delhi NCR", destination: "Mathura", distanceKm: 165, estimatedHours: 3, popularStops: ["Faridabad", "Palwal", "Kosi"] },
  { id: "r15", source: "Delhi NCR", destination: "Kasol", distanceKm: 525, estimatedHours: 12, popularStops: ["Chandigarh", "Mandi", "Bhuntar"] },
  { id: "r16", source: "Delhi NCR", destination: "Pushkar", distanceKm: 400, estimatedHours: 7, popularStops: ["Jaipur", "Kishangarh", "Ajmer"] },
];

export const SOURCES = ["Delhi NCR", "Noida", "Gurugram", "Faridabad", "Ghaziabad"] as const;

export const PRICING_PER_KM: Record<string, number> = {
  "Maruti Ertiga": 14,
  "Toyota Innova Crysta": 18,
  "Toyota Fortuner": 22,
  "Traveller 12 Seater": 26,
  "Traveller 20 Seater": 32,
  "Force Urbania": 38,
  "30-Seater Luxury Coach": 48,
  "45-Seater Volvo Coach": 62,
};
