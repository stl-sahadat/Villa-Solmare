// Villa Solmare Configuration (1:1 Architectural Schema & Dynamic Sync)
import siteConfig from "@/data/site-config.json";

export const villa = {
  site: {
    url: siteConfig.site.url || "https://villa-solmare.example.com",
    name: siteConfig.site.name || "Villa Solmare",
    title: siteConfig.site.title || "Villa Solmare — Clifftop Coastal Sanctuary | Bay of Bengal, Bangladesh",
    description: siteConfig.site.description || "An ultra-luxury coastal stone sanctuary with panoramic Bay of Bengal views, private terrace, four bedroom suites and tropical garden, 300 metres from Inani Beach. Sleeps 8.",
    ogImage: "/og.jpg",
    lang: siteConfig.site.lang || "en",
    theme: "system",
  },
  legal: {
    cin: "",
    owner: siteConfig.owner.name || "Md Sahadat Hossain",
    privacyUrl: "/privacy/",
  },
  contact: {
    phone: siteConfig.owner.phone || "+880 19XX-XXXXXX",
    whatsapp: siteConfig.owner.whatsapp || "8801900000000",
    whatsappDisplay: siteConfig.owner.phone || "+880 19XX-XXXXXX",
    email: siteConfig.owner.email || "sahadat.xxxx@gmail.com",
    instagram: siteConfig.owner.instagram || "stlsahadat",
    address: {
      street: siteConfig.owner.street || "Barura",
      city: siteConfig.owner.city || "Comilla",
      region: "Chittagong",
      postalCode: "3500",
      country: "BD",
      countryName: siteConfig.owner.country || "Bangladesh",
    },
    geo: { lat: 23.3739, lng: 91.0558 },
    coordinates: `${siteConfig.owner.street}, ${siteConfig.owner.city}, ${siteConfig.owner.country}`,
    mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(`${siteConfig.owner.street}, ${siteConfig.owner.city}, ${siteConfig.owner.country}`)}`,
  },
  booking: {
    priceFrom: siteConfig.booking.priceFrom || 85000,
    currency: siteConfig.booking.currency || "BDT",
    maxGuests: siteConfig.booking.maxGuests || 8,
    minNights: siteConfig.booking.minNights || 2,
    checkIn: siteConfig.booking.checkIn || "15:00",
    checkOut: siteConfig.booking.checkOut || "11:00",
    endpoint: "",
  },
  rooms: {
    bedrooms: 4,
    bathrooms: 3,
    sqm: 260,
    guests: siteConfig.booking.maxGuests || 8,
  },
  media: {
    arrival: {
      dir: "/media/arrival",
      fps: 12,
      frames: 64,
      formats: ["avif"],
      desktop: [{ dir: "d1920", width: 1920, height: 1080 }],
      mobile: { dir: "m", width: 606, height: 1080 },
    },
    walk: {
      dir: "/media/walk",
      fps: 12,
      frames: 192,
      formats: ["avif"],
      desktop: [{ dir: "d1920", width: 1920, height: 1080 }],
      mobile: { dir: "m", width: 606, height: 1080 },
    },
    sunset: {
      dir: "/media/sunset",
      desktop: { width: 1920, height: 1080, webm: false, mp4: true },
      mobile: { width: 606, height: 1080, webm: false, mp4: true },
      posterFormats: ["avif", "webp"],
    },
  },
  arrival: {
    eyebrow: siteConfig.arrival.eyebrow || "স্বাগতম — Welcome",
    tagline: siteConfig.arrival.tagline || "A stone sanctuary above the sea, on the scenic southern coast of Bangladesh.",
    hint: siteConfig.arrival.hint || "Scroll to arrive",
    screens: 2.2,
    alt: "The arched front door of the villa, open, framed by bougainvillea and tropical greenery, with the sea behind",
  },
  intro: {
    id: "the-house",
    index: "01",
    label: "The house",
    heading: siteConfig.intro.heading || "Two centuries of architectural heritage, restored for quiet luxury by the sea.",
    photo: "terrazza",
    text: siteConfig.intro.text || "Villa Solmare stands on the coastal clifftops overlooking the Bay of Bengal. Today it has four luxury bedroom suites, three artisanal bathrooms and an expansive terrace facing west, so every evening ends with the golden sun setting into the ocean.",
    facts: siteConfig.intro.facts || [
      { value: 8, label: "Guests" },
      { value: 4, label: "Bedrooms" },
      { value: 3, label: "Bathrooms" },
      { value: 260, label: "Square metres" },
      { value: 300, label: "Metres to the beach" },
    ],
  },
  walk: {
    id: "inside",
    index: "02",
    label: "Inside",
    screens: 4,
    alt: "A walk through the living room, the kitchen and into the main bedroom",
    rooms: siteConfig.walk.rooms || [
      { from: 0, to: 0.3, name: "The living room", italian: "লিভিং লাউঞ্জ", text: "Linen sofas, hand-carved stone hearth and timber beams overhead. An arch leads straight into the kitchen." },
      { from: 0.3, to: 0.66, name: "The kitchen", italian: "রসুইঘর", text: "Artisanal hand-painted tiles, brass cookware and a long solid wood table, with a bowl of fresh citrus from the coastal garden." },
      { from: 0.66, to: 1.01, name: "The main bedroom", italian: "মাস্টার স্যুট", text: "A linen canopy bed and French windows opening onto the terrace overlooking the Bay of Bengal. It is one of four bedrooms." },
    ],
    showAll: "Show all photos",
    photosCount: (e: number) => `${e} photos`,
  },
  photos: [
    { name: "ingresso", alt: "The arched front door, framed by bougainvillea, with the sea behind" },
    { name: "soggiorno", alt: "The living room, opening onto the kitchen through an arch" },
    { name: "soggiorno-2", alt: "The kitchen and its long dining table, seen through the arch" },
    { name: "cucina", alt: "The kitchen table with fresh tropical fruit and brass cookware" },
    { name: "cucina-2", alt: "The cooker under artisanal tiles, with the bedroom visible through the doorway" },
    { name: "camera", alt: "The main bedroom, with a linen canopy bed and French windows open to the sea" },
    { name: "camera-2", alt: "The canopy bed and the open French windows of the main bedroom" },
    { name: "terrazza", alt: "Sun loungers on the terrace outside the bedroom, above the bay" },
    { name: "tramonto", alt: "The terrace at sunset, overlooking the Bay of Bengal" },
  ],
  details: {
    id: "amenities",
    index: "03",
    label: "What's here",
    heading: "Everything you need, nothing you don't.",
    amenities: siteConfig.amenities,
    area: {
      heading: siteConfig.area.heading || "Around the house",
      text: siteConfig.area.text || "The villa stands at the end of a private lane above Inani Beach, framed by lush coastal greenery and minutes from the ocean.",
      places: siteConfig.area.places || [
        { name: "Inani Coral Beach", minutes: 4, by: "on foot" },
        { name: "Marine Drive Jetty", minutes: 8, by: "by car" },
        { name: "Himchari Eco Park & Trails", minutes: 12, by: "by car" },
        { name: "Cox's Bazar Airport", minutes: 35, by: "by car" },
      ],
      minutes: "min",
      openMaps: "Open in Google Maps",
    },
  },
  guests: {
    id: "guests",
    index: "04",
    label: "Guests",
    heading: siteConfig.guests.heading || "What our guests remember.",
    rating: siteConfig.guests.rating || "4.98",
    count: siteConfig.guests.count || "142 reviews",
    source: siteConfig.guests.source || "from stays booked direct and through luxury travel partners",
    nights: (e: any) => `${e} nights`,
    items: siteConfig.guests.items || [],
  },
  book: {
    id: "stay",
    index: "05",
    label: "Stay",
    eyebrow: "সন্ধ্যা — Sunset",
    heading: "Stay for the sunset.",
    text: "Tell us your dates. We reply within 24 hours with availability and the exact price in Bangladeshi Taka.",
    alt: "From the main bedroom, through the open French windows, onto the terrace at sunset, with coastal palms above the sea",
    perNight: "night",
    fields: {
      arrival: "Check-in",
      departure: "Checkout",
      guests: "Guests",
      name: "Name",
      email: "Email",
      message: "Anything we should know? (optional)",
      consent: "I agree to my details being used to answer this request.",
      privacy: "Privacy notice",
    },
    guestsOption: (e: any) => `${e} ${1 === e ? "guest" : "guests"}`,
    nights: (e: any) => `${e} ${1 === e ? "night" : "nights"}`,
    estimateLabel: (e: any, t: any) => `${t} × ${e}`,
    estimateTotal: "Estimated total",
    estimateNote: "Cleaning, breakfast and hospitality services are confirmed in our reply.",
    minNightsNote: (e: any) => `The minimum stay is ${e} nights.`,
    submit: "Request to book",
    noCharge: "You won't be charged yet.",
    sending: "Sending…",
    sent: "Request sent. We'll reply within 24 hours.",
    mailOpened: "Your email app has opened with the request filled in. Press Send there to finish.",
    errors: {
      dates: "Choose a checkout date after the check-in date.",
      network: "The request didn't go through. Check your connection and try again, or email us at",
    },
  },
  faq: {
    id: "questions",
    index: "06",
    label: "Questions",
    heading: siteConfig.faq.heading || "Before you ask.",
    items: siteConfig.faq.items || [],
  },
  ui: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    book: "Check dates",
    from: "From",
    perNight: "night",
    replay: "Play again",
    loading: "Loading the footage",
    day: "Day",
    night: "Night",
    theme: "Switch between day and night",
    sections: "Sections",
    minStay: (e: number) => `Minimum ${e} nights`,
    pause: "Pause the reviews",
    play: "Play the reviews",
  },
  footer: {
    contact: "Contact",
    address: "Address",
    rights: "All rights reserved.",
    note: "",
    credit: {
      label: "Architectural Design by Sahadat",
      href: "https://www.instagram.com/stlsahadat/",
    },
  },
  notFound: {
    title: "Page not found",
    index: "404",
    heading: "This door doesn't lead anywhere.",
    text: "The page you were looking for doesn't exist or has moved.",
    back: "Back to the villa",
  },
  privacy: {
    title: "Privacy notice",
    description: "How Villa Solmare handles the details you send with a booking request.",
  },
};

export const navigation = [
  { href: `#${villa.intro.id}`, label: villa.intro.label, still: "ingresso" },
  { href: `#${villa.walk.id}`, label: villa.walk.label, still: "soggiorno" },
  { href: `#${villa.details.id}`, label: villa.details.label, still: "cucina" },
  { href: `#${villa.guests.id}`, label: villa.guests.label, still: "camera" },
  { href: `#${villa.book.id}`, label: villa.book.label, still: "tramonto" },
];

export interface VillaAmenity {
  icon: string;
  label: string;
  description?: string;
}

export interface TravelDestination {
  id: string;
  destination: string;
  distanceKm: string;
  minutes: number;
  travelMethod: string;
}

export interface GuestReview {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  content: string;
  verified: boolean;
  stayDuration: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  aspectRatio: string;
}

export const SOLMARE_CONFIG = {
  ...villa,
  name: villa.site.name,
  rates: {
    basePricePerNight: villa.booking.priceFrom,
    cleaningFee: 0,
    cityTaxPerGuestNight: 0,
    minStayNights: villa.booking.minNights,
  },
  stats: {
    guests: { value: villa.rooms.guests, label: "Guests" },
    bedrooms: { value: villa.rooms.bedrooms, label: "Bedrooms" },
    bathrooms: { value: villa.rooms.bathrooms, label: "Bathrooms" },
    sqm: { value: villa.rooms.sqm, label: "Square metres", suffix: "m²" },
    beachDistance: { value: 300, label: "Metres to beach", suffix: "m" },
  },
  cin: villa.legal.cin,
  coordinates: {
    display: villa.contact.coordinates,
    lat: villa.contact.geo.lat,
    lng: villa.contact.geo.lng,
  },
  story: {
    eyebrow: "The Architecture",
    headline: villa.intro.heading,
    paragraphs: [villa.intro.text],
  },
  rooms: villa.walk.rooms.map((r: any, idx: number) => ({
    id: `room-${idx}`,
    name: r.name,
    italian: r.italian,
    description: r.text,
    photo: `/media/${villa.photos[idx]?.name || "soggiorno"}-1600.webp`,
    from: r.from,
    to: r.to,
  })),
  gallery: villa.photos.map((p: any, idx: number) => ({
    id: `photo-${idx}`,
    src: `/media/${p.name}-1600.webp`,
    alt: p.alt,
    title: p.name.charAt(0).toUpperCase() + p.name.slice(1).replace("-", " "),
    category: idx < 3 ? "Living Spaces" : idx < 6 ? "Culinary & Dining" : "Terraces & Views",
    aspectRatio: idx % 5 === 0 ? "wide" : "portrait",
  })),
  amenities: {
    inside: villa.details.amenities[0].items.map((i: any) => ({ ...i, description: i.label })),
    outside: villa.details.amenities[1].items.map((i: any) => ({ ...i, description: i.label })),
    onRequest: villa.details.amenities[2].items.map((i: any) => ({ ...i, description: i.label })),
  },
  travel: villa.details.area.places.map((p: any, idx: number) => ({
    id: `dest-${idx}`,
    destination: p.name,
    distanceKm: (p.minutes * 0.8).toFixed(1),
    minutes: p.minutes,
    travelMethod: p.by,
  })),
  reviews: {
    overallRating: parseFloat(villa.guests.rating),
    totalReviews: parseInt(villa.guests.count),
    laneA: villa.guests.items.slice(0, Math.ceil(villa.guests.items.length / 2)).map((r: any, i: number) => ({
      id: `rev-a-${i}`,
      author: r.author,
      location: r.from,
      date: r.when,
      rating: 5,
      content: r.quote,
      verified: true,
      stayDuration: `${r.nights} nights`,
    })),
    laneB: villa.guests.items.slice(Math.ceil(villa.guests.items.length / 2)).map((r: any, i: number) => ({
      id: `rev-b-${i}`,
      author: r.author,
      location: r.from,
      date: r.when,
      rating: 5,
      content: r.quote,
      verified: true,
      stayDuration: `${r.nights} nights`,
    })),
  },
  faqs: villa.faq.items.map((f: any, idx: number) => ({
    id: `faq-${idx}`,
    question: f.q,
    answer: f.a,
  })),
};
