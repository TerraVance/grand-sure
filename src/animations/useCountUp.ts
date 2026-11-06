"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;

    const start = performance.now();
    const from = 0;
    const duration = 900;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(from + (target - from) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, target]);

  if (!active) return 0;
  if (reduced) return target;
  return value;
}
