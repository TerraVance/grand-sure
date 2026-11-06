"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/animations/useCountUp";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";
import type { SectionCopy, Stat } from "@/types/content";

export function Stats({ section, stats }: { section: SectionCopy; stats: Stat[] }) {
  const ref = useRef<HTMLDListElement>(null);
  const [active, setActive] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={section.id} aria-labelledby="stats-title" className="scroll-mt-24 bg-black px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="stats-title" className="max-w-3xl font-display text-3xl font-semibold leading-snug tracking-tight md:text-4xl">
          {section.intro}
        </h2>
        <dl ref={ref} className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-10 md:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} active={active} reduced={reduced} />
          ))}
        </dl>
      </div>
    </section>
  );
}

function StatItem({ stat, active, reduced }: { stat: Stat; active: boolean; reduced: boolean }) {
  const value = useCountUp(stat.value, active, reduced);
  const digits = stat.decimals ?? 0;
  return (
    <div>
      <dd className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {stat.prefix}
        {value.toFixed(digits)}
        {stat.suffix}
      </dd>
      <dt className="mt-2 text-sm text-white/70">{stat.label}</dt>
    </div>
  );
}
