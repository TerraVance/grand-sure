"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { focusRing } from "@/components/ui/styles";
import { cn } from "@/lib/format";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";

export function Carousel<T extends { id: string }>({
  items,
  label,
  renderItem,
}: {
  items: T[];
  label: string;
  renderItem: (item: T) => ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const item = items[index];

  function go(next: number) {
    const count = items.length;
    setIndex((next + count) % count);
  }

  if (!item) return null;

  return (
    <div className="grid gap-4" aria-roledescription="carousel" aria-label={label}>
      <motion.div
        key={item.id}
        drag={reduced ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) go(index + 1);
          if (info.offset.x > 60) go(index - 1);
        }}
        initial={reduced ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduced ? 0 : 0.35 }}
      >
        <div aria-live="polite">{renderItem(item)}</div>
      </motion.div>
      <div className="flex items-center justify-between gap-3">
        <button type="button" className={cn("min-h-11 rounded-full border border-line px-4 text-sm font-semibold text-black", focusRing)} onClick={() => go(index - 1)}>
          Previous
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Choose a story">
          {items.map((entry, dot) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={dot === index}
              aria-label={`Show story ${dot + 1}`}
              className={cn("h-2.5 w-2.5 rounded-full", dot === index ? "bg-black" : "bg-line", focusRing)}
              onClick={() => setIndex(dot)}
            />
          ))}
        </div>
        <button type="button" className={cn("min-h-11 rounded-full border border-line px-4 text-sm font-semibold text-black", focusRing)} onClick={() => go(index + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
