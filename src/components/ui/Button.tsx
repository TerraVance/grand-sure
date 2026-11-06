"use client";

import { useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type PointerEvent, type ReactNode } from "react";
import { buttonBase, buttonVariant, focusRing, focusRingOnDark } from "@/components/ui/styles";
import { cn } from "@/lib/format";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";

type Shared = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  tone?: "light" | "dark";
  className?: string;
};

type ButtonProps = Shared & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = Shared & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type Ripple = { id: number; x: number; y: number };

function useButtonChrome(variant: Shared["variant"], tone: Shared["tone"], className?: string) {
  const reduced = usePrefersReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const classes = cn(
    buttonBase,
    buttonVariant(variant ?? "primary", tone ?? "light"),
    tone === "dark" ? focusRingOnDark : focusRing,
    className,
  );

  function addRipple(event: PointerEvent<HTMLElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((current) => [...current, { id, x: event.clientX - rect.left, y: event.clientY - rect.top }]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== id));
    }, 600);
  }

  return { classes, addRipple, ripples };
}

function Ripples({ ripples, tone }: { ripples: Ripple[]; tone: Shared["tone"] }) {
  return ripples.map((ripple) => (
    <span
      key={ripple.id}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-3 w-3 animate-[ripple_600ms_ease-out_forwards] rounded-full",
        tone === "dark" ? "bg-black/25" : "bg-white/50",
      )}
      style={{ left: ripple.x, top: ripple.y }}
    />
  ));
}

function LinkButton({ href, children, variant, tone, className, ...rest }: LinkProps) {
  const { classes, addRipple, ripples } = useButtonChrome(variant, tone, className);
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      onPointerDown={addRipple}
      {...rest}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <Ripples ripples={ripples} tone={tone} />
      <span className="relative">{children}</span>
    </a>
  );
}

function NativeButton({ children, variant, tone, className, type = "button", ...rest }: ButtonProps) {
  const { classes, addRipple, ripples } = useButtonChrome(variant, tone, className);
  return (
    <button type={type} className={classes} onPointerDown={addRipple} {...rest}>
      <Ripples ripples={ripples} tone={tone} />
      <span className="relative">{children}</span>
    </button>
  );
}

export function Button(props: ButtonProps | LinkProps) {
  if ("href" in props && typeof props.href === "string") {
    return <LinkButton {...props} />;
  }
  return <NativeButton {...(props as ButtonProps)} />;
}
