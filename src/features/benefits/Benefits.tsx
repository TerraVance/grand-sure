"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";
import type { Benefit, SectionCopy } from "@/types/content";

const icons = ["01", "02", "03", "04", "05", "06"];

export function Benefits({ section, benefits }: { section: SectionCopy; benefits: Benefit[] }) {
  const reduced = usePrefersReducedMotion();
  return (
    <Section id={section.id} eyebrow={section.eyebrow} title={section.title} intro={section.intro} tone="plain">
      <motion.ul
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        variants={reduced ? undefined : staggerContainer}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {benefits.map((benefit, index) => (
          <motion.li key={benefit.id} variants={reduced ? undefined : fadeUp} className="rounded-card border border-line bg-white p-6 shadow-card">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-black">{icons[index]}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-black">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{benefit.summary}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
