"use client";

import { fadeUp, staggerContainer } from "@/animations/variants";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";

const visible = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export function useScrollReveal() {
  const reduced = usePrefersReducedMotion();
  return {
    reduced,
    container: reduced ? visible : staggerContainer,
    item: reduced ? visible : fadeUp,
    viewport: { once: true, amount: 0.25 } as const,
  };
}
