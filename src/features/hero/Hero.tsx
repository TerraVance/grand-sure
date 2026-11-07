import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { eyebrow, focusRing, textLink } from "@/components/ui/styles";
import { cn } from "@/lib/format";
import type { HeroContent } from "@/types/content";

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section className="bg-white px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className={eyebrow}>{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {hero.headline}{" "}
            <span className="underline decoration-black decoration-[3px] underline-offset-[0.18em]">{hero.highlight}</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{hero.subtext}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">{hero.primaryCta}</Button>
            <Button href="/#products" variant="secondary">
              {hero.secondaryCta}
            </Button>
          </div>
          <ul className="mt-8 max-w-xl divide-y divide-line border-y border-line">
            {hero.badges.map((badge) => (
              <li key={badge} className="flex items-center gap-3 py-3 text-sm font-medium text-ink">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="relative aspect-video overflow-hidden rounded-[1.75rem] border border-black/10 bg-black shadow-card">
            <Image
              src="/images/hero-rooftop.png"
              alt="Solar panels on a residential roof in morning light"
              fill
              priority
              sizes="(min-width: 1024px) 42rem, 100vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-5 pb-5 pt-16">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Rooftop system</p>
              <p className="mt-2 font-display text-xl font-semibold text-white">Designed, supplied, and commissioned</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
        {hero.paths.map((path) => (
          <li key={path.title} className="flex flex-col rounded-3xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{path.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted">{path.summary}</p>
            <a href={path.href} className={cn("mt-6 inline-flex text-sm", textLink, focusRing)}>
              {path.cta}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
