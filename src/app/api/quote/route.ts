import { NextResponse } from "next/server";
import { sendQuoteEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";
import { quoteFieldErrors, quoteSchema } from "@/lib/quote-schema";
import { persistQuote } from "@/server/quotes";

export const runtime = "nodejs";

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ ok: false, error: "Invalid origin" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid origin" }, { status: 403 });
    }
  }

  if (await isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, fieldErrors: quoteFieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendQuoteEmail(parsed.data);
    await persistQuote(parsed.data);
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not send your request. Please call us or try WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
