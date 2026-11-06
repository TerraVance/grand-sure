import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{10,18}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email"),
  city: z.string().trim().min(2, "Enter your city"),
  monthlyBill: z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? undefined : value),
    z.coerce.number().min(0, "Bill cannot be negative").max(1_000_000).optional(),
  ),
  productId: z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? undefined : value),
    z.string().trim().max(80).optional(),
  ),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(1000, "Keep the message under 1000 characters"),
  companyWebsite: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export function quoteFieldErrors(error: z.ZodError) {
  return error.flatten().fieldErrors;
}
