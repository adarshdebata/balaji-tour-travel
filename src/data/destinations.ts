import type { Destination } from "@/types";

export const DESTINATIONS: Destination[] = [
  {
    id: "rajasthan",
    name: "Rajasthan",
    region: "Royal Desert State",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1600&auto=format&fit=crop",
    shortDescription:
      "Forts that touch the sky, palaces that hum with history, and the endless gold of the Thar. Rajasthan is theatre, written in stone.",
    locations: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Pushkar", "Mount Abu", "Bikaner"],
    bestTime: "Oct – Mar",
    duration: "6 – 10 Days",
  },
  {
    id: "himachal",
    name: "Himachal Pradesh",
    region: "Land of the Snowline",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80",
    shortDescription:
      "Pine forests, glacial rivers, and high mountain passes. The Himalayas at their most accessible and most cinematic.",
    locations: ["Manali", "Shimla", "Dharamshala", "Spiti", "Kasol", "Dalhousie", "Kullu"],
    bestTime: "Mar – Jun, Sep – Nov",
    duration: "5 – 8 Days",
  },
  {
    id: "jammu-kashmir",
    name: "Jammu & Kashmir",
    region: "Paradise on Earth",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600&auto=format&fit=crop",
    shortDescription:
      "Shikaras drifting on Dal Lake, meadows that stretch toward Pir Panjal, and apple orchards in October light.",
    locations: ["Srinagar", "Gulmarg", "Pahalgam", "Sonmarg", "Leh", "Nubra Valley"],
    bestTime: "Apr – Oct",
    duration: "7 – 10 Days",
  },
  {
    id: "char-dham",
    name: "Char Dham Yatra",
    region: "Sacred Pilgrimage Circuit",
    image: "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?w=1600&q=80",
    shortDescription:
      "Yamunotri, Gangotri, Kedarnath, Badrinath — the four abodes carved into Himalayan rock. A journey of devotion done with care.",
    locations: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath", "Haridwar", "Rishikesh"],
    bestTime: "May – Jun, Sep – Oct",
    duration: "10 – 12 Days",
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    region: "Devbhoomi",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80",
    shortDescription:
      "Where the Ganga begins, where forests breathe, and where every hill town carries the scent of cedar and snow.",
    locations: ["Nainital", "Mussoorie", "Auli", "Rishikesh", "Jim Corbett", "Ranikhet", "Almora"],
    bestTime: "Mar – Jun, Sep – Dec",
    duration: "5 – 7 Days",
  },
  {
    id: "agra-mathura",
    name: "Agra & Mathura",
    region: "Mughal Heritage Trail",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=80",
    shortDescription:
      "The Taj at dawn, Krishna's Vrindavan at dusk. A weekend that holds centuries of love and devotion.",
    locations: ["Agra", "Mathura", "Vrindavan", "Fatehpur Sikri", "Govardhan"],
    bestTime: "Oct – Mar",
    duration: "2 – 4 Days",
  },
];

export const getDestinationById = (id: string) =>
  DESTINATIONS.find((d) => d.id === id);
