import { Section } from "@/components/ui/Section";
import type { SectionCopy, Testimonial } from "@/types/content";

export function Testimonials({ section, items }: { section: SectionCopy; items: Testimonial[] }) {
  return (
    <Section id={section.id} eyebrow={section.eyebrow} title={section.title} intro={section.intro} tone="plain">
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.id} className="rounded-3xl border border-line bg-white p-8">
            <figure>
              <blockquote className="text-lg leading-8 text-ink">“{item.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="font-semibold text-ink">{item.name}</span>
                <span className="mx-2">·</span>
                {item.detail}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
