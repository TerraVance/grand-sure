import type { CalculatorAssumptions } from "@/types/content";

export interface SavingsEstimate {
  systemKw: number;
  yearlySavings: number;
  monthlySavings: number;
  paybackYears: number;
  paybackLow: number;
  paybackHigh: number;
}

export function estimateSavings(
  monthlyBill: number,
  assumptions: CalculatorAssumptions,
): SavingsEstimate {
  const empty: SavingsEstimate = {
    systemKw: 0,
    yearlySavings: 0,
    monthlySavings: 0,
    paybackYears: 0,
    paybackLow: 0,
    paybackHigh: 0,
  };

  const safeBill = Number.isFinite(monthlyBill) ? Math.max(0, monthlyBill) : 0;
  if (
    safeBill === 0 ||
    assumptions.tariffPerKwh <= 0 ||
    assumptions.peakSunHours <= 0 ||
    assumptions.performanceRatio <= 0
  ) {
    return empty;
  }

  const dailyKwh = safeBill / assumptions.tariffPerKwh / 30;
  const rawKw = dailyKwh / (assumptions.peakSunHours * assumptions.performanceRatio);
  const systemKw = Math.max(assumptions.minKw, Math.round(rawKw * 10) / 10);
  const yearlyGeneration = systemKw * assumptions.peakSunHours * 365 * assumptions.performanceRatio;
  const yearlySavings = Math.round(yearlyGeneration * assumptions.tariffPerKwh);
  const monthlySavings = Math.round(yearlySavings / 12);
  const paybackYears =
    yearlySavings > 0 ? (systemKw * assumptions.systemCostPerKw) / yearlySavings : 0;

  return {
    systemKw,
    yearlySavings,
    monthlySavings,
    paybackYears,
    paybackLow: paybackYears * 0.85,
    paybackHigh: paybackYears * 1.15,
  };
}
