import type { Destination } from "@/types";

export const DESTINATIONS: Destination[] = [
  {
    id: "rajasthan",
    name: "Rajasthan",
    region: "Royal Desert State",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1600&auto=format&fit=crop",
    shortDescription:
      "Forts that touch the sky, palaces that hum with history, and the endless gold of the Thar. Rajasthan is theatre, written in stone.",
    longDescription: [
      "Rajasthan is North India at its most cinematic — amber forts rising over blue cities, palaces mirrored in still lakes, and camel trains threading the dunes at sunset. Every town has a story, and most of them involve a king.",
      "We plan the classic golden circuit — Jaipur, Jodhpur, Udaipur, Jaisalmer — at a pace that leaves room for the small things: a rooftop thali, a stepwell at dawn, a desert camp under a sky thick with stars. Our drivers know the long highway stretches and the safe night stops.",
    ],
    highlights: [
      "Sunset camel safari in the Thar dunes near Jaisalmer",
      "City Palace & Lake Pichola boat ride in Udaipur",
      "Amber Fort and the pink bazaars of Jaipur",
      "Blue-city rooftops beneath Mehrangarh, Jodhpur",
    ],
    locations: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Pushkar", "Mount Abu", "Bikaner"],
    bestTime: "Oct – Mar",
    duration: "6 – 10 Days",
    priceFrom: 34000,
  },
  {
    id: "himachal",
    name: "Himachal Pradesh",
    region: "Land of the Snowline",
    image: "https://images.unsplash.com/photo-1565459667879-4c7234fc4beb?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Pine forests, glacial rivers, and high mountain passes. The Himalayas at their most accessible and most cinematic.",
    longDescription: [
      "Himachal is the mountains made easy — apple orchards and deodar forests in the valleys, snow-dusted passes above, and a hill station around every bend. It is the Himalaya you can reach in a day's comfortable drive from Delhi.",
      "From the colonial charm of Shimla to the raw drama of Spiti, we match the route to your appetite for altitude. Mountain roads demand experience; our drivers have years of it, and our vehicles are serviced for the climbs.",
    ],
    highlights: [
      "Snow point excursions and Rohtang vistas near Manali",
      "Toy-train arrival and Mall Road evenings in Shimla",
      "Riverside cafés and pine trails in Kasol",
      "Monastery circuit through high-desert Spiti",
    ],
    locations: ["Manali", "Shimla", "Dharamshala", "Spiti", "Kasol", "Dalhousie", "Kullu"],
    bestTime: "Mar – Jun, Sep – Nov",
    duration: "5 – 8 Days",
    priceFrom: 28000,
  },
  {
    id: "jammu-kashmir",
    name: "Jammu & Kashmir",
    region: "Paradise on Earth",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Shikaras drifting on Dal Lake, meadows that stretch toward Pir Panjal, and apple orchards in October light.",
    longDescription: [
      "Kashmir earns its old name. Houseboats sit mirror-still on Dal Lake, gondolas glide through floating gardens, and meadows like Gulmarg and Sonmarg roll out toward snow peaks that feel close enough to touch.",
      "We handle the full valley — and, for the adventurous, the onward climb to Ladakh's moonscapes and high-altitude lakes. Permits, acclimatisation stops, and weather-aware scheduling are all part of how we plan it.",
    ],
    highlights: [
      "Overnight on a Dal Lake houseboat with a dawn shikara ride",
      "Gondola to the snow line at Gulmarg",
      "Alpine meadows and glaciers at Sonmarg & Pahalgam",
      "Optional Leh–Nubra extension across the high passes",
    ],
    locations: ["Srinagar", "Gulmarg", "Pahalgam", "Sonmarg", "Leh", "Nubra Valley"],
    bestTime: "Apr – Oct",
    duration: "7 – 10 Days",
    priceFrom: 42000,
  },
  {
    id: "char-dham",
    name: "Char Dham Yatra",
    region: "Sacred Pilgrimage Circuit",
    image: "https://images.unsplash.com/photo-1706790574525-d218c4c52b5c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Yamunotri, Gangotri, Kedarnath, Badrinath — the four abodes carved into Himalayan rock. A journey of devotion done with care.",
    longDescription: [
      "The Char Dham is the holiest circuit in the Garhwal Himalaya — Yamunotri, Gangotri, Kedarnath and Badrinath, four shrines set among snow peaks and the headwaters of sacred rivers. For many families it is the journey of a lifetime.",
      "It is also a demanding drive at altitude with long, winding days. We plan it gently — comfortable night halts, experienced hill drivers, on-call support, and timing that respects darshan hours and the weather windows.",
    ],
    highlights: [
      "Darshan at all four dhams with planned night halts",
      "Ganga Aarti on the ghats at Haridwar & Rishikesh",
      "Helicopter-assist options for Kedarnath on request",
      "Experienced hill drivers and 24×7 on-trip support",
    ],
    locations: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath", "Haridwar", "Rishikesh"],
    bestTime: "May – Jun, Sep – Oct",
    duration: "10 – 12 Days",
    priceFrom: 48000,
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    region: "Devbhoomi",
    image: "https://images.unsplash.com/photo-1650342518618-fdeaae0ef4f0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Where the Ganga begins, where forests breathe, and where every hill town carries the scent of cedar and snow.",
    longDescription: [
      "Uttarakhand is the gentler face of the Himalaya — lakeside towns, terraced ridgelines, tiger country in the Terai, and the yoga capital of the world on the banks of the Ganga.",
      "Whether it's a Nainital lake holiday, a Mussoorie ridge escape, a Corbett safari or skiing the slopes of Auli, we build a route that flows naturally between the hill stations without long, tiring days.",
    ],
    highlights: [
      "Boating and sunset at Naini Lake",
      "Ridge walks and cable car above Mussoorie",
      "Jungle safari for tigers at Jim Corbett",
      "Cable car to the ski meadows of Auli",
    ],
    locations: ["Nainital", "Mussoorie", "Auli", "Rishikesh", "Jim Corbett", "Ranikhet", "Almora"],
    bestTime: "Mar – Jun, Sep – Dec",
    duration: "5 – 7 Days",
    priceFrom: 24000,
  },
  {
    id: "agra-mathura",
    name: "Agra & Mathura",
    region: "Mughal Heritage Trail",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=80",
    shortDescription:
      "The Taj at dawn, Krishna's Vrindavan at dusk. A weekend that holds centuries of love and devotion.",
    longDescription: [
      "Two of India's most famous stories sit a short drive apart: the white-marble grief of the Taj Mahal, and the playful devotion of Krishna's Braj — Mathura, Vrindavan and Govardhan.",
      "It's the perfect long weekend from Delhi. We time the Taj for soft morning light, fit in Agra Fort and Fatehpur Sikri, then cross to the temple towns for the evening aarti — all without the usual queues and chaos.",
    ],
    highlights: [
      "Sunrise at the Taj Mahal, before the crowds",
      "Agra Fort and the ghost city of Fatehpur Sikri",
      "Evening aarti at Vrindavan's temples",
      "Parikrama and sweets at Govardhan & Mathura",
    ],
    locations: ["Agra", "Mathura", "Vrindavan", "Fatehpur Sikri", "Govardhan"],
    bestTime: "Oct – Mar",
    duration: "2 – 4 Days",
    priceFrom: 9500,
  },
];

export const getDestinationById = (id: string) =>
  DESTINATIONS.find((d) => d.id === id);
