type Bucket = { count: number; resetAt: number };

export function createMemoryLimiter(max: number, windowMs: number, now: () => number = Date.now) {
  const buckets = new Map<string, Bucket>();

  return {
    hit(key: string) {
      const time = now();
      const current = buckets.get(key);
      if (!current || time > current.resetAt) {
        buckets.set(key, { count: 1, resetAt: time + windowMs });
        return false;
      }
      current.count += 1;
      return current.count > max;
    },
  };
}

const memoryLimiter = createMemoryLimiter(5, 10 * 60 * 1000);

async function upstashLimited(ip: string): Promise<boolean | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const key = encodeURIComponent(`quote:${ip}`);
  try {
    const response = await fetch(`${url}/incr/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { result?: number };
    const count = data.result ?? 1;
    if (count === 1) {
      await fetch(`${url}/expire/${key}/600`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
    }
    return count > 5;
  } catch {
    return null;
  }
}

export async function isRateLimited(ip: string) {
  const remote = await upstashLimited(ip);
  if (remote !== null) return remote;
  return memoryLimiter.hit(ip);
}
