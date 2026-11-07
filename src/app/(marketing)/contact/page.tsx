import type { Metadata } from "next";
import { Contact } from "@/features/contact/Contact";
import { business, contactPage } from "@/content/business";
import { products } from "@/content/products";
import { contactSection, footer } from "@/content/site";
import { buildJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: contactPage.title,
  description: contactPage.description,
  path: "/contact",
});

export default function ContactPage() {
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");
  const section = {
    ...contactSection,
    eyebrow: contactPage.eyebrow,
    title: contactPage.headline,
    intro: contactPage.intro,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <main id="main">
        <Contact
          section={section}
          business={business}
          products={products}
          directionsLabel={footer.directionsLabel}
        />
      </main>
    </>
  );
}
