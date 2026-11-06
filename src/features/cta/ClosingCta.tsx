import { Button } from "@/components/ui/Button";

export function ClosingCta({ label }: { label: string }) {
  return (
    <section className="bg-black px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8" aria-labelledby="closing-title">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6">
        <h2 id="closing-title" className="max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Ready for a survey on your roof?
        </h2>
        <p className="max-w-xl text-lg leading-8 text-white/75">Tell us the bill and the building. We will reply with a time, not a package deal.</p>
        <Button href="#contact" tone="dark">
          {label}
        </Button>
      </div>
    </section>
  );
}
