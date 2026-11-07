import { focusRing, textLink } from "@/components/ui/styles";
import { cn } from "@/lib/format";
import type { DiscoverItem } from "@/types/content";

export function Discover({ items }: { items: DiscoverItem[] }) {
  return (
    <section id="discover" aria-labelledby="discover-title" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="discover-title" className="max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Discover Grand Sure Electricals
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li key={item.title}>
              <a href={item.href} className={cn("flex h-full flex-col rounded-3xl border border-line p-6 transition-colors hover:bg-surface", focusRing)}>
                <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{item.summary}</p>
                <span className={cn("mt-6 text-sm", textLink)}>{item.cta}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
