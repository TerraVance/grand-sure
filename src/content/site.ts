import type {
  Benefit,
  CalculatorContent,
  FaqItem,
  GalleryItem,
  ProcessStep,
  SectionCopy,
  Stat,
  Testimonial,
} from "@/types/content";

export const statsSection: SectionCopy = {
  id: "stats",
  eyebrow: "Track record",
  title: "Numbers from installed roofs",
  intro: "We install reliable solar on roofs that can use it, and we remain available after installation.",
};

export const stats: Stat[] = [
  { id: "installations", label: "Installations", value: 480, suffix: "+" },
  { id: "capacity", label: "kW installed", value: 2400, suffix: "+" },
  { id: "years", label: "Years of experience", value: 12 },
  { id: "warranty", label: "Years of panel warranty", value: 25 },
];

export const processSection: SectionCopy = {
  id: "how-it-works",
  eyebrow: "How it works",
  title: "From first visit to a working roof",
  intro: "Four steps. You always know what happens next, and nothing is installed before you approve the design.",
};

export const process: ProcessStep[] = [
  {
    id: "survey",
    step: "01",
    title: "Site survey",
    summary: "We measure the roof, shading, and your last few electricity bills.",
  },
  {
    id: "design",
    step: "02",
    title: "Design",
    summary: "You get a layout, equipment list, and a written estimate before any payment.",
  },
  {
    id: "installation",
    step: "03",
    title: "Installation",
    summary: "Mounting structure, modules, inverter, and commissioning, usually within a few days on site.",
  },
  {
    id: "support",
    step: "04",
    title: "Support",
    summary: "A generation check, guidance on paperwork, and a team you can call if output drops.",
  },
];

export const calculator: CalculatorContent = {
  id: "savings",
  eyebrow: "Savings calculator",
  title: "A first look at system size",
  intro:
    "Adjust the monthly bill. This is a planning estimate, not a quotation. The site survey replaces it with a design for your roof.",
  billLabel: "Monthly electricity bill",
  defaultBill: 4000,
  minBill: 1000,
  maxBill: 30000,
  step: 100,
  assumptions: {
    tariffPerKwh: 9,
    peakSunHours: 5.2,
    performanceRatio: 0.78,
    systemCostPerKw: 52000,
    minKw: 1,
  },
};

export const benefitsSection: SectionCopy = {
  id: "why-us",
  eyebrow: "Why Grand Sure",
  title: "A team that stays after installation",
  intro: "The equipment matters. So does the team that installs it and answers the phone afterwards.",
};

export const benefits: Benefit[] = [
  {
    id: "matched",
    title: "Matched equipment",
    summary: "Panels, inverter, and battery are chosen to work together, not pulled from leftover stock.",
  },
  {
    id: "survey",
    title: "Survey before the sale",
    summary: "Shade, structure, and your electricity use come first. The quotation follows the roof, not a fixed package.",
  },
  {
    id: "warranty",
    title: "Warranty you can use",
    summary: "Panel warranty terms are written in the proposal, with a local contact for claims.",
  },
  {
    id: "paperwork",
    title: "Net-metering guidance",
    summary: "We guide you through the documents your electricity distribution company requires.",
  },
  {
    id: "safety",
    title: "Protection included",
    summary: "Earthing, surge protection, and labelled isolators are included in the installation.",
  },
  {
    id: "care",
    title: "Aftercare",
    summary: "Cleaning plans and fault visits so the system continues to produce what the design specified.",
  },
];

export const gallerySection: SectionCopy = {
  id: "gallery",
  eyebrow: "Projects",
  title: "Roofs we have worked on",
  intro: "The kinds of roofs and systems we install. Ask for photographs of a recent project near you.",
};

export const gallery: GalleryItem[] = [
  {
    id: "home-rooftop",
    title: "Home rooftop",
    location: "Independent house",
    image: "/images/gallery-home.jpg",
    imageAlt: "Solar panels covering a residential rooftop",
  },
  {
    id: "factory-shed",
    title: "Factory shed",
    location: "Metal roof",
    image: "/images/gallery-factory.jpg",
    imageAlt: "Solar panels on a factory shed roof",
  },
  {
    id: "society",
    title: "Housing society",
    location: "Common terrace",
    image: "/images/gallery-society.jpg",
    imageAlt: "Solar array on a shared apartment terrace",
  },
  {
    id: "water",
    title: "Water heating",
    location: "Domestic terrace",
    image: "/images/gallery-water.jpg",
    imageAlt: "Solar water heaters lined up on a home terrace",
  },
  {
    id: "backup",
    title: "Battery backup",
    location: "Home utility room",
    image: "/images/gallery-backup.jpg",
    imageAlt: "Home battery cabinet and inverter in a utility corner",
  },
  {
    id: "carport",
    title: "Carport array",
    location: "Parking shade",
    image: "/images/gallery-carport.jpg",
    imageAlt: "Solar panels forming the roof of a carport",
  },
];

export const testimonialsSection: SectionCopy = {
  id: "testimonials",
  eyebrow: "Customers",
  title: "What owners say after a year",
  intro: "These are sample stories. They are not published customer reviews.",
};

export const testimonials: Testimonial[] = [
  {
    id: "asha",
    quote:
      "The survey showed a smaller system than the first phone quote. The bill still dropped, and we were not sold panels we did not need.",
    name: "Asha Kulkarni",
    detail: "3.7 kW home rooftop",
  },
  {
    id: "imran",
    quote:
      "They labelled every isolator and left a one-page note of what to check if generation falls. That note has already been useful.",
    name: "Imran Shaikh",
    detail: "Workshop metal roof",
  },
  {
    id: "neha",
    quote:
      "Hot water in the morning without the geyser, and a crew that came back to reseat a tube after a storm.",
    name: "Neha Deshmukh",
    detail: "200 L water heater",
  },
  {
    id: "ravi",
    quote:
      "Battery backup covers the evening load we care about. They were honest about what it would not run.",
    name: "Ravi Patel",
    detail: "Hybrid system with storage",
  },
];

export const faqSection: SectionCopy = {
  id: "faq",
  eyebrow: "FAQ",
  title: "Questions before the survey",
  intro: "Short answers. The site visit is where we confirm what applies to your roof.",
};

export const faq: FaqItem[] = [
  {
    id: "cost",
    question: "How much does a home system cost?",
    answer:
      "A typical home system is priced per kilowatt after we inspect the roof and your electricity bills. The calculator on this page is only a starting range. The written estimate lists equipment, structure, and installation separately.",
  },
  {
    id: "roof",
    question: "Will my roof take the weight?",
    answer:
      "Concrete slabs and many metal roofs can. During the survey we check the slab, waterproofing, and wind exposure. We decline the work when the structure is not suitable.",
  },
  {
    id: "outage",
    question: "Does solar work during a power cut?",
    answer:
      "A grid-tied system switches off during a power cut. This is a safety requirement. A hybrid inverter with a battery can keep selected circuits on. We will tell you which loads the battery you choose can support.",
  },
  {
    id: "meter",
    question: "Can I send extra power back to the grid?",
    answer:
      "That depends on your electricity distribution company and net-metering approval. We prepare the drawings and guide you through the application. The utility sets the approval time.",
  },
  {
    id: "warranty",
    question: "What does the warranty cover?",
    answer:
      "Panel performance warranties are usually 25 years from the manufacturer. Inverters and batteries have shorter terms. Workmanship on our installation is stated in the proposal.",
  },
  {
    id: "time",
    question: "How long does installation take?",
    answer:
      "After you approve the design and the material is on site, most home installations finish in one to three working days. Utility paperwork can take longer than the installation itself.",
  },
];

export const contactSection: SectionCopy = {
  id: "contact",
  eyebrow: "Contact",
  title: "Tell us about the roof",
  intro: "Share a few details and we will reply with a time for the site survey. There is no obligation to purchase.",
};

export const footer = {
  blurb: "Solar panels, storage, water heaters, and installation to match.",
  enquireLabel: "Request a quote",
  quoteCta: "Get a quote",
  directionsLabel: "Get directions",
};
