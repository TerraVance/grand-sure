import { Benefits } from "@/features/benefits/Benefits";
import { Calculator } from "@/features/calculator/Calculator";
import { Contact } from "@/features/contact/Contact";
import { ClosingCta } from "@/features/cta/ClosingCta";
import { Discover } from "@/features/discover/Discover";
import { Faq } from "@/features/faq/Faq";
import { BackToTop } from "@/features/footer/BackToTop";
import { Footer } from "@/features/footer/Footer";
import { Gallery } from "@/features/gallery/Gallery";
import { Hero } from "@/features/hero/Hero";
import { Navbar } from "@/features/navbar/Navbar";
import { Process } from "@/features/process/Process";
import { Products } from "@/features/products/Products";
import { QuoteProvider } from "@/features/quote/QuoteProvider";
import { Stats } from "@/features/stats/Stats";
import { Testimonials } from "@/features/testimonials/Testimonials";
import { getContent } from "@/content";
import { buildJsonLd } from "@/lib/seo";

export default function HomePage() {
  const content = getContent();
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <QuoteProvider>
        <Navbar business={content.business} links={content.nav} quoteLabel={content.footer.quoteCta} />
        <main id="main">
          <Hero hero={content.hero} />
          <Stats section={content.statsSection} stats={content.stats} />
          <Discover items={content.discover} />
          <Products
            section={content.productsSection}
            products={content.products}
            categories={content.categories}
            services={content.services}
            enquireLabel={content.footer.enquireLabel}
          />
          <Process section={content.processSection} steps={content.process} />
          <Calculator content={content.calculator} />
          <Benefits section={content.benefitsSection} benefits={content.benefits} />
          <Gallery section={content.gallerySection} items={content.gallery} />
          <Testimonials section={content.testimonialsSection} items={content.testimonials} />
          <Faq section={content.faqSection} items={content.faq} />
          <ClosingCta label={content.footer.quoteCta} />
          <Contact
            section={content.contactSection}
            business={content.business}
            products={content.products}
            directionsLabel={content.footer.directionsLabel}
          />
        </main>
        <Footer business={content.business} links={content.nav} blurb={content.footer.blurb} />
        <BackToTop />
      </QuoteProvider>
    </>
  );
}
