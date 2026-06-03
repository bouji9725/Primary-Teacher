import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { db } from '@/src/lib/db'
import { BlockedSlotSchema } from '@/src/lib/schemas/blocked-slot'
import { verifyAdminSession } from '@/src/lib/admin-auth'

export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Not authorised' } },
      { status: 401 }
    )
  }

  const slots = await db.blockedSlot.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ slots })
}

export async function POST(req: Request) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Not authorised' } },
      { status: 401 }
    )
  }

  const raw = await req.json().catch(() => null)
  const parsed = BlockedSlotSchema.safeParse(raw)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: parsed.error.flatten().fieldErrors,
        },
      },
      { status: 400 }
    )
  }

  const data = parsed.data
  let createData: Prisma.BlockedSlotUncheckedCreateInput

  if (data.type === 'SLOT') {
    createData = { type: 'SLOT', date: data.date, time: data.time, reason: data.reason ?? null }
  } else if (data.type === 'DAY') {
    createData = { type: 'DAY', date: data.date, reason: data.reason ?? null }
  } else {
    createData = {
      type: 'RANGE',
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      reason: data.reason ?? null,
    }
  }

  const slot = await db.blockedSlot.create({ data: createData })
  return NextResponse.json({ slot }, { status: 201 })
}
