import type { ProductCategoryId } from "@/types/content";

export function ProductArt({ category }: { category: ProductCategoryId }) {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" role="img" aria-hidden="true">
      <rect width="320" height="220" fill="#000000" />
      <circle cx="250" cy="48" r="26" fill="#FFFFFF" />
      {category === "panels" ? <Panels /> : null}
      {category === "inverters" ? <Inverter /> : null}
      {category === "batteries" ? <Battery /> : null}
      {category === "mounting" ? <Rails /> : null}
      {category === "heaters" ? <Heater /> : null}
      {category === "accessories" ? <Accessories /> : null}
    </svg>
  );
}

function Panels() {
  return (
    <g fill="#FFFFFF">
      <rect x="48" y="78" width="90" height="58" rx="6" transform="rotate(-8 48 78)" />
      <rect x="128" y="70" width="90" height="58" rx="6" fill="#D4D4D4" transform="rotate(-8 128 70)" />
      <rect x="70" y="132" width="90" height="58" rx="6" transform="rotate(-8 70 132)" />
    </g>
  );
}

function Inverter() {
  return (
    <g>
      <rect x="108" y="58" width="104" height="120" rx="12" fill="#F5F5F5" />
      <rect x="124" y="78" width="72" height="28" rx="4" fill="#000000" />
      <circle cx="140" cy="132" r="6" fill="#000000" />
      <circle cx="164" cy="132" r="6" fill="#737373" />
    </g>
  );
}

function Battery() {
  return (
    <g>
      <rect x="126" y="46" width="28" height="12" rx="3" fill="#FFFFFF" />
      <rect x="104" y="58" width="112" height="120" rx="16" fill="#F5F5F5" />
      <rect x="120" y="92" width="80" height="64" rx="8" fill="#000000" />
    </g>
  );
}

function Rails() {
  return (
    <g stroke="#FFFFFF" strokeWidth="8" fill="none">
      <path d="M40 150 H280" />
      <path d="M40 120 H280" />
      <path d="M70 90 V170" />
      <path d="M160 80 V170" />
      <path d="M250 90 V170" />
    </g>
  );
}

function Heater() {
  return (
    <g>
      <rect x="70" y="96" width="180" height="64" rx="32" fill="#F5F5F5" />
      {Array.from({ length: 7 }).map((_, index) => (
        <rect key={index} x={86 + index * 22} y="70" width="12" height="70" rx="6" fill="#FFFFFF" />
      ))}
    </g>
  );
}

function Accessories() {
  return (
    <g fill="none" stroke="#FFFFFF" strokeWidth="8">
      <circle cx="160" cy="116" r="36" />
      <circle cx="160" cy="116" r="16" />
      <path d="M196 116 H250" strokeLinecap="round" />
    </g>
  );
}

export function GalleryArt({ id }: { id: string }) {
  const accent = id === "water" || id === "backup" ? "#FFFFFF" : "#D4D4D4";
  return (
    <svg viewBox="0 0 640 420" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="420" fill="#000000" />
      <circle cx="520" cy="80" r="36" fill="#FFFFFF" />
      <path d="M40 300 L200 180 L320 260 L460 140 L600 250 V420 H40 Z" fill="#171717" />
      <g fill={accent}>
        <rect x="180" y="168" width="46" height="28" transform="rotate(-18 180 168)" />
        <rect x="230" y="152" width="46" height="28" transform="rotate(-18 230 152)" />
        <rect x="280" y="136" width="46" height="28" transform="rotate(-18 280 136)" />
        <rect x="360" y="150" width="46" height="28" transform="rotate(-12 360 150)" />
        <rect x="414" y="138" width="46" height="28" transform="rotate(-12 414 138)" />
      </g>
    </svg>
  );
}
