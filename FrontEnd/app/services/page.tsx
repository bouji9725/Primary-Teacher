'use client';

import { Box } from '@mui/material';
import CoreServicesSection from '@/src/Components/CoreServicesSection';

export default function ServicesPage() {
  return (
    <Box component="main" sx={{ pt: { xs: 12, sm: 14 } }}>
      <CoreServicesSection />
    </Box>
  );
}
