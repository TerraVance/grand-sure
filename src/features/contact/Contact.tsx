"use client";

import { motion } from "framer-motion";
import { MapEmbed } from "@/features/contact/MapEmbed";
import { QuoteForm } from "@/features/contact/QuoteForm";
import { eyebrow as eyebrowClass } from "@/components/ui/styles";
import { formatAddress, mailHref, phoneHref } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";
import type { BusinessInfo, Product, SectionCopy } from "@/types/content";

export function Contact({
  section,
  business,
  products,
  directionsLabel,
}: {
  section: SectionCopy;
  business: BusinessInfo;
  products: Product[];
  directionsLabel: string;
}) {
  const reduced = usePrefersReducedMotion();
  const phone = phoneHref(business.phone);
  const email = mailHref(business.email);

  return (
    <section id={section.id} aria-labelledby="contact-title" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className={eyebrowClass}>{section.eyebrow}</p>
          <h2 id="contact-title" className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {section.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-muted">{section.intro}</p>
          <motion.div
            className="mt-8"
            initial={reduced ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0 : 0.45 }}
          >
            <QuoteForm products={products} whatsapp={business.whatsapp} />
          </motion.div>
        </div>
        <div className="grid content-start gap-4 lg:col-span-5">
          <address className="rounded-card border border-line bg-white p-6 not-italic shadow-card">
            <h3 className="font-display text-2xl font-semibold text-black">Visit or call</h3>
            {business.isPlaceholderContact ? (
              <p className="mt-2 text-sm text-muted">Contact details will be confirmed before launch.</p>
            ) : null}
            <dl className="mt-4 grid gap-3 text-sm leading-6">
              <div>
                <dt className="font-semibold text-black">Address</dt>
                <dd className="text-muted">{formatAddress(business.address)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-black">Phone / WhatsApp</dt>
                <dd className="text-muted">
                  {phone ? <a href={phone}>{business.phone}</a> : business.phone}
                  <span className="mx-2">·</span>
                  {business.whatsapp}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-black">Email</dt>
                <dd className="text-muted">{email ? <a href={email}>{business.email}</a> : business.email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-black">Working hours</dt>
                <dd className="text-muted">{business.hours}</dd>
              </div>
            </dl>
          </address>
          <MapEmbed business={business} directionsLabel={directionsLabel} />
        </div>
      </div>
    </section>
  );
}
