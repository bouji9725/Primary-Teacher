// src/Components/BookingPackageStep.tsx
'use client';

import * as React from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { gradients } from '../../theme';

interface BookingPackageStepProps {
  selectedPackage: string;
  onChange: (newValue: string) => void;
}

const BookingPackageStep: React.FC<BookingPackageStepProps> = ({
  selectedPackage,
  onChange,
}) => {
  const handlePackageChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, background: gradients.bgmain}}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        1. Select a package
      </Typography>

      <ToggleButtonGroup
        exclusive
        value={selectedPackage}
        onChange={handlePackageChange}
        fullWidth
        orientation="vertical"
      >
        <ToggleButton
          value="homework"
          sx={{
            justifyContent: 'flex-start',
            py: 2,
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <AccessTimeIcon color="primary" />
            <Box>
              <Typography variant="subtitle1">Homework Rescue</Typography>
              <Typography variant="caption" color="text.secondary">
                1× per week · support for calm evenings
              </Typography>
            </Box>
          </Stack>
        </ToggleButton>

        <ToggleButton
          value="foundations"
          sx={{
            justifyContent: 'flex-start',
            py: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <SchoolIcon color="primary" />
            <Box>
              <Typography variant="subtitle1">Foundation Booster</Typography>
              <Typography variant="caption" color="text.secondary">
                Close gaps in reading, writing or math
              </Typography>
            </Box>
          </Stack>
        </ToggleButton>

        <ToggleButton
          value="special"
          sx={{
            justifyContent: 'flex-start',
            py: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <PsychologyIcon color="primary" />
            <Box>
              <Typography variant="subtitle1">Special Needs Support</Typography>
              <Typography variant="caption" color="text.secondary">
                ADHD · Dyslexia · Autism-friendly structure
              </Typography>
            </Box>
          </Stack>
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};

export default BookingPackageStep;
