import type { BusinessInfo } from "@/types/content";

export function isFilled(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 && !/^\[[A-Za-z0-9 _/-]+\]$/.test(trimmed);
}

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

function callingDigits(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export function phoneHref(phone: string) {
  const digits = callingDigits(phone);
  if (digits.length < 8) return null;
  return `tel:+${digits}`;
}

export function mailHref(email: string) {
  if (!email.includes("@")) return null;
  return `mailto:${email}`;
}

export function whatsAppHref(phoneOrLink: string, text: string) {
  const trimmed = phoneOrLink.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      if (text) url.searchParams.set("text", text);
      return url.toString();
    } catch {
      return trimmed;
    }
  }

  const digits = callingDigits(trimmed);
  const query = `text=${encodeURIComponent(text)}`;
  if (digits.length < 8) return `https://wa.me/?${query}`;
  return `https://wa.me/${digits}?${query}`;
}

export function quoteWhatsAppText(input: {
  name: string;
  phone: string;
  email: string;
  city: string;
  productName?: string;
  monthlyBill?: number;
  message: string;
}) {
  return [
    "Hello Grand Sure Electricals, I would like a solar quote.",
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email}`,
    `City: ${input.city}`,
    `Product: ${input.productName ?? "Not sure yet"}`,
    `Monthly bill: ${input.monthlyBill ? `₹${input.monthlyBill}` : "Not provided"}`,
    input.message,
  ].join("\n");
}
