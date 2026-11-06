export const motionTokens = {
  duration: {
    fast: 0.15,
    base: 0.35,
    slow: 0.6,
    reveal: 0.8,
  },
  ease: {
    out: [0.22, 1, 0.36, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
  },
  stagger: {
    tight: 0.04,
    base: 0.08,
  },
};
