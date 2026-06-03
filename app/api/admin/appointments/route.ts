import { NextResponse } from 'next/server'
import { db } from '@/src/lib/db'
import { verifyAdminSession } from '@/src/lib/admin-auth'

export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Not authorised' } },
      { status: 401 }
    )
  }

  const appointments = await db.appointment.findMany({
    where: { dateTime: { gte: new Date() }, status: { not: 'CANCELLED' } },
    orderBy: { dateTime: 'asc' },
  })

  return NextResponse.json({ appointments })
}
