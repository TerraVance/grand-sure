import { describe, expect, it } from "vitest";
import { createMemoryLimiter } from "@/lib/rate-limit";

describe("createMemoryLimiter", () => {
  it("blocks a key after the allowed number of hits in the window", () => {
    let now = 1_000;
    const limiter = createMemoryLimiter(2, 500, () => now);
    expect(limiter.hit("203.0.113.8")).toBe(false);
    expect(limiter.hit("203.0.113.8")).toBe(false);
    expect(limiter.hit("203.0.113.8")).toBe(true);
    now = 1_600;
    expect(limiter.hit("203.0.113.8")).toBe(false);
  });

  it("tracks keys separately", () => {
    const limiter = createMemoryLimiter(1, 1_000, () => 0);
    expect(limiter.hit("a")).toBe(false);
    expect(limiter.hit("b")).toBe(false);
    expect(limiter.hit("a")).toBe(true);
  });
});
