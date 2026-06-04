import { describe, it, expect } from 'vitest'
import { BookingSchema } from '@/src/lib/schemas/booking'

const valid = {
  parentName: 'Jane Doe',
  email: 'jane@example.com',
  childName: 'Alice',
  childAge: '8',
  package: 'homework',
  dateTime: '2026-07-01T09:00:00.000Z',
}

describe('BookingSchema', () => {
  it('accepts a fully valid payload', () => {
    expect(BookingSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts an optional needs field', () => {
    expect(BookingSchema.safeParse({ ...valid, needs: 'ADHD support' }).success).toBe(true)
  })

  it('rejects an empty parentName', () => {
    const result = BookingSchema.safeParse({ ...valid, parentName: '' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.parentName).toBeDefined()
  })

  it('rejects a malformed email', () => {
    const result = BookingSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.email).toBeDefined()
  })

  it('rejects an unknown package value', () => {
    const result = BookingSchema.safeParse({ ...valid, package: 'premium' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.package).toBeDefined()
  })

  it('rejects an empty dateTime', () => {
    const result = BookingSchema.safeParse({ ...valid, dateTime: '' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.dateTime).toBeDefined()
  })

  it('rejects a missing childName', () => {
    const result = BookingSchema.safeParse({ ...valid, childName: '' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.childName).toBeDefined()
  })
})
