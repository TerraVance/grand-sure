"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { focusRing, focusRingOnDark } from "@/components/ui/styles";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";
import { useQuote } from "@/features/quote/QuoteProvider";
import { cn } from "@/lib/format";
import type { Product, ProductCategory, SectionCopy, Service } from "@/types/content";

export function Products({
  section,
  products,
  categories,
  services,
  enquireLabel,
}: {
  section: SectionCopy;
  products: Product[];
  categories: ProductCategory[];
  services: Service[];
  enquireLabel: string;
}) {
  const [category, setCategory] = useState<ProductCategory["id"]>("all");
  const reduced = usePrefersReducedMotion();
  const { setProduct } = useQuote();
  const visible = products.filter((product) => category === "all" || product.category === category);

  function enquire(productId: string) {
    setProduct(productId);
    document.getElementById("contact")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <Section id={section.id} eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      <ul className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <li key={service.id} className="rounded-card border border-line bg-white p-5">
            <h3 className="font-display text-xl font-semibold text-black">{service.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
          </li>
        ))}
      </ul>
      <div role="tablist" aria-label="Product categories" className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => {
          const selected = item.id === category;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold",
                focusRing,
                selected ? "bg-black !text-white" : "border border-line bg-white text-black",
              )}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <motion.ul
        key={category}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        variants={reduced ? undefined : staggerContainer}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, amount: 0.15 }}
      >
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} enquireLabel={enquireLabel} onEnquire={enquire} reduced={reduced} />
        ))}
      </motion.ul>
    </Section>
  );
}

function ProductCard({
  product,
  enquireLabel,
  onEnquire,
  reduced,
}: {
  product: Product;
  enquireLabel: string;
  onEnquire: (id: string) => void;
  reduced: boolean;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <motion.li
      variants={reduced ? undefined : fadeUp}
      className="[perspective:900px]"
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: py * -8, y: px * 8 });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <motion.article
        className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        whileHover={reduced ? undefined : "hover"}
        initial="rest"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }} className="relative h-full w-full">
            <Image src={product.image} alt={product.imageAlt} fill sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" className="object-cover" />
          </motion.div>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            variants={{ rest: { x: "-140%" }, hover: { x: "280%" } }}
            transition={{ duration: 0.7 }}
          />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <h3 className="font-display text-2xl font-semibold text-black">{product.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{product.summary}</p>
          </div>
          <dl className="grid grid-cols-3 gap-2 text-sm">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-muted">{spec.label}</dt>
                <dd className="font-semibold text-black">{spec.value}</dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            className={cn("mt-auto min-h-11 rounded-full bg-black px-4 text-sm font-semibold !text-white", focusRingOnDark)}
            aria-label={`${enquireLabel} about ${product.name}`}
            onClick={() => onEnquire(product.id)}
          >
            {enquireLabel}
          </button>
        </div>
      </motion.article>
    </motion.li>
  );
}

