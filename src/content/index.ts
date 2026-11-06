import { business, discover, hero, nav } from "@/content/business";
import { categories, products, productsSection, services } from "@/content/products";
import {
  benefits,
  benefitsSection,
  calculator,
  contactSection,
  faq,
  faqSection,
  footer,
  gallery,
  gallerySection,
  process,
  processSection,
  stats,
  statsSection,
  testimonials,
  testimonialsSection,
} from "@/content/site";
import type { SiteContent } from "@/types/content";

export function getContent(): SiteContent {
  return {
    business,
    hero,
    nav,
    discover,
    stats,
    statsSection,
    products,
    categories,
    productsSection,
    services,
    process,
    processSection,
    calculator,
    benefits,
    benefitsSection,
    gallery,
    gallerySection,
    testimonials,
    testimonialsSection,
    faq,
    faqSection,
    contactSection,
    footer,
  };
}
