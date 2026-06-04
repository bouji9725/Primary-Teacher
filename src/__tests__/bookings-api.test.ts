import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/src/lib/db', () => ({
  db: {
    appointment: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
    blockedSlot: {
      findFirst: vi.fn(),
    },
  },
}))

vi.mock('@/src/lib/email', () => ({
  sendBookingConfirmation: vi.fn().mockResolvedValue(undefined),
  sendTeacherNotification: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('@/src/lib/rate-limit', () => ({
  getClientIp: vi.fn().mockReturnValue('127.0.0.1'),
  isRateLimited: vi.fn().mockResolvedValue(false),
}))

import { POST } from '@/app/api/bookings/route'
import { db } from '@/src/lib/db'
import { isRateLimited } from '@/src/lib/rate-limit'

const validBody = {
  parentName: 'Jane Doe',
  email: 'jane@example.com',
  childName: 'Alice',
  childAge: '8',
  package: 'homework',
  dateTime: '2026-07-01T09:00:00.000Z',
}

const fakeAppointment = {
  id: 'cuid-test-01',
  parentName: validBody.parentName,
  email: validBody.email,
  childName: validBody.childName,
  childAge: validBody.childAge,
  needs: null,
  package: validBody.package,
  dateTime: new Date(validBody.dateTime),
  status: 'PENDING' as const,
  createdAt: new Date(),
  updatedAt: new Date(),
}

function makeRequest(body: unknown) {
  return new Request('https://primary-teacher.vercel.app/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/bookings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(db.appointment.findFirst).mockResolvedValue(null)
    vi.mocked(db.blockedSlot.findFirst).mockResolvedValue(null)
    vi.mocked(db.appointment.create).mockResolvedValue(fakeAppointment)
    vi.mocked(isRateLimited).mockResolvedValue(false)
  })

  it('returns 201 with appointment id on a valid payload', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json.appointment.id).toBe('cuid-test-01')
  })

  it('returns 400 on an invalid payload', async () => {
    const res = await POST(makeRequest({ parentName: '', email: 'bad-email' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error.code).toBe('VALIDATION_ERROR')
  })

  it('returns 400 on a malformed JSON body', async () => {
    const req = new Request('https://primary-teacher.vercel.app/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 429 when the rate limit is exceeded', async () => {
    vi.mocked(isRateLimited).mockResolvedValue(true)
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(429)
    const json = await res.json()
    expect(json.error.code).toBe('RATE_LIMITED')
  })

  it('returns 409 when the time slot is already booked', async () => {
    vi.mocked(db.appointment.findFirst).mockResolvedValue(fakeAppointment)
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(409)
    const json = await res.json()
    expect(json.error.code).toBe('CONFLICT')
  })

  it('returns 409 when the teacher has blocked that day', async () => {
    vi.mocked(db.blockedSlot.findFirst).mockResolvedValue({
      id: 'block-01',
      type: 'DAY' as const,
      date: '2026-07-01',
      time: null,
      startDate: null,
      endDate: null,
      reason: 'Holiday',
      createdAt: new Date(),
    })
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(409)
    const json = await res.json()
    expect(json.error.code).toBe('CONFLICT')
  })
})
