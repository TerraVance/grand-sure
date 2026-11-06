import type { BusinessInfo } from "@/types/content";

export function formatAddress(address: BusinessInfo["address"]) {
  return [address.line1, address.line2, [address.city, address.state].filter(Boolean).join(", "), address.postalCode, address.country]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(", ");
}

export function directionsUrl(business: BusinessInfo) {
  if (business.mapsLink) return business.mapsLink;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress(business.address))}`;
}

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) return null;
  const compact = phone.replace(/[^\d+]/g, "");
  return `tel:${compact}`;
}

export function mailHref(email: string) {
  if (!email.includes("@")) return null;
  return `mailto:${email}`;
}

export function whatsAppHref(phone: string, text: string) {
  const digits = phone.replace(/\D/g, "");
  const query = `text=${encodeURIComponent(text)}`;
  if (digits.length < 8) return `https://wa.me/?${query}`;
  return `https://wa.me/${digits}?${query}`;
}

export function quoteWhatsAppText(input: {
  name: string;
  city: string;
  productName?: string;
  monthlyBill?: number;
  message: string;
}) {
  return [
    "Hello Grand Sure, I would like a solar quote.",
    `Name: ${input.name}`,
    `City: ${input.city}`,
    `Product: ${input.productName ?? "Not sure yet"}`,
    `Monthly bill: ${input.monthlyBill ? `₹${input.monthlyBill}` : "Not provided"}`,
    input.message,
  ].join("\n");
}
