import { NextResponse } from 'next/server'
import { db } from '@/src/lib/db'
import { BookingSchema } from '@/src/lib/schemas/booking'
import { sendBookingConfirmation, sendTeacherNotification } from '@/src/lib/email'
import { AppError } from '@/src/lib/errors'

export async function POST(req: Request) {
  try {
    const raw = await req.json().catch(() => null)
    const parsed = BookingSchema.safeParse(raw)

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

    const { parentName, email, childName, childAge, needs, package: pkg, dateTime } = parsed.data
    const dt = new Date(dateTime)

    // Reject if slot is already taken
    const taken = await db.appointment.findFirst({
      where: { dateTime: dt, status: { not: 'CANCELLED' } },
    })
    if (taken) {
      return NextResponse.json(
        { error: { code: 'CONFLICT', message: 'This time slot was just booked. Please choose another.' } },
        { status: 409 }
      )
    }

    // Reject if slot falls within a teacher block
    const dateStr = dt.toISOString().split('T')[0]
    const timeStr = `${dt.getUTCHours().toString().padStart(2, '0')}:${dt.getUTCMinutes().toString().padStart(2, '0')}`

    const blocked = await db.blockedSlot.findFirst({
      where: {
        OR: [
          { type: 'SLOT', date: dateStr, time: timeStr },
          { type: 'DAY', date: dateStr },
          { type: 'RANGE', startDate: { lte: dt }, endDate: { gte: dt } },
        ],
      },
    })
    if (blocked) {
      return NextResponse.json(
        { error: { code: 'CONFLICT', message: 'This date is not available. Please choose another.' } },
        { status: 409 }
      )
    }

    const appointment = await db.appointment.create({
      data: {
        parentName,
        email,
        childName,
        childAge,
        needs: needs ?? null,
        package: pkg,
        dateTime: dt,
      },
    })

    // Send emails fire-and-forget — booking succeeds even if email fails
    Promise.all([
      sendBookingConfirmation({ ...appointment, dateTime: appointment.dateTime }),
      sendTeacherNotification({ ...appointment, dateTime: appointment.dateTime }),
    ]).catch((err) => console.error('[bookings] email send failed', err))

    return NextResponse.json({ appointment: { id: appointment.id } }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/bookings]', error)
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: error.statusCode }
      )
    }
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again.' } },
      { status: 500 }
    )
  }
}
