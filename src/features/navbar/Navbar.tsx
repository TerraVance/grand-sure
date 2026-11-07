"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { focusRingOnDark } from "@/components/ui/styles";
import { cn } from "@/lib/format";
import type { BusinessInfo, NavLink } from "@/types/content";

function sectionId(href: string) {
  if (href.startsWith("#")) return href.slice(1);
  if (href.startsWith("/#")) return href.slice(2);
  return null;
}

function resolveHref(href: string, onHome: boolean) {
  const id = sectionId(href);
  if (id) return onHome ? `#${id}` : `/#${id}`;
  return href;
}

export function Navbar({
  business,
  links,
  quoteLabel,
}: {
  business: BusinessInfo;
  links: NavLink[];
  quoteLabel: string;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) {
      setActiveHash("");
      return;
    }
    const nodes = links
      .map((link) => sectionId(link.href))
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveHash(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [links, onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isCurrent(href: string) {
    const id = sectionId(href);
    if (id) return onHome && activeHash === id;
    return pathname === href;
  }

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black text-white", scrolled && "shadow-lg")}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <Link href="/" className={cn("flex items-center", focusRingOnDark)} onClick={() => setOpen(false)}>
            <Image
              src="/brand/logo-white.jpg"
              alt={business.name}
              width={64}
              height={64}
              priority
              className="h-14 w-14 object-cover mix-blend-screen sm:h-16 sm:w-16"
            />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            {links.map((link) => {
              const current = isCurrent(link.href);
              return (
                <a
                  key={link.href}
                  href={resolveHref(link.href, onHome)}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "py-2 text-sm font-medium text-white/75 hover:text-white",
                    focusRingOnDark,
                    current && "text-white underline decoration-white underline-offset-8",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href={resolveHref("/#faq", onHome)} className={cn("px-2 text-sm font-medium text-white", focusRingOnDark)}>
              FAQ
            </a>
            <Button href="/contact" tone="dark">
              {quoteLabel}
            </Button>
          </div>
          <button
            type="button"
            className={cn("min-h-11 shrink-0 rounded-full border border-white/40 px-4 text-sm font-medium text-white lg:hidden", focusRingOnDark)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close menu" : "Open menu"}
          </button>
        </div>
        {open ? (
          <div id="mobile-menu" role="dialog" aria-label="Site menu" className="border-t border-white/10 bg-black px-4 py-4 lg:hidden">
            <nav aria-label="Mobile" className="grid gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={resolveHref(link.href, onHome)}
                  className={cn("rounded-2xl px-3 py-3 text-base text-white", focusRingOnDark)}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button href="/contact" tone="dark" className="mt-2" onClick={() => setOpen(false)}>
                {quoteLabel}
              </Button>
            </nav>
          </div>
        ) : null}
      </header>
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
