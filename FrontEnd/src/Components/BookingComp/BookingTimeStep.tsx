// src/Components/BookingComp/BookingTimeStep.tsx
'use client';

import * as React from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { gradients } from '../../theme';

/**
 * Interface for reserved time slots (booked lessons)
 * Used to block unavailable times on the calendar
 */
interface ReservedSlot {
  date: string; // ISO date string, e.g., "2025-12-07"
  time: string; // Time slot, e.g., "10:00"
}

interface BookingTimeStepProps {
  /**
   * ISO datetime string, e.g. "2025-12-07T15:00"
   * or null if nothing is selected yet.
   */
  selectedTime: string | null;
  onChange: (dateTimeIso: string) => void;
  /** Optional: array of reserved slots to block from booking */
  reservedSlots?: ReservedSlot[];
}

// Available time slots for booking (Monday–Friday only)
const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:30', '17:30'];

// Weekday labels (Monday to Friday, excluding weekends)
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const BookingTimeStep: React.FC<BookingTimeStepProps> = ({
  selectedTime,
  onChange,
  reservedSlots = [],
}) => {
  // Initialize calendar to show current month
  const today = React.useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // Extract selected date from ISO string
  const selectedDate = React.useMemo(() => {
    if (!selectedTime) return null;
    const d = new Date(selectedTime);
    return isNaN(d.getTime()) ? null : d;
  }, [selectedTime]);

  // Extract selected time slot from ISO string
  const selectedSlot = React.useMemo(() => {
    if (!selectedTime) return null;
    const d = new Date(selectedTime);
    if (isNaN(d.getTime())) return null;
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }, [selectedTime]);

  /**
   * Navigate to previous or next month in calendar
   * @param direction - 'prev' for previous month, 'next' for next month
   */
  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const year = prev.getFullYear();
      const month = prev.getMonth();
      return new Date(
        direction === 'prev' ? year : year,
        direction === 'prev' ? month - 1 : month + 1,
        1
      );
    });
  };

  /**
   * Check if two dates are the same day (ignoring time)
   * @param d1 - First date
   * @param d2 - Second date
   * @returns true if both dates represent the same calendar day
   */
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  /**
   * Check if a date is a weekend (Saturday or Sunday)
   * Returns true if day is 0 (Sunday) or 6 (Saturday)
   * @param date - Date to check
   * @returns true if date is a weekend day
   */
  const isWeekend = (date: Date): boolean => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  /**
   * Check if a time slot is reserved (already booked)
   * @param date - Date to check
   * @param time - Time slot to check (e.g., "10:00")
   * @returns true if the slot is reserved and should be blocked
   */
  const isSlotReserved = (date: Date, time: string): boolean => {
    const dateStr = date.toISOString().split('T')[0]; // "YYYY-MM-DD"
    return reservedSlots.some(
      (slot) => slot.date === dateStr && slot.time === time
    );
  };

  /**
   * Build array of calendar days for display
   * Fills in empty slots for proper grid alignment
   * Only includes weekdays (Mon–Fri), skips weekends entirely
   * @param month - Month to build calendar for
   * @returns Array of Date objects (with nulls for empty grid cells before first weekday)
   */
  const buildCalendarDays = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const days: (Date | null)[] = [];

    // Find the first weekday (Mon-Fri) of the month and its column position
    let firstWeekdayColumn = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      if (!isWeekend(date)) {
        // Calculate column: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4
        const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, 2=Tue, ..., 6=Sat
        firstWeekdayColumn = dayOfWeek - 1; // Mon(1)->0, Tue(2)->1, etc.
        break;
      }
    }

    // Add empty cells for alignment before the first weekday
    for (let i = 0; i < firstWeekdayColumn; i++) {
      days.push(null);
    }

    // Add only weekdays (Mon-Fri) to the calendar
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      if (!isWeekend(date)) {
        days.push(date);
      }
    }

    return days;
  };

  const calendarDays = buildCalendarDays(currentMonth);

  /**
   * Handle day click: select date and use first available time slot
   * Only allows selection of today or future dates (no past dates)
   * @param day - Selected day
   */
  const handleDayClick = (day: Date) => {
    // Block past dates
    if (day < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      return;
    }

    // Use existing time slot or default to first available
    const slot = selectedSlot ?? timeSlots[0];
    const [hour, minute] = slot.split(':').map(Number);
    const combined = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      hour,
      minute
    );
    onChange(combined.toISOString());
  };

  /**
   * Handle time slot click: select time for current or default date
   * If no date is selected, uses today (if in same month) or first day of month
   * @param slot - Selected time slot (e.g., "10:00")
   */
  const handleTimeClick = (slot: string) => {
    let baseDate: Date;

    if (selectedDate) {
      baseDate = selectedDate;
    } else {
      const isSameMonth =
        today.getFullYear() === currentMonth.getFullYear() &&
        today.getMonth() === currentMonth.getMonth();
      baseDate = isSameMonth
        ? today
        : new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    }

    const [hour, minute] = slot.split(':').map(Number);
    const combined = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      hour,
      minute
    );
    onChange(combined.toISOString());
  };

  const monthFormatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Paper elevation={3} sx={{ background: gradients.bgmain, p: { xs: 3, md: 4 }, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        2. Choose a date & time
      </Typography>

     
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
          <Typography variant="subtitle1">
            {monthFormatter.format(currentMonth)}
          </Typography>
        </Box>

        <Box>
          <IconButton
            size="small"
            onClick={() => handleMonthChange('prev')}
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

      {/* Calendar grid: 5 columns for Mon–Fri */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1,
          mb: 3,
          fontSize: '0.8rem',
        }}
      >
        {weekdays.map((day) => (
          <Box
            key={day}
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: 'text.secondary',
            }}
          >
            {day}
          </Box>
        ))}

        {calendarDays.map((day, index) => {
          if (!day) {
            return <Box key={`empty-${index}`} 
              sx={{ padding: '6px 0', borderRadius: 2 }}/>;
          }

          const isPast =
            day <
            new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <Box
key={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
              component="button"
              onClick={() => !isPast && handleDayClick(day)}
              disabled={isPast}
              sx={{
                border: 'none',
                outline: 'none',
                cursor: isPast ? 'default' : 'pointer',
                borderRadius: 2,
                padding: '6px 0',
                textAlign: 'center',
                backgroundColor: isSelected
                  ? 'primary.main'
                  : 'transparent',
                color: isSelected
                  ? 'common.white'
                  : isPast
                  ? 'text.disabled'
                  : 'text.primary',
                '&:hover': {
                  backgroundColor: isPast
                    ? 'transparent'
                    : isSelected
                    ? 'primary.dark'
                    : 'action.hover',
                },
                fontSize: '0.85rem',
              }}
            >
              {day.getDate()}
            </Box>
          );
        })}
      </Box>

      {/* Time slots */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Available times
      </Typography>
      <Stack
        spacing={1}
        direction="row"
        flexWrap="wrap"
        useFlexGap
        sx={{ mb: 1 }}
      >
        {timeSlots.map((slot) => (
          <Button
            key={slot}
            variant={selectedSlot === slot ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleTimeClick(slot)}
            sx={{
              borderRadius: 999,
              px: 2,
            }}
          >
            {slot}
          </Button>
        ))}
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
          at {selectedSlot}
        </Typography>
      )}
    </Paper>
  );
};

export default BookingTimeStep;
