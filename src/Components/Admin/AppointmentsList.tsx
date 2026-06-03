'use client'

import * as React from 'react'
import {
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import EventIcon from '@mui/icons-material/Event'

type Appointment = {
  id: string
  parentName: string
  email: string
  childName: string
  childAge: string
  needs: string | null
  package: string
  dateTime: string
  status: string
}

const packageLabels: Record<string, string> = {
  homework: 'Homework Rescue',
  foundations: 'Foundation Booster',
  special: 'Special Needs Support',
}

export function AppointmentsList() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetch('/api/admin/appointments')
      .then((r) => r.json())
      .then((data) => setAppointments(data.appointments ?? []))
      .catch(() => setError('Failed to load appointments.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography color="error" sx={{ py: 4 }}>
        {error}
      </Typography>
    )
  }

  if (appointments.length === 0) {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: 'center',
          color: 'text.secondary',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <EventIcon sx={{ fontSize: 48, opacity: 0.3 }} />
        <Typography>No upcoming appointments.</Typography>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Date &amp; Time</strong></TableCell>
            <TableCell><strong>Package</strong></TableCell>
            <TableCell><strong>Child</strong></TableCell>
            <TableCell><strong>Parent</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Notes</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((a) => {
            const d = new Date(a.dateTime)
            const dateStr = d.toLocaleDateString('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
            const timeStr = `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`
            return (
              <TableRow key={a.id} hover>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {dateStr} {timeStr}
                </TableCell>
                <TableCell>
                  <Chip
                    label={packageLabels[a.package] ?? a.package}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{a.childName}, age {a.childAge}</TableCell>
                <TableCell>{a.parentName}</TableCell>
                <TableCell>
                  <a href={`mailto:${a.email}`}>{a.email}</a>
                </TableCell>
                <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {a.needs ?? '—'}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
