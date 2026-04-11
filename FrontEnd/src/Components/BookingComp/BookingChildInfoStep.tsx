// src/Components/BookingChildInfoStep.tsx
'use client';

import * as React from 'react';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { gradients } from '../../theme';

const BookingChildInfoStep: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ background: gradients.bgmain, p: { xs: 3, md: 4 }, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        3. Tell us about your child
      </Typography>

      <Stack spacing={2}>
        <TextField label="Parent's Name" fullWidth />
        <TextField label="Email Address" fullWidth />
        <TextField label="Child's Name" fullWidth />
        <TextField label="Child's Age" fullWidth />
        <TextField
          label="Short description of needs"
          rows={4}
          multiline
          fullWidth
        />
      </Stack>
    </Paper>
  );
};

export default BookingChildInfoStep;
