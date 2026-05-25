import { z } from 'zod'

export const BookingSchema = z.object({
  parentName: z.string().min(1, "Parent's name is required"),
  email: z.string().email('Please enter a valid email address'),
  childName: z.string().min(1, "Child's name is required"),
  childAge: z.string().min(1, "Child's age is required"),
  needs: z.string().optional(),
  package: z.enum(['homework', 'foundations', 'special'], {
    errorMap: () => ({ message: 'Please select a package' }),
  }),
  dateTime: z.string().min(1, 'Please select a date and time'),
})

export type BookingInput = z.infer<typeof BookingSchema>

// Only the child-info fields — used for step-level validation in the wizard
export const ChildInfoSchema = z.object({
  parentName: z.string().min(1, "Parent's name is required"),
  email: z.string().email('Please enter a valid email address'),
  childName: z.string().min(1, "Child's name is required"),
  childAge: z.string().min(1, "Child's age is required"),
  needs: z.string().optional(),
})

export type ChildInfoInput = z.infer<typeof ChildInfoSchema>
