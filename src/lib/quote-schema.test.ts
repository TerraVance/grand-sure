import { describe, expect, it } from "vitest";
import { quoteSchema } from "@/lib/quote-schema";

const valid = {
  name: "Asha Patil",
  phone: "9876543210",
  email: "asha@example.com",
  city: "Chikhali",
  monthlyBill: 4000,
  productId: "mono-perc-550",
  message: "Please survey our terrace this week.",
  companyWebsite: "",
};

describe("quoteSchema", () => {
  it("accepts a complete quote", () => {
    const parsed = quoteSchema.safeParse(valid);
    expect(parsed.success).toBe(true);
  });

  it("rejects a short name and a bad email", () => {
    const parsed = quoteSchema.safeParse({ ...valid, name: "A", email: "not-an-email" });
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const fields = parsed.error.flatten().fieldErrors;
      expect(fields.name?.[0]).toBe("Enter your name");
      expect(fields.email?.[0]).toBe("Enter a valid email");
    }
  });

  it("treats an empty bill as omitted and keeps the honeypot field", () => {
    const parsed = quoteSchema.safeParse({ ...valid, monthlyBill: "", companyWebsite: "https://spam.test" });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.monthlyBill).toBeUndefined();
      expect(parsed.data.companyWebsite).toBe("https://spam.test");
    }
  });
});
