export interface QuotePayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  monthlyBill?: number;
  productId?: string;
  message: string;
  companyWebsite?: string;
}

export interface QuoteResponse {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}
