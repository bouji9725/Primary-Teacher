'use client'

import * as React from 'react'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { gradients } from '../../theme'

interface ReservedSlot {
  date: string // "YYYY-MM-DD"
  time: string // "HH:MM"
}

interface Availability {
  blockedDays: string[]
  reservedSlots: ReservedSlot[]
}

interface BookingTimeStepProps {
  selectedTime: string | null
  onChange: (dateTimeIso: string) => void
}

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:30', '17:30']
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export function BookingTimeStep({ selectedTime, onChange }: BookingTimeStepProps) {
  const today = React.useMemo(() => new Date(), [])

  const [currentMonth, setCurrentMonth] = React.useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  )
  const [availability, setAvailability] = React.useState<Availability>({
    blockedDays: [],
    reservedSlots: [],
  })
  const [loading, setLoading] = React.useState(false)

  // Fetch availability whenever the displayed month changes
  React.useEffect(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth() + 1
    const controller = new AbortController()

    async function loadAvailability() {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/availability?year=${year}&month=${month}`,
          { signal: controller.signal }
        )
        const data: Availability = await res.json()
        setAvailability(data)
      } catch {
        // ignore — the calendar stays usable without availability data
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadAvailability()
    return () => controller.abort()
  }, [currentMonth])

  const selectedDate = React.useMemo(() => {
    if (!selectedTime) return null
    const d = new Date(selectedTime)
    return isNaN(d.getTime()) ? null : d
  }, [selectedTime])

  const selectedSlot = React.useMemo(() => {
    if (!selectedTime) return null
    const d = new Date(selectedTime)
    if (isNaN(d.getTime())) return null
    return `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`
  }, [selectedTime])

  const isCurrentMonth =
    currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth() === today.getMonth()

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const next = new Date(
        prev.getFullYear(),
        prev.getMonth() + (direction === 'next' ? 1 : -1),
        1
      )
      // Never navigate before the current month
      const isBeforeNow =
        next.getFullYear() < today.getFullYear() ||
        (next.getFullYear() === today.getFullYear() &&
          next.getMonth() < today.getMonth())
      return isBeforeNow ? prev : next
    })
  }

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()

  const isWeekend = (date: Date) => {
    const d = date.getDay()
    return d === 0 || d === 6
  }

  const isBlockedDay = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    return availability.blockedDays.includes(dateStr)
  }

  const isSlotReserved = (date: Date, time: string) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    return availability.reservedSlots.some((s) => s.date === dateStr && s.time === time)
  }

  const buildCalendarDays = (month: Date): (Date | null)[] => {
    const year = month.getFullYear()
    const monthIndex = month.getMonth()
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
    const days: (Date | null)[] = []

    let firstWeekdayColumn = 0
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day)
      if (!isWeekend(date)) {
        firstWeekdayColumn = date.getDay() - 1 // Mon(1)→0 … Fri(5)→4
        break
      }
    }

    for (let i = 0; i < firstWeekdayColumn; i++) days.push(null)

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day)
      if (!isWeekend(date)) days.push(date)
    }

    return days
  }

  const calendarDays = buildCalendarDays(currentMonth)

  const isPastDay = (day: Date) =>
    day < new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const handleDayClick = (day: Date) => {
    if (isPastDay(day) || isBlockedDay(day)) return

    const preferred = selectedSlot ?? TIME_SLOTS[0]
    const slot = isSlotReserved(day, preferred)
      ? TIME_SLOTS.find((t) => !isSlotReserved(day, t))
      : preferred

    if (!slot) return // all slots taken on this day

    const [h, m] = slot.split(':').map(Number)
    onChange(new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), h, m)).toISOString())
  }

  const handleTimeClick = (slot: string) => {
    let base: Date
    if (selectedDate) {
      base = selectedDate
    } else {
      const isSameMonthAsToday =
        today.getFullYear() === currentMonth.getFullYear() &&
        today.getMonth() === currentMonth.getMonth()
      base = isSameMonthAsToday
        ? today
        : new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    }

    if (isSlotReserved(base, slot)) return

    const [h, m] = slot.split(':').map(Number)
    onChange(new Date(Date.UTC(base.getFullYear(), base.getMonth(), base.getDate(), h, m)).toISOString())
  }

  const monthLabel = new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(currentMonth)

  return (
    <Paper
      elevation={3}
      sx={{ background: gradients.bgmain, p: { xs: 3, md: 4 }, borderRadius: 4 }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        2. Choose a date &amp; time
      </Typography>

      {/* Month navigation */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonthIcon color="primary" />
          <Typography variant="subtitle1">{monthLabel}</Typography>
        </Box>
        <Box>
          <IconButton
            size="small"
            onClick={() => handleMonthChange('prev')}
            disabled={isCurrentMonth}
            aria-label="Previous month"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleMonthChange('next')}
            aria-label="Next month"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Day-of-week headers */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1,
          mb: 1,
          fontSize: '0.8rem',
        }}
      >
        {WEEKDAYS.map((d) => (
          <Box
            key={d}
            sx={{ textAlign: 'center', fontWeight: 600, color: 'text.secondary' }}
          >
            {d}
          </Box>
        ))}
      </Box>

      {/* Calendar grid */}
      <Box sx={{ position: 'relative', mb: 3 }}>
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              borderRadius: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 1,
            }}
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={32} sx={{ borderRadius: 2 }} />
            ))}
          </Box>
        )}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 1,
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.15s ease',
          }}
        >
        {calendarDays.map((day, i) => {
          if (!day) {
            return <Box key={`empty-${i}`} sx={{ padding: '6px 0', borderRadius: 2 }} />
          }

          const past = isPastDay(day)
          const blocked = isBlockedDay(day)
          const selected = !!(selectedDate && isSameDay(day, selectedDate))
          const disabled = past || blocked

          const dayBtn = (
            <Box
              key={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
              component="button"
              onClick={() => !disabled && handleDayClick(day)}
              disabled={disabled}
              aria-pressed={selected}
              sx={{
                border: 'none',
                cursor: disabled ? 'default' : 'pointer',
                borderRadius: 2,
                padding: '6px 0',
                textAlign: 'center',
                backgroundColor: selected
                  ? 'primary.main'
                  : blocked
                  ? 'action.disabledBackground'
                  : 'transparent',
                color: selected
                  ? 'common.white'
                  : disabled
                  ? 'text.disabled'
                  : 'text.primary',
                textDecoration: blocked ? 'line-through' : 'none',
                outline: 'none',
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
                '&:hover': {
                  backgroundColor: disabled
                    ? blocked
                      ? 'action.disabledBackground'
                      : 'transparent'
                    : selected
                    ? 'primary.dark'
                    : 'action.hover',
                },
                fontSize: '0.85rem',
              }}
            >
              {day.getDate()}
            </Box>
          )

          return blocked ? (
            <Tooltip key={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`} title="Unavailable" arrow>
              <span>{dayBtn}</span>
            </Tooltip>
          ) : (
            dayBtn
          )
        })}
        </Box>
      </Box>

      {/* Time slots */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Available times <Typography component="span" variant="caption" color="text.secondary">(CET)</Typography>
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
        {TIME_SLOTS.map((slot) => {
          const base = selectedDate ?? today
          const reserved = isSlotReserved(base, slot)
          return (
            <Button
              key={slot}
              variant={selectedSlot === slot ? 'contained' : 'outlined'}
              size="small"
              onClick={() => handleTimeClick(slot)}
              disabled={reserved}
              sx={{ borderRadius: 999, px: 2 }}
            >
              {slot}
            </Button>
          )
        })}
      </Stack>

      {selectedDate && selectedSlot && (
        <Typography variant="caption" color="text.secondary">
          Selected:{' '}
          {selectedDate.toLocaleDateString(undefined, {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}{' '}
          at {selectedSlot} CET
        </Typography>
      )}
    </Paper>
  )
}

export default BookingTimeStep
