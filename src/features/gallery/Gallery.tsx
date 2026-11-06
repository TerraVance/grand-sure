"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";
import { Section } from "@/components/ui/Section";
import { focusRing } from "@/components/ui/styles";
import type { GalleryItem, SectionCopy } from "@/types/content";

export function Gallery({ section, items }: { section: SectionCopy; items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <Section id={section.id} eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`block w-full overflow-hidden rounded-card text-left shadow-card ${focusRing}`}
              onClick={() => setActive(item)}
            >
              <div className="relative aspect-[4/3]">
                <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
              </div>
              <span className="block bg-white px-4 py-3">
                <span className="block font-display text-lg font-semibold text-black">{item.title}</span>
                <span className="text-sm text-muted">{item.location}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox open={Boolean(active)} label={active?.imageAlt ?? "Project"} onClose={() => setActive(null)}>
        {active ? (
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={active.image} alt={active.imageAlt} fill sizes="80vw" className="object-cover" />
            </div>
            <h3 className="mt-4 font-display text-3xl">{active.title}</h3>
            <p className="mt-1 text-white/70">{active.location}</p>
            <p className="mt-3 text-sm text-white/80">{active.imageAlt}</p>
          </div>
        ) : null}
      </Lightbox>
    </Section>
  );
}
