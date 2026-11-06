import type { Variants } from "framer-motion";
import { motionTokens } from "@/animations/tokens";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.slow, ease: motionTokens.ease.out },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: motionTokens.stagger.base, delayChildren: 0.04 },
  },
};

export const wordReveal: Variants = {
  hidden: { y: 16 },
  show: {
    y: 0,
    transition: { duration: motionTokens.duration.base, ease: motionTokens.ease.out },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionTokens.duration.base, ease: motionTokens.ease.out },
  },
};
