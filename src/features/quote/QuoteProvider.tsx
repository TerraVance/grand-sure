"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Draft = {
  productId: string;
  monthlyBill: number | null;
  systemKw: number | null;
};

type QuoteContextValue = {
  draft: Draft;
  setProduct: (productId: string) => void;
  setEstimate: (monthlyBill: number, systemKw: number) => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Draft>({ productId: "", monthlyBill: null, systemKw: null });
  const setProduct = useCallback((productId: string) => {
    setDraft((current) => ({ ...current, productId }));
  }, []);
  const setEstimate = useCallback((monthlyBill: number, systemKw: number) => {
    setDraft((current) => ({ ...current, monthlyBill, systemKw }));
  }, []);
  const value = useMemo<QuoteContextValue>(
    () => ({ draft, setProduct, setEstimate }),
    [draft, setProduct, setEstimate],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used within QuoteProvider");
  return context;
}
