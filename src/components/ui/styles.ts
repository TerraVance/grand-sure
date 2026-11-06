export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

export const focusRingOnDark =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export const focusRingOnNavy = focusRingOnDark;

export const eyebrow = "text-xs font-semibold uppercase tracking-[0.22em] text-black";

export const textLink =
  "font-semibold text-black underline decoration-black/30 underline-offset-4 hover:decoration-black";

export const buttonBase =
  "relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-5 text-sm font-semibold tracking-wide transition duration-150 enabled:hover:-translate-y-0.5 enabled:active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50";

export function buttonVariant(variant: "primary" | "secondary" | "ghost", tone: "light" | "dark") {
  if (variant === "primary") {
    return tone === "dark"
      ? "bg-white !text-black hover:bg-neutral-200"
      : "bg-black !text-white hover:bg-neutral-800";
  }
  if (variant === "ghost") {
    return tone === "dark"
      ? "bg-transparent text-white hover:bg-white/10"
      : "bg-transparent text-black hover:bg-black/5";
  }
  return tone === "dark"
    ? "border border-white/40 bg-transparent text-white hover:bg-white/10"
    : "border border-black/15 bg-white text-black hover:border-black";
}
