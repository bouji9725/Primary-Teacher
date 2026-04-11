// src/Components/BookingTrustPanel.tsx
import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { gradients } from '../../theme';

const BookingTrustPanel: React.FC = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        background: gradients.bgmain,
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        height: '100%',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: 'primary.main',
          fontWeight: 600,
        }}
      >
        You're in safe hands
      </Typography>

      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          mt: 1,
          mb: 2,
          fontSize: {
            xs: '1.6rem',
            sm: '1.8rem',
          },
        }}
      >
        What makes this booking special?
      </Typography>

        <Box sx={{ textAlign: 'center', gap: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Your child will learn with a qualified Special Needs teacher (Master’s
        in Heilpädagogik), not a part-time tutor.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Sessions are tailored for children with ADHD, Dyslexia, Autism,
        learning anxiety or low confidence — using methods that fit how they
        think.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Every booking starts with a warm, pressure-free conversation, designed
        to understand your child’s strengths and needs.
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Your information stays private — always handled with confidentiality and
        care.
      </Typography>
      </Box>
    </Paper>
  );
};

export default BookingTrustPanel;
