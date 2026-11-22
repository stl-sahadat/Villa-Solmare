/**
 * Villa Solmare — Domain Type Definitions
 * Strictly typed interfaces for all architectural villa entities.
 */

export interface VillaGeoLocation {
  lat: number;
  lng: number;
}

export interface VillaAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  countryName: string;
}

export interface VillaSiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  lang: string;
  theme: "system" | "light" | "dark";
}

export interface VillaLegalConfig {
  cin: string;
  owner: string;
  privacyUrl: string;
}

export interface VillaContactConfig {
  phone: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  instagram: string;
  address: VillaAddress;
  geo: VillaGeoLocation;
  coordinates: string;
  mapsUrl: string;
}

export interface VillaBookingConfig {
  priceFrom: number;
  currency: string;
  maxGuests: number;
  minNights: number;
  checkIn: string;
  checkOut: string;
  endpoint: string;
}

export interface VillaRoomsConfig {
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  guests: number;
}

export interface MediaResolution {
  dir: string;
  width: number;
  height: number;
}

export interface SunsetVideoConfig {
  width: number;
  height: number;
  webm: boolean;
  mp4: boolean;
}

export interface VillaMediaConfig {
  arrival: {
    dir: string;
    fps: number;
    frames: number;
    formats: readonly string[];
    desktop: readonly MediaResolution[];
    mobile: MediaResolution;
  };
  walk: {
    dir: string;
    fps: number;
    frames: number;
    formats: readonly string[];
    desktop: readonly MediaResolution[];
    mobile: MediaResolution;
  };
  sunset: {
    dir: string;
    desktop: SunsetVideoConfig;
    mobile: SunsetVideoConfig;
    posterFormats: readonly string[];
  };
}

export interface VillaArrivalSection {
  eyebrow: string;
  tagline: string;
  hint: string;
  screens: number;
  alt: string;
}

export interface VillaFact {
  value: number;
  label: string;
}

export interface VillaIntroSection {
  id: string;
  index: string;
  label: string;
  heading: string;
  photo: string;
  text: string;
  facts: readonly VillaFact[];
}

export interface VillaWalkRoom {
  from: number;
  to: number;
  name: string;
  italian: string;
  text: string;
}

export interface VillaWalkSection {
  id: string;
  index: string;
  label: string;
  screens: number;
  alt: string;
  rooms: readonly VillaWalkRoom[];
  showAll: string;
  photosCount: (count: number) => string;
}

export interface VillaPhoto {
  name: string;
  alt: string;
}

export interface VillaAmenityItem {
  icon: string;
  label: string;
  description?: string;
}

export interface VillaAmenityGroup {
  group: string;
  photo: string;
  items: readonly VillaAmenityItem[];
}

export interface VillaAreaPlace {
  name: string;
  minutes: number;
  by: string;
}

export interface VillaAreaSection {
  heading: string;
  text: string;
  places: readonly VillaAreaPlace[];
  minutes: string;
  openMaps: string;
}

export interface VillaDetailsSection {
  id: string;
  index: string;
  label: string;
  heading: string;
  amenities: readonly VillaAmenityGroup[];
  area: VillaAreaSection;
}

export interface VillaGuestReviewItem {
  author: string;
  from: string;
  when: string;
  nights: number;
  quote: string;
}

export interface VillaGuestsSection {
  id: string;
  index: string;
  label: string;
  heading: string;
  rating: string;
  count: string;
  source: string;
  nights: (count: number) => string;
  items: readonly VillaGuestReviewItem[];
}

export interface VillaBookFields {
  arrival: string;
  departure: string;
  guests: string;
  name: string;
  email: string;
  message: string;
  consent: string;
  privacy: string;
}

export interface VillaBookSection {
  id: string;
  index: string;
  label: string;
  eyebrow: string;
  heading: string;
  text: string;
  alt: string;
  perNight: string;
  fields: VillaBookFields;
  guestsOption: (count: number) => string;
  nights: (count: number) => string;
  estimateLabel: (nightsText: string, rateText: string) => string;
  estimateTotal: string;
  estimateNote: string;
  minNightsNote: (min: number) => string;
  submit: string;
  noCharge: string;
  sending: string;
  sent: string;
  mailOpened: string;
  errors: {
    dates: string;
    network: string;
  };
}

export interface VillaFaqItem {
  q: string;
  a: string;
}

export interface VillaFaqSection {
  id: string;
  index: string;
  label: string;
  heading: string;
  items: readonly VillaFaqItem[];
}

export interface VillaUIStrings {
  skip: string;
  menu: string;
  close: string;
  book: string;
  from: string;
  perNight: string;
  replay: string;
  loading: string;
  day: string;
  night: string;
  theme: string;
  sections: string;
  minStay: (nights: number) => string;
  pause: string;
  play: string;
}

export interface VillaFooterConfig {
  contact: string;
  address: string;
  rights: string;
  note: string;
  credit: {
    label: string;
    href: string;
  };
}

export interface VillaConfig {
  site: VillaSiteConfig;
  legal: VillaLegalConfig;
  contact: VillaContactConfig;
  booking: VillaBookingConfig;
  rooms: VillaRoomsConfig;
  media: VillaMediaConfig;
  arrival: VillaArrivalSection;
  intro: VillaIntroSection;
  walk: VillaWalkSection;
  photos: readonly VillaPhoto[];
  details: VillaDetailsSection;
  guests: VillaGuestsSection;
  book: VillaBookSection;
  faq: VillaFaqSection;
  ui: VillaUIStrings;
  footer: VillaFooterConfig;
  notFound: {
    title: string;
    index: string;
    heading: string;
    text: string;
    back: string;
  };
  privacy: {
    title: string;
    description: string;
  };
}
