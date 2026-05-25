import { createHmac } from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE_NAME = 'admin_session'

function computeToken(): string {
  const secret = process.env.ADMIN_SECRET ?? 'fallback-dev-secret'
  const password = process.env.ADMIN_PASSWORD ?? ''
  return createHmac('sha256', secret).update(password).digest('hex')
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token) return false
  return token === computeToken()
}

export function createAdminToken(): string {
  return computeToken()
}
