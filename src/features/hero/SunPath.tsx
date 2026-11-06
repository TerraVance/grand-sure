"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";

export function SunPath() {
  const sunriseRef = useRef<HTMLDivElement>(null);
  const noonRef = useRef<HTMLDivElement>(null);
  const sunsetRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger);
          const context = gsap.context(() => {
            const trigger = { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: true };
            gsap.fromTo(noonRef.current, { opacity: 0 }, { opacity: 1, scrollTrigger: { ...trigger, end: "50% bottom" } });
            gsap.fromTo(sunriseRef.current, { opacity: 1 }, { opacity: 0, scrollTrigger: { ...trigger, end: "50% bottom" } });
            gsap.fromTo(sunsetRef.current, { opacity: 0 }, { opacity: 1, scrollTrigger: { ...trigger, start: "40% top" } });
            gsap.fromTo(
              orbRef.current,
              { x: "6vw", y: 0 },
              { x: "72vw", y: 12, scrollTrigger: trigger, ease: "none" },
            );
          });
          revert = () => context.revert();
        } catch {
          if (noonRef.current) noonRef.current.style.opacity = "1";
        }
      })();
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      revert?.();
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div ref={sunriseRef} className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-white to-neutral-200" />
      <div ref={noonRef} className="absolute inset-0 bg-gradient-to-b from-neutral-200 via-white to-surface opacity-0" />
      <div ref={sunsetRef} className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-neutral-50 to-white opacity-0" />
      <div ref={orbRef} className="absolute left-0 top-28 h-16 w-16 rounded-full bg-black/25 blur-md" />
    </div>
  );
}
