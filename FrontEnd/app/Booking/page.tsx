'use client';

import * as React from 'react';
import { Box, Stack } from '@mui/material';
import BookingHeader from '@/src/Components/BookingComp/BookingHeader';
import BookingPackageStep from '@/src/Components/BookingComp/BookingPackageStep';
import BookingTimeStep from '@/src/Components/BookingComp/BookingTimeStep';
import BookingChildInfoStep from '@/src/Components/BookingComp/BookingChildInfoStep';
import BookingConfirmStep from '@/src/Components/BookingComp/BookingConfirmStep';
import BookingTrustPanel from '@/src/Components/BookingComp/BookingTrustPanel';
import SectionContainer from '@/src/Components/SectionContainer';
import { layout } from '@/src/theme';

export default function BookingPage() {
  const [selectedPackage, setSelectedPackage] = React.useState('homework');
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  return (
    <Box
      component="main"
      sx={{
        background: 'background.default',
        pt: { xs: layout.heroTop.xs, sm: layout.heroTop.sm },
        pb: layout.pageBottom,
      }}
    >
      <SectionContainer>
        <BookingHeader />

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 4, md: 5 },
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* LEFT SIDE — Booking steps */}
          <Box sx={{ flex: { xs: 1, md: '0 0 calc(58.333% - 13.333px)' } }}>
            <Stack spacing={4}>
              <BookingPackageStep
                selectedPackage={selectedPackage}
                onChange={setSelectedPackage}
              />
              <BookingTimeStep
                selectedTime={selectedTime}
                onChange={setSelectedTime}
              />
              <BookingChildInfoStep />
              <BookingConfirmStep selectedTime={selectedTime} />
            </Stack>
          </Box>

          {/* RIGHT SIDE — Trust Panel */}
          <Box sx={{ flex: { xs: 1, md: '0 0 calc(41.666% - 13.333px)' } }}>
            <BookingTrustPanel />
          </Box>
        </Box>
      </SectionContainer>
    </Box>
  );
}
