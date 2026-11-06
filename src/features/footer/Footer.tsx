import Image from "next/image";
import { focusRingOnDark } from "@/components/ui/styles";
import { cn } from "@/lib/format";
import { formatAddress, mailHref, phoneHref } from "@/lib/contact";
import type { BusinessInfo, NavLink } from "@/types/content";

export function Footer({
  business,
  links,
  blurb,
}: {
  business: BusinessInfo;
  links: NavLink[];
  blurb: string;
}) {
  const year = new Date().getFullYear();
  const phone = phoneHref(business.phone);
  const email = mailHref(business.email);

  return (
    <footer className="bg-black px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src="/brand/logo-white.jpg" alt={business.name} width={88} height={88} className="h-20 w-20 object-cover mix-blend-screen" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">{blurb}</p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2 md:col-span-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em]">Explore</p>
          {links.map((link) => (
            <a key={link.href} href={link.href} className={cn("text-sm text-white/70 hover:text-white", focusRingOnDark)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="grid content-start gap-2 text-sm md:col-span-4">
          <p className="font-semibold uppercase tracking-[0.18em]">Contact</p>
          <p className="text-white/70">{formatAddress(business.address)}</p>
          <p className="text-white/70">
            {phone ? (
              <a href={phone} className={cn("underline decoration-white/40 underline-offset-4 hover:text-white hover:decoration-white", focusRingOnDark)}>
                {business.phone}
              </a>
            ) : (
              business.phone
            )}
          </p>
          <p className="text-white/70">
            {email ? (
              <a href={email} className={cn("underline decoration-white/40 underline-offset-4 hover:text-white hover:decoration-white", focusRingOnDark)}>
                {business.email}
              </a>
            ) : (
              business.email
            )}
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-white/15 pt-6 text-sm text-white/60">
        © {year} {business.legalName}. All rights reserved.
      </p>
    </footer>
  );
}
