import type { BusinessInfo, DiscoverItem, HeroContent, NavLink } from "@/types/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const business: BusinessInfo = {
  name: "Grand Sure",
  legalName: "Grand Sure",
  tagline: "Solar supply and installation",
  description:
    "Grand Sure supplies and installs solar panels, inverters, batteries, mounting structures, and solar water heaters for homes and businesses.",
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
  whatsapp: "+91 83082 71171",
  email: "grandsureelectrical1122@gmail.com",
  hours: "",
  mapsLink: "https://maps.app.goo.gl/3hckZvjJvqiFAFdZA",
  mapsEmbedUrl: "https://www.google.com/maps?q=20.3388829,76.2626542&z=17&output=embed",
  lat: 20.3388829,
  lng: 76.2626542,
  social: [
    { id: "instagram", label: "Instagram", href: "" },
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
    "Grand Sure designs, supplies, and installs panels, inverters, batteries, and water heaters for homes and businesses.",
  primaryCta: "Get a quote",
  secondaryCta: "View equipment",
  badges: ["25-year panel warranty", "Site survey before you buy", "Local installation crew"],
  paths: [
    {
      title: "Homeowners",
      summary: "A rooftop system sized to your electricity bill, with a survey before anything is sold.",
      href: "#contact",
      cta: "Request a home quote",
    },
    {
      title: "Businesses",
      summary: "Systems for sheds, workshops, and housing-society terraces, designed around how the building uses electricity.",
      href: "#gallery",
      cta: "See project types",
    },
    {
      title: "Equipment",
      summary: "Panels, hybrid inverters, batteries, mounting, and solar water heaters supplied as a matched set.",
      href: "#products",
      cta: "Browse equipment",
    },
  ],
};

export const nav: NavLink[] = [
  { href: "#products", label: "Equipment" },
  { href: "#gallery", label: "Projects" },
  { href: "#how-it-works", label: "Process" },
  { href: "#why-us", label: "Company" },
  { href: "#contact", label: "Contact" },
];

export const discover: DiscoverItem[] = [
  {
    title: "Equipment",
    summary: "Panels, inverters, batteries, mounting, and water heaters.",
    href: "#products",
    cta: "Learn more",
  },
  {
    title: "How a project runs",
    summary: "Survey, design, installation, and support, in that order.",
    href: "#how-it-works",
    cta: "Learn more",
  },
  {
    title: "Savings estimate",
    summary: "A first look at system size from your monthly bill.",
    href: "#savings",
    cta: "Learn more",
  },
  {
    title: "Projects",
    summary: "Homes, sheds, terraces, water heating, and backup.",
    href: "#gallery",
    cta: "Learn more",
  },
  {
    title: "Owners",
    summary: "What people say after the system has been running.",
    href: "#testimonials",
    cta: "Learn more",
  },
  {
    title: "Questions",
    summary: "Cost, roofs, outages, metering, warranty, and timing.",
    href: "#faq",
    cta: "Learn more",
  },
];
