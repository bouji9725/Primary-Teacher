'use client'

import * as React from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import BlockIcon from '@mui/icons-material/Block'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:30', '17:30']

type BlockType = 'SLOT' | 'DAY' | 'RANGE'

interface Props {
  onCreated: () => void
}

export function BlockSlotForm({ onCreated }: Props) {
  const [type, setType] = React.useState<BlockType>('DAY')
  const [date, setDate] = React.useState('')
  const [time, setTime] = React.useState('09:00')
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: Record<string, any>
    if (type === 'SLOT') body = { type, date, time, reason: reason || undefined }
    else if (type === 'DAY') body = { type, date, reason: reason || undefined }
    else body = { type, startDate, endDate, reason: reason || undefined }

    try {
      const res = await fetch('/api/admin/blocked-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error?.message ?? 'Failed to create block.')
        return
      }
      setSuccess(true)
      setDate('')
      setStartDate('')
      setEndDate('')
      setReason('')
      onCreated()
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <BlockIcon color="error" />
        <Typography variant="h6">Block Time</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel>Block type</FormLabel>
            <RadioGroup
              row
              value={type}
              onChange={(e) => setType(e.target.value as BlockType)}
            >
              <FormControlLabel value="DAY" control={<Radio />} label="Full day" />
              <FormControlLabel value="SLOT" control={<Radio />} label="Specific time slot" />
              <FormControlLabel value="RANGE" control={<Radio />} label="Date range (vacation)" />
            </RadioGroup>
          </FormControl>

          {(type === 'SLOT' || type === 'DAY') && (
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
            />
          )}

          {type === 'SLOT' && (
            <TextField
              select
              label="Time slot"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              {TIME_SLOTS.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
          )}

          {type === 'RANGE' && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Start date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
              />
              <TextField
                label="End date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                inputProps={{ min: startDate || new Date().toISOString().split('T')[0] }}
              />
            </Stack>
          )}

          <TextField
            label="Reason (optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Holiday, Conference…"
          />

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Block created successfully.</Alert>}

          <Button
            type="submit"
            variant="contained"
            color="error"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <BlockIcon />}
          >
            {loading ? 'Saving…' : 'Block this time'}
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}
