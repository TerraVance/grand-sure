import type { Product, ProductCategory, SectionCopy, Service } from "@/types/content";

export const productsSection: SectionCopy = {
  id: "products",
  eyebrow: "Equipment",
  title: "Everything the system needs",
  intro:
    "Panels, power electronics, storage, and the hardware that holds it all on the roof. Request a quote for a product and we will price it for your site.",
};

export const categories: ProductCategory[] = [
  { id: "all", label: "All" },
  { id: "panels", label: "Panels" },
  { id: "inverters", label: "Inverters" },
  { id: "batteries", label: "Batteries" },
  { id: "mounting", label: "Mounting" },
  { id: "heaters", label: "Water heaters" },
  { id: "accessories", label: "Accessories" },
];

export const products: Product[] = [
  {
    id: "mono-perc-550",
    name: "Mono PERC panel",
    category: "panels",
    summary: "High-efficiency module for rooftops that need more power from the same area.",
    specs: [
      { label: "Wattage", value: "550 W" },
      { label: "Cell type", value: "Mono PERC" },
      { label: "Warranty", value: "25 years" },
    ],
    image: "/images/product-panel.jpg",
    imageAlt: "Close view of a dark solar panel on a roof",
  },
  {
    id: "hybrid-inverter-5",
    name: "Hybrid inverter",
    category: "inverters",
    summary: "Grid-tie inverter with battery input, sized for a typical family home.",
    specs: [
      { label: "Rating", value: "5 kW" },
      { label: "Type", value: "Hybrid" },
      { label: "Phases", value: "Single" },
    ],
    image: "/images/product-inverter.jpg",
    imageAlt: "Wall-mounted hybrid solar inverter in a utility room",
  },
  {
    id: "lifepo4-5",
    name: "LiFePO4 battery",
    category: "batteries",
    summary: "Lithium iron phosphate storage for evening use and backup during outages.",
    specs: [
      { label: "Capacity", value: "5 kWh" },
      { label: "Chemistry", value: "LiFePO4" },
      { label: "Cycles", value: "6000+" },
    ],
    image: "/images/product-battery.jpg",
    imageAlt: "White home battery cabinet against a light wall",
  },
  {
    id: "roof-rail-kit",
    name: "Roof rail kit",
    category: "mounting",
    summary: "Aluminium rails, mid clamps, and anchors for concrete and metal roofs.",
    specs: [
      { label: "Material", value: "Aluminium" },
      { label: "Roof", value: "RCC or metal" },
      { label: "Finish", value: "Anodised" },
    ],
    image: "/images/product-mounting.jpg",
    imageAlt: "Aluminium mounting rails fixed on a concrete roof",
  },
  {
    id: "etc-heater-200",
    name: "Solar water heater",
    category: "heaters",
    summary: "Evacuated-tube heater for daily hot water without an electric geyser.",
    specs: [
      { label: "Capacity", value: "200 L" },
      { label: "Collector", value: "Evacuated tube" },
      { label: "Use", value: "Domestic" },
    ],
    image: "/images/product-heater.jpg",
    imageAlt: "Evacuated-tube solar water heater on a terrace",
  },
  {
    id: "protection-kit",
    name: "Protection kit",
    category: "accessories",
    summary: "DC cable, MC4 connectors, SPD, and earthing accessories for a clean install.",
    specs: [
      { label: "Cable", value: "4 sq. mm DC" },
      { label: "Protection", value: "SPD included" },
      { label: "Connectors", value: "MC4" },
    ],
    image: "/images/product-accessories.jpg",
    imageAlt: "Solar cable, connectors, and surge protection on a workbench",
  },
];

export const services: Service[] = [
  {
    id: "supply",
    name: "Supply",
    summary: "Panels and balance-of-system equipment, quoted as a matched set.",
  },
  {
    id: "installation",
    name: "Installation",
    summary: "Structure, wiring, commissioning, and handover with a generation check.",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    summary: "Cleaning plans and fault visits so output stays in line with the design.",
  },
];
