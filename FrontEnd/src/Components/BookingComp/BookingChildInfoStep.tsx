'use client'

import * as React from 'react'
import { Paper, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChildInfoSchema, type ChildInfoInput } from '@/src/lib/schemas/booking'
import { gradients } from '../../theme'

export type ChildInfoRef = {
  triggerValidation: () => Promise<boolean>
  getValues: () => ChildInfoInput
}

interface Props {
  defaultValues: ChildInfoInput
}

export const BookingChildInfoStep = React.forwardRef<ChildInfoRef, Props>(
  ({ defaultValues }, ref) => {
    const {
      register,
      trigger,
      getValues,
      formState: { errors },
    } = useForm<ChildInfoInput>({
      resolver: zodResolver(ChildInfoSchema),
      defaultValues,
    })

    React.useImperativeHandle(ref, () => ({
      async triggerValidation() {
        return trigger()
      },
      getValues() {
        return getValues()
      },
    }))

    return (
      <Paper
        elevation={3}
        sx={{ background: gradients.bgmain, p: { xs: 3, md: 4 }, borderRadius: 4 }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          3. Tell us about your child
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Parent's Name"
            fullWidth
            {...register('parentName')}
            error={!!errors.parentName}
            helperText={errors.parentName?.message}
            inputProps={{ 'aria-label': "Parent's name" }}
          />
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            inputProps={{ 'aria-label': 'Email address' }}
          />
          <TextField
            label="Child's Name"
            fullWidth
            {...register('childName')}
            error={!!errors.childName}
            helperText={errors.childName?.message}
            inputProps={{ 'aria-label': "Child's name" }}
          />
          <TextField
            label="Child's Age"
            fullWidth
            {...register('childAge')}
            error={!!errors.childAge}
            helperText={errors.childAge?.message}
            inputProps={{ 'aria-label': "Child's age" }}
          />
          <TextField
            label="Short description of needs (optional)"
            rows={4}
            multiline
            fullWidth
            {...register('needs')}
            inputProps={{ 'aria-label': 'Description of needs' }}
          />
        </Stack>
      </Paper>
    )
  }
)

BookingChildInfoStep.displayName = 'BookingChildInfoStep'

export default BookingChildInfoStep
