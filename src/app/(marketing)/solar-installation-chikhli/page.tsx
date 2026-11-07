import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ClosingCta } from "@/features/cta/ClosingCta";
import { business, servicesPage } from "@/content/business";
import { services } from "@/content/products";
import { faq, footer, process, processSection } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: servicesPage.title,
  description: servicesPage.description,
  path: "/solar-installation-chikhli",
});

export default function SolarInstallationChikhliPage() {
  return (
    <main id="main">
      <section className="bg-white px-4 pb-10 pt-14 sm:px-6 md:pt-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-leaf">{servicesPage.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {servicesPage.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{servicesPage.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Request a free survey</Button>
            <Button href="/#products" variant="secondary">
              View equipment
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-surface px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            What we install in {business.address.city}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
            Supply and installation for rooftop solar, hybrid systems with batteries, mounting structures, and solar water heaters for homes, shops, and workshops.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <li key={service.id} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="font-display text-2xl font-semibold">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{service.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {processSection.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{processSection.intro}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {process.map((step) => (
              <li key={step.id} className="rounded-3xl border border-line p-5">
                <p className="text-sm font-semibold text-leaf">{step.step}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Common questions before a Chikhli survey
          </h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {faq.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-3xl border border-line bg-white p-6">
                <dt className="font-display text-xl font-semibold">{item.question}</dt>
                <dd className="mt-3 text-sm leading-6 text-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-muted">
            Serving {business.areaServed.join(", ")}.{" "}
            <a href="/about" className="font-semibold text-ink underline underline-offset-4">
              Learn more about Grand Sure Electricals
            </a>
            .
          </p>
        </div>
      </section>

      <ClosingCta label={footer.quoteCta} />
    </main>
  );
}
