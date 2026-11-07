import { Button } from "@/components/ui/Button";

export function ClosingCta({
  label,
  href = "/contact",
}: {
  label: string;
  href?: string;
}) {
  return (
    <section className="bg-black px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8" aria-labelledby="closing-title">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6">
        <h2 id="closing-title" className="max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Ready for a survey on your roof?
        </h2>
        <p className="max-w-xl text-lg leading-8 text-white/75">
          Share your electricity bill and building type. We will reply with a survey time. There is no obligation to purchase.
        </p>
        <Button href={href} tone="dark">
          {label}
        </Button>
      </div>
    </section>
  );
}
