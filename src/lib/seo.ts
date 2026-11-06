import type { Metadata } from "next";
import { getContent } from "@/content";
import { formatAddress, isFilled } from "@/lib/contact";

export function buildMetadata(): Metadata {
  const { business } = getContent();
  return {
    metadataBase: new URL(business.siteUrl),
    title: {
      default: `${business.name} | Solar panels, batteries, and installation`,
      template: `%s | ${business.name}`,
    },
    description: business.description,
    applicationName: business.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: business.siteUrl,
      title: `${business.name} | Solar panels, batteries, and installation`,
      description: business.description,
      siteName: business.name,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.name} | Solar panels, batteries, and installation`,
      description: business.description,
    },
    robots: { index: true, follow: true },
  };
}

export function buildJsonLd() {
  const { business, products } = getContent();
  const address = formatAddress(business.address);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: business.legalName,
        description: business.description,
        url: business.siteUrl,
        telephone: business.phone,
        email: business.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: address,
          addressLocality: business.address.city,
          addressRegion: business.address.state,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        },
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
