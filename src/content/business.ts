import type { BusinessInfo, DiscoverItem, HeroContent, NavLink, PageCopy } from "@/types/content";

import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const business: BusinessInfo = {
  name: "Grand Sure Electricals",
  legalName: "Grand Sure Electricals",
  tagline: "Solar supply and installation in Chikhli",
  description:
    "Grand Sure Electricals in Chikhli supplies and installs solar panels, inverters, batteries, mounting structures, and solar water heaters for homes and businesses.",
  siteUrl,
  address: {
    line1: "Khedekar Complex",
    line2: "Jafrabad Chaufully",
    city: "Chikhli",
    state: "Maharashtra",
    postalCode: "443201",
    country: "India",
  },
  phone: "+91 83082 71171",
  whatsapp: "https://wa.me/message/W3K5YTFTYEVUL1",
  email: "grandsureelectrical1122@gmail.com",
  hours: "Mon–Sat 9:00 AM – 7:00 PM; Sunday closed",
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  areaServed: ["Chikhli", "Buldhana", "Maharashtra"],
  mapsLink: "https://maps.app.goo.gl/3hckZvjJvqiFAFdZA",
  mapsEmbedUrl: "https://www.google.com/maps?q=20.3388829,76.2626542&z=17&output=embed",
  lat: 20.3388829,
  lng: 76.2626542,
  social: [
    {
      id: "instagram",
      label: "Instagram",
      handle: "@grandsureelectricals",
      href: "https://www.instagram.com/grandsureelectricals",
    },
    { id: "facebook", label: "Facebook", href: "" },
    { id: "youtube", label: "YouTube", href: "" },
  ],
  isPlaceholderContact: false,
};

export const hero: HeroContent = {
  eyebrow: "Solar for homes and businesses",
  headline: "Powered by",
  highlight: "the sun",
  subtext:
    "Grand Sure Electricals designs, supplies, and installs panels, inverters, batteries, and water heaters for homes and businesses in Chikhli.",
  primaryCta: "Get a quote",
  secondaryCta: "View equipment",
  badges: ["25-year panel warranty", "Site survey before you buy", "Local installation crew"],
  paths: [
    {
      title: "Homeowners",
      summary: "A rooftop system sized to your electricity bill, with a survey before anything is sold.",
      href: "/contact",
      cta: "Request a home quote",
    },
    {
      title: "Businesses",
      summary: "Systems for sheds, workshops, and housing-society terraces, designed around how the building uses electricity.",
      href: "/solar-installation-chikhli",
      cta: "See installation services",
    },
    {
      title: "Equipment",
      summary: "Panels, hybrid inverters, batteries, mounting, and solar water heaters supplied as a matched set.",
      href: "/#products",
      cta: "Browse equipment",
    },
  ],
};

export const nav: NavLink[] = [
  { href: "/solar-installation-chikhli", label: "Services" },
  { href: "/#products", label: "Equipment" },
  { href: "/#gallery", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const discover: DiscoverItem[] = [
  {
    title: "Solar installation in Chikhli",
    summary: "Survey, design, and installation for homes and businesses nearby.",
    href: "/solar-installation-chikhli",
    cta: "View services",
  },
  {
    title: "Equipment",
    summary: "Panels, inverters, batteries, mounting, and water heaters.",
    href: "/#products",
    cta: "Browse equipment",
  },
  {
    title: "About Grand Sure",
    summary: "A local crew that stays available after the install.",
    href: "/about",
    cta: "About us",
  },
  {
    title: "Projects",
    summary: "Homes, sheds, terraces, water heating, and backup.",
    href: "/#gallery",
    cta: "See projects",
  },
  {
    title: "Savings estimate",
    summary: "A first look at system size from your monthly bill.",
    href: "/#savings",
    cta: "Try the calculator",
  },
  {
    title: "Contact",
    summary: "Request a site survey by form, phone, or WhatsApp.",
    href: "/contact",
    cta: "Get in touch",
  },
];

export const aboutPage: PageCopy = {
  title: "About Grand Sure Electricals in Chikhli",
  description:
    "Grand Sure Electricals supplies and installs solar panels, inverters, batteries, and water heaters from Khedekar Complex, Chikhli, Maharashtra.",
  eyebrow: "About us",
  headline: "A solar crew based in Chikhli",
  intro:
    "Grand Sure Electricals designs, supplies, and installs solar systems for homes and businesses around Chikhli and Buldhana. We start with a site survey, match the equipment to the roof, and stay reachable after commissioning.",
};

export const servicesPage: PageCopy = {
  title: "Solar Installation in Chikhli | Grand Sure Electricals",
  description:
    "Solar panel installation in Chikhli for homes and businesses. Site survey, system design, supply, installation, and support from Grand Sure Electricals.",
  eyebrow: "Services in Chikhli",
  headline: "Solar installation for roofs in Chikhli",
  intro:
    "From the first site visit to commissioning, Grand Sure Electricals handles supply and installation of panels, inverters, batteries, mounting, and solar water heaters in Chikhli and nearby areas.",
};

export const contactPage: PageCopy = {
  title: "Contact Grand Sure Electricals | Chikhli",
  description:
    "Contact Grand Sure Electricals in Chikhli for a free solar site survey. Call, WhatsApp, or send a quote request from Khedekar Complex, Jafrabad Chaufully.",
  eyebrow: "Contact",
  headline: "Talk to us about your roof",
  intro:
    "Share a few details and we will reply with a survey time. You can also call or message us on WhatsApp.",
};
