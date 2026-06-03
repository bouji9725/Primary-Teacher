import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Lazy-initialised so the module loads fine when env vars are absent (local dev without Upstash).
let ratelimit: Ratelimit | null = null

function getRatelimit(): Ratelimit | null {
  if (ratelimit) return ratelimit
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    prefix: 'teacher:booking',
  })
  return ratelimit
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'anonymous'
}

/**
 * Returns true when the request should be blocked (rate limit exceeded).
 * Returns false when allowed or when Upstash is not configured (dev fallback).
 */
export async function isRateLimited(ip: string): Promise<boolean> {
  const rl = getRatelimit()
  if (!rl) return false
  const { success } = await rl.limit(ip)
  return !success
}
