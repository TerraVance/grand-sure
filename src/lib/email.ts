import type { QuoteInput } from "@/lib/quote-schema";

function formatQuote(quote: QuoteInput) {
  return [
    "New Grand Sure quote request",
    `Name: ${quote.name}`,
    `Phone: ${quote.phone}`,
    `Email: ${quote.email}`,
    `City: ${quote.city}`,
    `Monthly bill: ${quote.monthlyBill ?? "Not provided"}`,
    `Product: ${quote.productId ?? "Not specified"}`,
    "",
    quote.message,
  ].join("\n");
}

export async function sendQuoteEmail(quote: QuoteInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email is not configured");
    }
    console.info("Quote received. Email is not configured in this environment.");
    return { delivered: false as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL ?? "Grand Sure <onboarding@resend.dev>",
      to: [to],
      reply_to: quote.email,
      subject: `New quote request from ${quote.name}`,
      text: formatQuote(quote),
    }),
  });

  if (!response.ok) {
    throw new Error("Email provider rejected the request");
  }

  return { delivered: true as const };
}
