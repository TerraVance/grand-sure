"use client";

import { useEffect, useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { focusRing } from "@/components/ui/styles";
import { useCountUp } from "@/animations/useCountUp";
import { usePrefersReducedMotion } from "@/animations/usePrefersReducedMotion";
import { useQuote } from "@/features/quote/QuoteProvider";
import { estimateSavings } from "@/lib/calculator";
import { formatInr, formatYears } from "@/lib/format";
import type { CalculatorContent } from "@/types/content";

export function Calculator({ content }: { content: CalculatorContent }) {
  const [bill, setBill] = useState(content.defaultBill);
  const reduced = usePrefersReducedMotion();
  const { setEstimate } = useQuote();
  const estimate = useMemo(() => estimateSavings(bill, content.assumptions), [bill, content.assumptions]);
  const systemKw = useCountUp(estimate.systemKw, true, reduced);

  useEffect(() => {
    setEstimate(bill, estimate.systemKw);
  }, [bill, estimate.systemKw, setEstimate]);
  const yearly = useCountUp(estimate.yearlySavings, true, reduced);
  const fill = Math.min(1, estimate.systemKw / 10);

  function update(next: number) {
    const clamped = Math.min(content.maxBill, Math.max(content.minBill, next));
    setBill(clamped);
  }

  return (
    <Section id={content.id} eyebrow={content.eyebrow} title={content.title} intro={content.intro} tone="plain">
      <div className="grid items-center gap-8 rounded-3xl border border-line bg-white p-6 md:p-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <label htmlFor="monthly-bill" className="text-sm font-medium text-ink">
            {content.billLabel}
          </label>
          <div className="mt-3 flex items-center gap-3">
            <input
              id="monthly-bill"
              type="range"
              min={content.minBill}
              max={content.maxBill}
              step={content.step}
              value={bill}
              onChange={(event) => update(Number(event.target.value))}
              className="h-2 w-full accent-black"
            />
            <input
              aria-label="Monthly bill amount"
              inputMode="numeric"
              className={`w-28 rounded-2xl border border-line bg-white px-3 py-2 text-ink ${focusRing}`}
              value={bill}
              onChange={(event) => update(Number(event.target.value) || content.minBill)}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            This estimate uses {formatInr(content.assumptions.tariffPerKwh)} per kWh, {content.assumptions.peakSunHours} peak sun hours, and a{" "}
            {content.assumptions.performanceRatio} performance ratio. A site survey confirms the final system size.
          </p>
        </div>
        <div className="lg:col-span-6">
          <p className="text-sm text-muted">Estimated system size</p>
          <p data-testid="system-kw" className="mt-1 font-display text-5xl font-semibold text-ink">
            {systemKw.toFixed(1)} kW
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface" aria-hidden="true">
            <div className="h-full w-full origin-left bg-black" style={{ transform: `scaleX(${fill})` }} />
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted">Yearly savings</dt>
              <dd className="mt-1 text-xl font-semibold">{formatInr(yearly)}</dd>
            </div>
            <div>
              <dt className="text-muted">Payback band</dt>
              <dd className="mt-1 text-xl font-semibold">
                {formatYears(estimate.paybackLow)}–{formatYears(estimate.paybackHigh)} years
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
