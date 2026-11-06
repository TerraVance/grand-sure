/**
 * Phase 2 domain shapes. Names here should match the future Prisma models.
 * Nothing in Phase 1 reads or writes these records.
 */

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface QuotationLine {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Quotation {
  id: string;
  customerId: string;
  items: QuotationLine[];
  status: "draft" | "sent" | "accepted" | "expired";
  total: number;
  currency: "INR";
}

export interface Invoice {
  id: string;
  quotationId: string;
  customerId: string;
  number: string;
  status: "draft" | "issued" | "paid" | "void";
  total: number;
  currency: "INR";
  issuedAt: string | null;
}

export interface Order {
  id: string;
  customerId: string;
  quotationId: string;
  status: "survey" | "design" | "installation" | "support";
}
