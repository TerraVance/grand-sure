"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { popIn } from "@/animations/variants";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";
import type { ProcessStep, SectionCopy } from "@/types/content";

export function Process({ section, steps }: { section: SectionCopy; steps: ProcessStep[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    const idleId = window.setTimeout(() => {
      void (async () => {
        try {
          const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);
          if (cancelled || !rootRef.current) return;
          gsap.registerPlugin(ScrollTrigger);
          const context = gsap.context(() => {
            if (verticalRef.current) {
              gsap.fromTo(
                verticalRef.current,
                { scaleY: 0 },
                {
                  scaleY: 1,
                  ease: "none",
                  scrollTrigger: { trigger: rootRef.current, start: "top 75%", end: "bottom 55%", scrub: true },
                },
              );
            }
            if (horizontalRef.current) {
              gsap.fromTo(
                horizontalRef.current,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  ease: "none",
                  scrollTrigger: { trigger: rootRef.current, start: "top 70%", end: "bottom 60%", scrub: true },
                },
              );
            }
          }, rootRef);
          revert = () => context.revert();
        } catch {
          if (verticalRef.current) verticalRef.current.style.transform = "scaleY(1)";
          if (horizontalRef.current) horizontalRef.current.style.transform = "scaleX(1)";
        }
      })();
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(idleId);
      revert?.();
    };
  }, [reduced]);

  return (
    <Section id={section.id} eyebrow={section.eyebrow} title={section.title} intro={section.intro} tone="plain">
      <div ref={rootRef} className="relative">
        <div
          ref={verticalRef}
          className="absolute bottom-0 left-5 top-0 w-px origin-top scale-y-0 bg-black motion-reduce:scale-y-100 md:hidden"
        />
        <div
          ref={horizontalRef}
          className="absolute left-0 right-0 top-8 hidden h-px origin-left scale-x-0 bg-black motion-reduce:scale-x-100 md:block"
        />
        <ol className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.li
              key={step.id}
              className="relative pl-12 md:pl-0 md:pt-16"
              variants={popIn}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: reduced ? 0 : index * 0.08 }}
            >
              <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-black font-display text-sm font-semibold text-white md:left-0">
                {step.step}
              </span>
              <h3 className="font-display text-2xl font-semibold text-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.summary}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
