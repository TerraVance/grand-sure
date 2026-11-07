export interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface SocialLink {
  id: string;
  label: string;
  handle?: string;
  href: string;
}

export interface OpeningHoursSpec {
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface BusinessInfo {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  siteUrl: string;
  address: Address;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  openingHours: OpeningHoursSpec[];
  areaServed: string[];
  mapsLink: string | null;
  mapsEmbedUrl: string | null;
  lat: number | null;
  lng: number | null;
  social: SocialLink[];
  isPlaceholderContact: boolean;
}

export interface PageCopy {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface HeroPath {
  title: string;
  summary: string;
  href: string;
  cta: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  highlight: string;
  subtext: string;
  primaryCta: string;
  secondaryCta: string;
  badges: string[];
  paths: HeroPath[];
}

export interface DiscoverItem {
  title: string;
  summary: string;
  href: string;
  cta: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export type ProductCategoryId =
  | "panels"
  | "inverters"
  | "batteries"
  | "mounting"
  | "heaters"
  | "accessories";

export interface ProductCategory {
  id: "all" | ProductCategoryId;
  label: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategoryId;
  summary: string;
  specs: ProductSpec[];
  image: string;
  imageAlt: string;
}

export interface Service {
  id: string;
  name: string;
  summary: string;
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  summary: string;
}

export interface SectionCopy {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
}

export interface CalculatorAssumptions {
  tariffPerKwh: number;
  peakSunHours: number;
  performanceRatio: number;
  systemCostPerKw: number;
  minKw: number;
}

export interface CalculatorContent extends SectionCopy {
  billLabel: string;
  defaultBill: number;
  minBill: number;
  maxBill: number;
  step: number;
  assumptions: CalculatorAssumptions;
}

export interface Benefit {
  id: string;
  title: string;
  summary: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  image: string;
  imageAlt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  detail: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteContent {
  business: BusinessInfo;
  hero: HeroContent;
  nav: NavLink[];
  discover: DiscoverItem[];
  stats: Stat[];
  statsSection: SectionCopy;
  products: Product[];
  categories: ProductCategory[];
  productsSection: SectionCopy;
  services: Service[];
  process: ProcessStep[];
  processSection: SectionCopy;
  calculator: CalculatorContent;
  benefits: Benefit[];
  benefitsSection: SectionCopy;
  gallery: GalleryItem[];
  gallerySection: SectionCopy;
  testimonials: Testimonial[];
  testimonialsSection: SectionCopy;
  faq: FaqItem[];
  faqSection: SectionCopy;
  contactSection: SectionCopy;
  footer: { blurb: string; enquireLabel: string; quoteCta: string; directionsLabel: string };
}
