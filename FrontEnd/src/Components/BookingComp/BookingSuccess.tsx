'use client'

import * as React from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { gradients } from '../../theme'

interface Props {
  parentName: string
  email: string
  dateTime: string
}

const packageLabels: Record<string, string> = {
  homework: 'Homework Rescue',
  foundations: 'Foundation Booster',
  special: 'Special Needs Support',
}

export function BookingSuccess({ parentName, email, dateTime }: Props) {
  const formatted = React.useMemo(() => {
    const d = new Date(dateTime)
    return {
      date: d.toLocaleDateString(undefined, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      time: `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`,
    }
  }, [dateTime])

  return (
    <Paper
      elevation={4}
      sx={{
        background: gradients.bgmain,
        p: { xs: 4, md: 6 },
        borderRadius: 4,
        textAlign: 'center',
        maxWidth: 540,
        mx: 'auto',
      }}
    >
      <CheckCircleOutlineIcon
        color="primary"
        sx={{ fontSize: 72, mb: 2 }}
      />

      <Typography variant="h5" sx={{ mb: 1 }}>
        You&apos;re booked!
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        A confirmation has been sent to <strong>{email}</strong>.
      </Typography>

      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 2,
          mb: 3,
          textAlign: 'left',
          display: 'grid',
          gridTemplateColumns: '100px 1fr',
          rowGap: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">Date</Typography>
        <Typography variant="body2"><strong>{formatted.date}</strong></Typography>
        <Typography variant="body2" color="text.secondary">Time</Typography>
        <Typography variant="body2"><strong>{formatted.time}</strong></Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Hi {parentName} — Mrs. Isler will be in touch shortly if she needs anything before the session.
      </Typography>

      <Button variant="outlined" href="/" sx={{ mt: 1 }}>
        Back to home
      </Button>
    </Paper>
  )
}

export default BookingSuccess
