import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminToken, ADMIN_COOKIE_NAME } from '@/src/lib/admin-auth'

const Schema = z.object({ password: z.string().min(1) })

export async function POST(req: Request) {
  const raw = await req.json().catch(() => null)
  const parsed = Schema.safeParse(raw)

  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } },
      { status: 400 }
    )
  }

  if (parsed.data.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Incorrect password' } },
      { status: 401 }
    )
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE_NAME, createAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return res
}
