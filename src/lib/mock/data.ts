// Mock content used across the public marketing site.
// Replace with live data (Supabase queries) once business logic ships.

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: "Egypt" | "Domestic" | "International";
  tagline: string;
  image: string;
  toursCount: number;
};

export type Tour = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  region: "Egypt" | "Domestic" | "International";
  durationDays: number;
  priceFrom: number;
  rating: number;
  reviewsCount: number;
  image: string;
  highlights?: string[];
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatar: string;
  rating: number;
};

export type GalleryImage = { id: string; url: string; caption: string };

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const destinations: Destination[] = [
  { slug: "udupi-malpe", name: "Udupi & Malpe", country: "India", region: "Domestic",
    tagline: "Temple town mornings, St. Mary's Island afternoons", image: img("photo-1609609830354-8f615d61b9c8"), toursCount: 9 },
  { slug: "gokarna-murudeshwar", name: "Gokarna & Murudeshwar", country: "India", region: "Domestic",
    tagline: "Beach cliffs and the coast's tallest Shiva", image: img("photo-1621996346565-e3dbc646d9a9"), toursCount: 7 },
  { slug: "mangaluru", name: "Mangaluru", country: "India", region: "Domestic",
    tagline: "Tulu Nadu flavours, coastline and churches", image: img("photo-1590050752117-238cb0fb12b1"), toursCount: 6 },
  { slug: "chikkamagaluru-coorg", name: "Chikkamagaluru & Coorg", country: "India", region: "Domestic",
    tagline: "Coffee hills above the Karnataka coast", image: img("photo-1596386461350-326ccb383e9f"), toursCount: 8 },
  { slug: "kerala-backwaters", name: "Kerala Backwaters", country: "India", region: "Domestic",
    tagline: "Houseboats, Ayurveda and green silence", image: img("photo-1602216056096-3b40cc0c9944"), toursCount: 7 },
  { slug: "dubai-abu-dhabi", name: "Dubai & Abu Dhabi", country: "UAE", region: "International",
    tagline: "Skyline glamour and golden desert nights", image: img("photo-1512453979798-5ea266f8880c"), toursCount: 10 },
  { slug: "maldives", name: "Maldives", country: "Maldives", region: "International",
    tagline: "Overwater villas on a turquoise lagoon", image: img("photo-1514282401047-d79a71a590e8"), toursCount: 6 },
  { slug: "thailand", name: "Thailand", country: "Thailand", region: "International",
    tagline: "Bangkok buzz, Phuket sands, Krabi karsts", image: img("photo-1552465011-b4e21bf6e79a"), toursCount: 9 },
  { slug: "malaysia", name: "Malaysia", country: "Malaysia", region: "International",
    tagline: "Kuala Lumpur towers and Langkawi shores", image: img("photo-1596422846543-75c6fc197f07"), toursCount: 7 },
  { slug: "cairo-giza", name: "Cairo & Giza", country: "Egypt", region: "Egypt",
    tagline: "Where pharaohs still whisper", image: img("photo-1587474260584-136574528ed5"), toursCount: 8 },
  { slug: "luxor-aswan", name: "Luxor & Aswan", country: "Egypt", region: "Egypt",
    tagline: "Sail the river of civilizations", image: img("photo-1568322445389-f64ac2515020"), toursCount: 5 },
];

export const tours: Tour[] = [
  // --- Domestic: coastal Karnataka & neighbours ---
  { id: "t1", slug: "coastal-karnataka-signature", title: "Coastal Karnataka: Udupi, Malpe & Maravanthe",
    destination: "Udupi · Malpe · Maravanthe", region: "Domestic", durationDays: 5, priceFrom: 24900,
    rating: 4.9, reviewsCount: 186, image: img("photo-1609609830354-8f615d61b9c8"),
    highlights: ["Krishna Matha morning darshan", "St. Mary's Island boat ride", "Maravanthe coastal drive"], featured: true },
  { id: "t2", slug: "gokarna-murudeshwar-beach-trail", title: "Gokarna & Murudeshwar Beach Trail",
    destination: "Gokarna · Murudeshwar · Yana", region: "Domestic", durationDays: 4, priceFrom: 18900,
    rating: 4.8, reviewsCount: 142, image: img("photo-1621996346565-e3dbc646d9a9"),
    highlights: ["Om & Kudle beach hop", "Murudeshwar temple tower", "Yana rock formations"], featured: true },
  { id: "t3", slug: "mangaluru-heritage-and-cuisine", title: "Mangaluru Heritage & Coastal Cuisine",
    destination: "Mangaluru · Ullal · Kateel", region: "Domestic", durationDays: 3, priceFrom: 14900,
    rating: 4.7, reviewsCount: 98, image: img("photo-1590050752117-238cb0fb12b1"),
    highlights: ["Tulu Nadu food walk", "Panambur sunset", "Kudroli & Rosario heritage"] },
  { id: "t4", slug: "coffee-coast-chikkamagaluru", title: "Coffee & Coast: Chikkamagaluru to Udupi",
    destination: "Chikkamagaluru · Agumbe · Udupi", region: "Domestic", durationDays: 6, priceFrom: 32900,
    rating: 4.8, reviewsCount: 111, image: img("photo-1596386461350-326ccb383e9f"),
    highlights: ["Estate stay & coffee tasting", "Agumbe sunset point", "Sringeri & Horanadu temples"] },
  { id: "t5", slug: "karavali-temple-circuit", title: "Karavali Temple Circuit",
    destination: "Udupi · Kollur · Sringeri · Dharmasthala", region: "Domestic", durationDays: 4, priceFrom: 19900,
    rating: 4.9, reviewsCount: 164, image: img("photo-1621996346565-e3dbc646d9a9"),
    highlights: ["Kollur Mookambika darshan", "Dharmasthala visit", "Guided temple rituals"] },
  { id: "t6", slug: "kerala-backwaters-escape", title: "Kerala Backwaters & Munnar Escape",
    destination: "Alleppey · Munnar · Kochi", region: "Domestic", durationDays: 6, priceFrom: 38900,
    rating: 4.8, reviewsCount: 129, image: img("photo-1602216056096-3b40cc0c9944"),
    highlights: ["Private houseboat night", "Tea estate walk", "Kochi heritage evening"] },

  // --- International ---
  { id: "t7", slug: "dubai-abu-dhabi-luxury", title: "Dubai & Abu Dhabi Luxury Escape",
    destination: "Dubai · Abu Dhabi", region: "International", durationDays: 6, priceFrom: 94900,
    rating: 4.9, reviewsCount: 208, image: img("photo-1512453979798-5ea266f8880c"),
    highlights: ["Burj Khalifa At the Top", "Desert safari with dinner", "Sheikh Zayed Grand Mosque"], featured: true },
  { id: "t8", slug: "maldives-overwater-retreat", title: "Maldives Overwater Villa Retreat",
    destination: "Malé · North Atoll", region: "International", durationDays: 5, priceFrom: 139000,
    rating: 5.0, reviewsCount: 96, image: img("photo-1514282401047-d79a71a590e8"),
    highlights: ["Overwater villa", "Seaplane transfer", "Private sandbank dinner"], featured: true },
  { id: "t9", slug: "thailand-bangkok-phuket-krabi", title: "Thailand: Bangkok, Phuket & Krabi",
    destination: "Bangkok · Phuket · Krabi", region: "International", durationDays: 7, priceFrom: 82900,
    rating: 4.8, reviewsCount: 174, image: img("photo-1552465011-b4e21bf6e79a"),
    highlights: ["Phi Phi island cruise", "Bangkok temple tour", "Krabi four-island hop"] },
  { id: "t10", slug: "malaysia-kl-langkawi", title: "Malaysia: Kuala Lumpur & Langkawi",
    destination: "Kuala Lumpur · Langkawi", region: "International", durationDays: 6, priceFrom: 76900,
    rating: 4.7, reviewsCount: 118, image: img("photo-1596422846543-75c6fc197f07"),
    highlights: ["Petronas Towers", "Batu Caves", "Langkawi SkyCab & island tour"] },
  { id: "t11", slug: "singapore-malaysia-combo", title: "Malaysia & Singapore Twin Escape",
    destination: "Kuala Lumpur · Genting · Singapore", region: "International", durationDays: 8, priceFrom: 108900,
    rating: 4.7, reviewsCount: 84, image: img("photo-1596422846543-75c6fc197f07"),
    highlights: ["Genting Highlands", "Sentosa day pass", "Gardens by the Bay"] },

  // --- Egypt ---
  { id: "t12", slug: "pyramids-and-nile-signature", title: "Egypt Signature: Pyramids & Nile Cruise",
    destination: "Cairo · Luxor · Aswan", region: "Egypt", durationDays: 8, priceFrom: 152900,
    rating: 4.9, reviewsCount: 214, image: img("photo-1503177119275-0aa32b3a9368"),
    highlights: ["Giza plateau with Egyptologist", "Deluxe Nile cruise", "Valley of the Kings"], featured: true },
  { id: "t13", slug: "cairo-red-sea-getaway", title: "Cairo & Red Sea Getaway",
    destination: "Cairo · Hurghada", region: "Egypt", durationDays: 6, priceFrom: 118900,
    rating: 4.8, reviewsCount: 132, image: img("photo-1583212292454-1fe6229603b7"),
    highlights: ["Egyptian Museum", "Red Sea snorkelling", "Beach resort stay"] },
];

export const testimonials: Testimonial[] = [
  { id: "r1", name: "Ananya Shetty", location: "Udupi, Karnataka",
    quote: "Our coastal Karnataka trip was flawless — temples in the morning, Malpe sunsets in the evening, nothing left to chance.",
    avatar: img("photo-1494790108377-be9c29b29330", 200), rating: 5 },
  { id: "r2", name: "Rohit Menon", location: "Bengaluru, India",
    quote: "The Maldives villa and seaplane transfer were handled perfectly. Best-value luxury holiday we've booked.",
    avatar: img("photo-1500648767791-00dcc994a43e", 200), rating: 5 },
  { id: "r3", name: "Fatima Rahman", location: "Mangaluru, India",
    quote: "Egypt with SAS Travels was extraordinary — our Egyptologist guide made the Nile cruise unforgettable.",
    avatar: img("photo-1438761681033-6461ffad8d80", 200), rating: 5 },
];

export const galleryImages: GalleryImage[] = [
  { id: "g1", url: img("photo-1609609830354-8f615d61b9c8"), caption: "Malpe beach, Udupi" },
  { id: "g2", url: img("photo-1621996346565-e3dbc646d9a9"), caption: "Gokarna coastline" },
  { id: "g3", url: img("photo-1590050752117-238cb0fb12b1"), caption: "Mangaluru shores" },
  { id: "g4", url: img("photo-1596386461350-326ccb383e9f"), caption: "Chikkamagaluru coffee hills" },
  { id: "g5", url: img("photo-1602216056096-3b40cc0c9944"), caption: "Kerala backwaters" },
  { id: "g6", url: img("photo-1512453979798-5ea266f8880c"), caption: "Dubai skyline" },
  { id: "g7", url: img("photo-1514282401047-d79a71a590e8"), caption: "Maldives lagoon" },
  { id: "g8", url: img("photo-1552465011-b4e21bf6e79a"), caption: "Krabi, Thailand" },
  { id: "g9", url: img("photo-1596422846543-75c6fc197f07"), caption: "Kuala Lumpur skyline" },
  { id: "g10", url: img("photo-1503177119275-0aa32b3a9368"), caption: "Pyramids of Giza at dusk" },
  { id: "g11", url: img("photo-1568322445389-f64ac2515020"), caption: "Karnak Temple, Luxor" },
  { id: "g12", url: img("photo-1583212292454-1fe6229603b7"), caption: "Red Sea reefs" },
];

export const faqs = [
  { q: "How do I book a tour?", a: "Browse our tours, tap Book, and complete secure checkout. Our concierge follows up within 24 hours to confirm details." },
  { q: "Can I customize any itinerary?", a: "Absolutely. Every tour can be tailored — request a custom itinerary and we'll design a trip end-to-end." },
  { q: "What is your cancellation policy?", a: "Full refunds up to 30 days before departure, 50% within 14 days, and non-refundable within 7 days. Travel insurance is recommended." },
  { q: "Do you handle visas?", a: "Yes — our visa desk supports UAE, Thailand, Malaysia, Maldives and Egypt visas, including e-visas and consular guidance." },
  { q: "Are flights included?", a: "International flights are optional add-ons; domestic transfers and internal flights are included in every itinerary." },
  { q: "What safety measures do you follow?", a: "All partners are vetted annually. Guides are licensed, vehicles insured, and 24/7 support is available during your trip." },
];
