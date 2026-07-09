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
  { slug: "cairo-giza", name: "Cairo & Giza", country: "Egypt", region: "Egypt",
    tagline: "Where pharaohs still whisper", image: img("photo-1539650116574-75c0c6d73f6e"), toursCount: 12 },
  { slug: "luxor", name: "Luxor", country: "Egypt", region: "Egypt",
    tagline: "The world's greatest open-air museum", image: img("photo-1568322445389-f64ac2515020"), toursCount: 8 },
  { slug: "aswan-nile", name: "Aswan & Nile", country: "Egypt", region: "Egypt",
    tagline: "Sail the river of civilizations", image: img("photo-1595837170697-79dccc99c1a1"), toursCount: 6 },
  { slug: "red-sea", name: "Red Sea", country: "Egypt", region: "Egypt",
    tagline: "Reefs, resorts, and sun-drenched escapes", image: img("photo-1544551763-46a013bb70d5"), toursCount: 9 },
  { slug: "santorini", name: "Santorini", country: "Greece", region: "International",
    tagline: "Whitewashed cliffs above an Aegean blue", image: img("photo-1570077188670-e3a8d69ac5ff"), toursCount: 5 },
  { slug: "kyoto", name: "Kyoto", country: "Japan", region: "International",
    tagline: "Temples, tea, and timeless craftsmanship", image: img("photo-1493976040374-85c8e12f0c0e"), toursCount: 7 },
  { slug: "marrakech", name: "Marrakech", country: "Morocco", region: "International",
    tagline: "Souks, spice, and desert stars", image: img("photo-1489749798305-4fea3ae63d43"), toursCount: 6 },
  { slug: "bali", name: "Bali", country: "Indonesia", region: "International",
    tagline: "Rice terraces, temples, tropical serenity", image: img("photo-1537996194471-e657df975ab4"), toursCount: 8 },
  { slug: "sinai-highlands", name: "Sinai Highlands", country: "Egypt", region: "Domestic",
    tagline: "Sunrise over sacred summits", image: img("photo-1524492412937-b28074a5d7da"), toursCount: 4 },
];

export const tours: Tour[] = [
  { id: "t1", slug: "pyramids-and-nile-signature", title: "Pyramids & Nile: The Signature 8-Day",
    destination: "Cairo · Luxor · Aswan", region: "Egypt", durationDays: 8, priceFrom: 2490,
    rating: 4.9, reviewsCount: 214, image: img("photo-1503177119275-0aa32b3a9368"),
    highlights: ["Private Giza plateau access", "Deluxe Nile cruise", "Egyptologist guide"], featured: true },
  { id: "t2", slug: "red-sea-liveaboard", title: "Red Sea Liveaboard & Reef Escape",
    destination: "Hurghada · Marsa Alam", region: "Egypt", durationDays: 6, priceFrom: 1890,
    rating: 4.8, reviewsCount: 132, image: img("photo-1583212292454-1fe6229603b7"),
    highlights: ["Overwater cabin", "Daily guided dives", "Chef-curated menu"], featured: true },
  { id: "t3", slug: "santorini-hidden-cyclades", title: "Santorini & the Hidden Cyclades",
    destination: "Santorini · Milos · Folegandros", region: "International", durationDays: 9, priceFrom: 3450,
    rating: 4.9, reviewsCount: 98, image: img("photo-1533105079780-92b9be482077"),
    highlights: ["Private catamaran", "Cliffside cave suites", "Winery tastings"], featured: true },
  { id: "t4", slug: "kyoto-tea-and-temples", title: "Kyoto: Tea, Temples & Craft",
    destination: "Kyoto · Nara · Osaka", region: "International", durationDays: 10, priceFrom: 4200,
    rating: 5.0, reviewsCount: 76, image: img("photo-1528360983277-13d401cdc186"),
    highlights: ["Ryokan overnight", "Private tea ceremony", "Artisan workshops"], featured: true },
  { id: "t5", slug: "marrakech-and-sahara", title: "Marrakech & Sahara Under the Stars",
    destination: "Marrakech · Merzouga", region: "International", durationDays: 7, priceFrom: 2190,
    rating: 4.7, reviewsCount: 154, image: img("photo-1489493585363-d69421e0edd3") },
  { id: "t6", slug: "bali-ubud-retreat", title: "Bali: Ubud Rice Terrace Retreat",
    destination: "Ubud · Uluwatu", region: "International", durationDays: 8, priceFrom: 2650,
    rating: 4.8, reviewsCount: 89, image: img("photo-1518548419970-58e3b4079ab2") },
  { id: "t7", slug: "sinai-summit-trek", title: "Sinai Summit Sunrise Trek",
    destination: "St. Catherine · Dahab", region: "Domestic", durationDays: 4, priceFrom: 780,
    rating: 4.6, reviewsCount: 61, image: img("photo-1516815231560-8f41ec531527") },
  { id: "t8", slug: "siwa-oasis-escape", title: "Siwa Oasis Desert Escape",
    destination: "Siwa Oasis", region: "Domestic", durationDays: 5, priceFrom: 990,
    rating: 4.7, reviewsCount: 44, image: img("photo-1502786129293-79981df4e689") },
];

export const testimonials: Testimonial[] = [
  { id: "r1", name: "Amelia Hart", location: "London, UK",
    quote: "The most seamless trip we've ever taken. Every detail — from the ryokan to the tea master — was flawless.",
    avatar: img("photo-1494790108377-be9c29b29330", 200), rating: 5 },
  { id: "r2", name: "Karim Nasser", location: "Dubai, UAE",
    quote: "Their Egypt itinerary showed us corners of Luxor no one else would think to include. Truly world-class.",
    avatar: img("photo-1500648767791-00dcc994a43e", 200), rating: 5 },
  { id: "r3", name: "Sofia Rinaldi", location: "Milan, Italy",
    quote: "The catamaran through the Cyclades was pure magic. I'll book with SAS Travels again and again.",
    avatar: img("photo-1438761681033-6461ffad8d80", 200), rating: 5 },
];

export const galleryImages: GalleryImage[] = [
  { id: "g1", url: img("photo-1503177119275-0aa32b3a9368"), caption: "Pyramids of Giza at dusk" },
  { id: "g2", url: img("photo-1533105079780-92b9be482077"), caption: "Oia sunset, Santorini" },
  { id: "g3", url: img("photo-1528360983277-13d401cdc186"), caption: "Fushimi Inari, Kyoto" },
  { id: "g4", url: img("photo-1583212292454-1fe6229603b7"), caption: "Red Sea reefs" },
  { id: "g5", url: img("photo-1489493585363-d69421e0edd3"), caption: "Sahara nights" },
  { id: "g6", url: img("photo-1518548419970-58e3b4079ab2"), caption: "Ubud rice terraces" },
  { id: "g7", url: img("photo-1568322445389-f64ac2515020"), caption: "Karnak Temple, Luxor" },
  { id: "g8", url: img("photo-1544551763-46a013bb70d5"), caption: "Red Sea coastline" },
  { id: "g9", url: img("photo-1524492412937-b28074a5d7da"), caption: "Sinai highlands sunrise" },
];

export const faqs = [
  { q: "How do I book a tour?", a: "Browse our tours, tap Book, and complete secure checkout. Our concierge follows up within 24 hours to confirm details." },
  { q: "Can I customize any itinerary?", a: "Absolutely. Every tour can be tailored — request a custom itinerary and we'll design a trip end-to-end." },
  { q: "What is your cancellation policy?", a: "Full refunds up to 30 days before departure, 50% within 14 days, and non-refundable within 7 days. Travel insurance is recommended." },
  { q: "Do you handle visas?", a: "Yes — our visa desk supports invitation letters, e-visas, and consular guidance for most destinations we operate." },
  { q: "Are flights included?", a: "International flights are optional add-ons; domestic transfers and internal flights are included in every itinerary." },
  { q: "What safety measures do you follow?", a: "All partners are vetted annually. Guides are licensed, vehicles insured, and 24/7 support is available during your trip." },
];
