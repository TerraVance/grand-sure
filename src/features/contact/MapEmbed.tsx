"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { directionsUrl } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";
import type { BusinessInfo } from "@/types/content";

export function MapEmbed({ business, directionsLabel }: { business: BusinessInfo; directionsLabel: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const reduced = usePrefersReducedMotion();
  const directions = directionsUrl(business);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true);
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const showFrame = Boolean(business.mapsEmbedUrl) && near;

  return (
    <div ref={rootRef} className="overflow-hidden rounded-card border border-line bg-white shadow-card">
      <div className="relative aspect-video bg-surface">
        {showFrame ? (
          <iframe
            title="Grand Sure on Google Maps"
            src={business.mapsEmbedUrl ?? undefined}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <motion.span
              aria-hidden="true"
              className="grid h-12 w-12 place-items-center rounded-full bg-black text-lg text-white"
              initial={reduced ? false : { y: -24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 14 }}
            >
              ↓
            </motion.span>
            <p className="max-w-sm text-sm leading-6 text-muted">
              Map preview is unavailable. Use Get Directions to open the location in Google Maps.
            </p>
          </div>
        )}
      </div>
      {showFrame ? (
        <p className="px-4 pt-3 text-sm text-muted">If the map does not load, use Get Directions.</p>
      ) : null}
      <div className="p-4">
        <Button href={directions} variant="secondary">
          {directionsLabel}
        </Button>
      </div>
    </div>
  );
}
