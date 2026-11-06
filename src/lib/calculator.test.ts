import { describe, expect, it } from "vitest";
import { estimateSavings } from "@/lib/calculator";

const assumptions = {
  tariffPerKwh: 9,
  peakSunHours: 5.2,
  performanceRatio: 0.78,
  systemCostPerKw: 52000,
  minKw: 1,
};

describe("estimateSavings", () => {
  it("returns a sized system and a payback band for a typical bill", () => {
    const estimate = estimateSavings(4000, assumptions);
    expect(estimate.systemKw).toBe(3.7);
    expect(estimate.yearlySavings).toBeGreaterThan(40000);
    expect(estimate.paybackLow).toBeLessThan(estimate.paybackYears);
    expect(estimate.paybackHigh).toBeGreaterThan(estimate.paybackYears);
  });

  it("returns zeros when the bill is empty or invalid", () => {
    expect(estimateSavings(0, assumptions).systemKw).toBe(0);
    expect(estimateSavings(Number.NaN, assumptions).yearlySavings).toBe(0);
  });

  it("never sizes below the minimum kilowatt", () => {
    expect(estimateSavings(100, assumptions).systemKw).toBe(1);
  });
});
