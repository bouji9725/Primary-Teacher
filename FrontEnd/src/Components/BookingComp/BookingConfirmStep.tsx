
import * as React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { gradients } from '../../theme';

interface BookingConfirmStepProps {
  selectedTime: string | null;
}

const BookingConfirmStep: React.FC<BookingConfirmStepProps> = ({
  selectedTime,
}) => {
  
  const formatted = React.useMemo(() => {
    if (!selectedTime) return null;
    const d = new Date(selectedTime);
    if (isNaN(d.getTime())) return null;

    const datePart = d.toLocaleDateString(undefined, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const timePart = d.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${datePart} at ${timePart}`;
  }, [selectedTime]);

  return (
    <Paper
      elevation={6}
      sx={{
        background: gradients.bgmain,
        p: { xs: 3, md: 4 },
        textAlign: 'center',
        borderRadius: 4,
      }}
    >
      <CheckCircleIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        Final step
      </Typography>

      {formatted ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          You are about to book:{' '}
          <strong>{formatted}</strong>
        </Typography>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          Please choose a date and time before confirming.
        </Typography>
      )}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        When you confirm, you will receive a booking email with all details.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        disabled={!selectedTime}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: { xs: '0.95rem', sm: '1rem' },
        }}
      >
        Confirm Booking
      </Button>
    </Paper>
  );
};

export default BookingConfirmStep;
