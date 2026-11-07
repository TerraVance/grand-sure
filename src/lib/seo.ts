import type { Metadata } from "next";
import { getContent } from "@/content";
import { isFilled } from "@/lib/contact";

export function buildMetadata(): Metadata {
  const { business } = getContent();
  return {
    metadataBase: new URL(business.siteUrl),
    title: {
      default: `${business.name} | Solar panels and installation in Chikhli`,
      template: `%s | ${business.name}`,
    },
    description: business.description,
    applicationName: business.name,
    keywords: [
      "Grand Sure",
      "Grand Sure Electricals",
      "solar panels Chikhli",
      "solar installation Maharashtra",
      "inverter battery Chikhli",
      "solar water heater",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: business.siteUrl,
      title: `${business.name} | Solar panels and installation in Chikhli`,
      description: business.description,
      siteName: business.name,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.name} | Solar panels and installation in Chikhli`,
      description: business.description,
    },
    robots: { index: true, follow: true },
  };
}

export function buildJsonLd() {
  const { business, products } = getContent();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${business.siteUrl}/#business`,
        name: business.legalName,
        alternateName: ["Grand Sure", "Grand Sure Electricals"],
        description: business.description,
        url: business.siteUrl,
        telephone: business.phone,
        email: business.email,
        image: `${business.siteUrl}/brand/logo-white.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: [business.address.line1, business.address.line2].filter(Boolean).join(", "),
          addressLocality: business.address.city,
          addressRegion: business.address.state,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        },
        sameAs: [
          business.mapsLink,
          ...business.social.map((item) => item.href).filter(Boolean),
        ].filter((value): value is string => Boolean(value)),
        ...(isFilled(business.hours) ? { openingHours: business.hours } : {}),
        ...(business.lat !== null && business.lng !== null
          ? { geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng } }
          : {}),
      },
      ...products.map((product) => ({
        "@type": "Product",
        name: product.name,
        description: product.summary,
        category: product.category,
        brand: { "@type": "Brand", name: business.name },
      })),
    ],
  };
}
