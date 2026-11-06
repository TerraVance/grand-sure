import type { QuoteInput } from "@/lib/quote-schema";

/**
 * Phase 2 seam. Replace this with a Prisma write. Phase 1 only sends email.
 */
export const persistQuote: (quote: QuoteInput) => Promise<void> = async () => undefined;
