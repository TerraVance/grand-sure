import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import type { FaqItem, SectionCopy } from "@/types/content";

export function Faq({ section, items }: { section: SectionCopy; items: FaqItem[] }) {
  return (
    <Section id={section.id} eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      <Accordion items={items} />
    </Section>
  );
}
