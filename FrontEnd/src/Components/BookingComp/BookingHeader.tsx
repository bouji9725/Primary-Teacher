// src/Components/BookingHeader.tsx
import * as React from 'react';
import { Box, Typography } from '@mui/material';

const BookingHeader: React.FC = () => {
  return (
    <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
      <Typography
        variant="h2"
        sx={{ fontWeight: 600, color: 'primary.main' }}
      >
        Book your session
      </Typography>
      <Typography
        variant="h3"
        sx={{
          mt: 1,
          mb: 2,
          fontSize: { xs: '1.9rem', md: '2.2rem' },
        }}
      >
        Let’s take the next step together.
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 620, mx: 'auto' }}
      >
        Choose a package, pick a time, and tell me a little about your child.
        The first call is always friendly, pressure-free and focused on what
        your child needs most.
      </Typography>
    </Box>
  );
};

export default BookingHeader;
