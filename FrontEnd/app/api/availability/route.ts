import { NextResponse } from 'next/server'
import { db } from '@/src/lib/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const year = parseInt(searchParams.get('year') ?? '', 10)
  const month = parseInt(searchParams.get('month') ?? '', 10) // 1-based

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Invalid year or month' } },
      { status: 400 }
    )
  }

  const startOfMonth = new Date(Date.UTC(year, month - 1, 1))
  const endOfMonth = new Date(Date.UTC(year, month, 1)) // exclusive upper bound

  const monthPrefix = `${year}-${String(month).padStart(2, '0')}`

  const [appointments, blockedSlots] = await Promise.all([
    db.appointment.findMany({
      where: {
        dateTime: { gte: startOfMonth, lt: endOfMonth },
        status: { not: 'CANCELLED' },
      },
      select: { dateTime: true },
    }),
    db.blockedSlot.findMany({
      where: {
        OR: [
          { type: { in: ['SLOT', 'DAY'] }, date: { startsWith: monthPrefix } },
          { type: 'RANGE', startDate: { lt: endOfMonth }, endDate: { gte: startOfMonth } },
        ],
      },
    }),
  ])

  // Reserved slots from existing appointments
  const reservedSlots: { date: string; time: string }[] = appointments.map((a) => ({
    date: a.dateTime.toISOString().split('T')[0],
    time: `${a.dateTime.getUTCHours().toString().padStart(2, '0')}:${a.dateTime.getUTCMinutes().toString().padStart(2, '0')}`,
  }))

  const blockedDays: string[] = []

  for (const block of blockedSlots) {
    if (block.type === 'DAY' && block.date) {
      blockedDays.push(block.date)
    } else if (block.type === 'SLOT' && block.date && block.time) {
      reservedSlots.push({ date: block.date, time: block.time })
    } else if (block.type === 'RANGE' && block.startDate && block.endDate) {
      const cursor = new Date(block.startDate)
      cursor.setUTCHours(0, 0, 0, 0)
      const end = new Date(block.endDate)
      end.setUTCHours(0, 0, 0, 0)
      while (cursor <= end) {
        const dateStr = cursor.toISOString().split('T')[0]
        if (!blockedDays.includes(dateStr)) blockedDays.push(dateStr)
        cursor.setUTCDate(cursor.getUTCDate() + 1)
      }
    }
  }

  return NextResponse.json({ blockedDays, reservedSlots })
}
