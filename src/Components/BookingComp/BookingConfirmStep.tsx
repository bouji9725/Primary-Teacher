'use client'

import * as React from 'react'
import { Alert, Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { gradients } from '../../theme'

const packageLabels: Record<string, string> = {
  homework: 'Homework Rescue',
  foundations: 'Foundation Booster',
  special: 'Special Needs Support',
}

interface Props {
  selectedTime: string | null
  selectedPackage: string
  parentName: string
  childName: string
  childAge: string
  submitting: boolean
  submitError: string | null
  onConfirm: () => void
  onBack: () => void
}

export function BookingConfirmStep({
  selectedTime,
  selectedPackage,
  parentName,
  childName,
  childAge,
  submitting,
  submitError,
  onConfirm,
  onBack,
}: Props) {
  const formatted = React.useMemo(() => {
    if (!selectedTime) return null
    const d = new Date(selectedTime)
    if (isNaN(d.getTime())) return null
    return {
      date: d.toLocaleDateString(undefined, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      time: `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`,
    }
  }, [selectedTime])

  return (
    <Paper
      elevation={6}
      sx={{
        background: gradients.bgmain,
        p: { xs: 3, md: 4 },
        borderRadius: 4,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <CheckCircleIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h6">Review &amp; confirm</Typography>
      </Box>

      {formatted ? (
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 2,
            mb: 2,
            display: 'grid',
            gridTemplateColumns: '140px 1fr',
            rowGap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">Date</Typography>
          <Typography variant="body2"><strong>{formatted.date}</strong></Typography>

          <Typography variant="body2" color="text.secondary">Time</Typography>
          <Typography variant="body2"><strong>{formatted.time}</strong></Typography>

          <Typography variant="body2" color="text.secondary">Package</Typography>
          <Typography variant="body2"><strong>{packageLabels[selectedPackage] ?? selectedPackage}</strong></Typography>

          <Typography variant="body2" color="text.secondary">Child</Typography>
          <Typography variant="body2"><strong>{childName}, age {childAge}</strong></Typography>

          <Typography variant="body2" color="text.secondary">Parent</Typography>
          <Typography variant="body2"><strong>{parentName}</strong></Typography>
        </Box>
      ) : (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Please go back and select a date and time.
        </Alert>
      )}

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        When you confirm, you will receive a booking confirmation by email with all details.
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={!selectedTime || submitting}
          onClick={onConfirm}
          startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : null}
          sx={{ px: 4 }}
        >
          {submitting ? 'Booking…' : 'Confirm Booking'}
        </Button>
      </Box>
    </Paper>
  )
}

export default BookingConfirmStep
