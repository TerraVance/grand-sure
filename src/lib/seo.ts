import type { Metadata } from "next";
import { getContent } from "@/content";
import { isFilled } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site-url";

const homeTitle = "Grand Sure Electricals | Solar Panels & Installation in Chikhli, Maharashtra";

export function buildMetadata(): Metadata {
  const { business } = getContent();
  const siteUrl = getSiteUrl();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: homeTitle,
      template: `%s | ${business.name}`,
    },
    description: business.description,
    applicationName: business.name,
    keywords: [
      "Grand Sure",
      "Grand Sure Electricals",
      "solar panels Chikhli",
      "solar installation Chikhli",
      "solar installation Maharashtra",
      "inverter battery Chikhli",
      "solar water heater Chikhli",
      "Buldhana solar",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: siteUrl,
      title: homeTitle,
      description: business.description,
      siteName: business.name,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: homeTitle,
      description: business.description,
    },
    robots: { index: true, follow: true },
  };
}

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { business } = getContent();
  const url = `${getSiteUrl()}${input.path}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: "website",
      url,
      title: input.title,
      description: input.description,
      siteName: business.name,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

export function buildJsonLd() {
  const { business, products, services } = getContent();
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${siteUrl}/#business`,
        name: business.legalName,
        alternateName: ["Grand Sure", "Grand Sure Electricals"],
        description: business.description,
        url: siteUrl,
        telephone: business.phone,
        email: business.email,
        image: `${siteUrl}/brand/logo-white.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: [business.address.line1, business.address.line2].filter(Boolean).join(", "),
          addressLocality: business.address.city,
          addressRegion: business.address.state,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        },
        areaServed: business.areaServed.map((name) => ({
          "@type": "Place",
          name,
        })),
        sameAs: [
          business.mapsLink,
          ...business.social.map((item) => item.href).filter(Boolean),
        ].filter((value): value is string => Boolean(value)),
        ...(isFilled(business.hours) ? { openingHours: business.hours } : {}),
        openingHoursSpecification: business.openingHours.map((spec) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: spec.dayOfWeek,
          opens: spec.opens,
          closes: spec.closes,
        })),
        ...(business.lat !== null && business.lng !== null
          ? { geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng } }
          : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Solar equipment and installation services",
          itemListElement: [
            ...services.map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.name,
                description: service.summary,
                provider: { "@id": `${siteUrl}/#business` },
                areaServed: business.areaServed.map((name) => ({
                  "@type": "Place",
                  name,
                })),
              },
              url: `${siteUrl}/contact`,
            })),
            {
              "@type": "OfferCatalog",
              name: "Solar equipment",
              itemListElement: products.map((product) => ({
                "@type": "ListItem",
                name: product.name,
                description: product.summary,
                url: `${siteUrl}/#products`,
              })),
            },
          ],
        },
      },
    ],
  };
}
