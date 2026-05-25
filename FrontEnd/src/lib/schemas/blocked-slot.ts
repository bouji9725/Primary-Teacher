import { z } from 'zod'

export const BlockedSlotSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('SLOT'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
    reason: z.string().optional(),
  }),
  z.object({
    type: z.literal('DAY'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    reason: z.string().optional(),
  }),
  z.object({
    type: z.literal('RANGE'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    reason: z.string().optional(),
  }),
])

export type BlockedSlotInput = z.infer<typeof BlockedSlotSchema>
