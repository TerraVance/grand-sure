"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/types/content";
import { focusRing } from "@/components/ui/styles";
import { cn } from "@/lib/format";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? "");
  const baseId = useId();

  return (
    <div className="divide-y divide-line rounded-card border border-line bg-white shadow-card">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                className={cn("flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg font-semibold text-black", focusRing)}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? "" : item.id)}
              >
                {item.question}
                <span aria-hidden="true" className="text-black">
                  {open ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" hidden={!open} className="px-5 pb-5 text-muted leading-7">
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
