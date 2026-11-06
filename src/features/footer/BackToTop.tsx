"use client";

import { useEffect, useState } from "react";
import { focusRing } from "@/components/ui/styles";
import { cn } from "@/lib/format";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={cn(
        "fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-black text-lg font-semibold text-white shadow-card",
        focusRing,
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
    >
      ↑
    </button>
  );
}
