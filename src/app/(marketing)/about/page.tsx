import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ClosingCta } from "@/features/cta/ClosingCta";
import { aboutPage, business } from "@/content/business";
import { benefits, benefitsSection, footer } from "@/content/site";
import { formatAddress } from "@/lib/contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: aboutPage.title,
  description: aboutPage.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main">
      <section className="bg-white px-4 pb-10 pt-14 sm:px-6 md:pt-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-leaf">{aboutPage.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {aboutPage.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{aboutPage.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">{footer.quoteCta}</Button>
            <Button href="/solar-installation-chikhli" variant="secondary">
              Solar installation in Chikhli
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-surface px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {benefitsSection.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">{benefitsSection.intro}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.slice(0, 4).map((benefit) => (
                <li key={benefit.id} className="rounded-3xl border border-line bg-white p-5">
                  <h3 className="font-display text-xl font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{benefit.summary}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-3xl border border-line bg-white p-6 lg:col-span-5">
            <h2 className="font-display text-2xl font-semibold">Visit us in Chikhli</h2>
            <dl className="mt-4 grid gap-3 text-sm leading-6">
              <div>
                <dt className="font-semibold text-ink">Address</dt>
                <dd className="text-muted">{formatAddress(business.address)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Phone</dt>
                <dd className="text-muted">{business.phone}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Hours</dt>
                <dd className="text-muted">{business.hours}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Areas served</dt>
                <dd className="text-muted">{business.areaServed.join(", ")}</dd>
              </div>
            </dl>
            <Button href="/contact" className="mt-6">
              Request a site survey
            </Button>
          </aside>
        </div>
      </section>

      <ClosingCta label={footer.quoteCta} />
    </main>
  );
}
