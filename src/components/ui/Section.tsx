import type { ReactNode } from "react";
import { eyebrow as eyebrowClass } from "@/components/ui/styles";
import { cn } from "@/lib/format";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "light",
  className,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  tone?: "light" | "navy" | "plain";
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cn(
        "scroll-mt-24 px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-28",
        tone === "navy" && "bg-black text-white",
        tone === "light" && "bg-white",
        tone === "plain" && "bg-surface",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10">
        {eyebrow || title || intro ? (
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className={cn(eyebrowClass, tone === "navy" && "text-white/70")}>{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 id={`${id}-title`} className="mt-3 font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                {title}
              </h2>
            ) : null}
            {intro ? (
              <p className={cn("mt-4 text-base leading-7 md:text-lg", tone === "navy" ? "text-white/80" : "text-muted")}>
                {intro}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
