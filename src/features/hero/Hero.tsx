import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { focusRing, textLink } from "@/components/ui/styles";
import { cn } from "@/lib/format";
import type { HeroContent } from "@/types/content";

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section className="bg-white px-4 pb-8 pt-14 sm:px-6 md:pt-20 lg:px-8" aria-labelledby="hero-title">
      <div className="mx-auto max-w-6xl">
        <h1 id="hero-title" className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          {hero.headline}{" "}
          <span className="underline decoration-black decoration-[3px] underline-offset-[0.22em]">{hero.highlight}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{hero.subtext}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="#contact">{hero.primaryCta}</Button>
          <Button href="#products" variant="secondary">
            {hero.secondaryCta}
          </Button>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl">
          <Image
            src="/images/hero-rooftop.png"
            alt="Solar panels on a residential roof in warm morning light"
            width={1024}
            height={572}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
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
      </div>
    </section>
  );
}
