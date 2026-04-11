// src/Components/SectionContainer.tsx
import * as React from 'react';
import { Container } from '@mui/material';

interface SectionContainerProps {
  children: React.ReactNode;
}

// SectionContainer: shared responsive section wrapper for consistent page width
const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: {
          xs: '100%',
          sm: '640px',
          md: '860px',
          lg: '1180px',
          xl: '1420px',
           
        },
        mx: 'auto',
      }}
    >
      {children}
    </Container>
  );
};

export default SectionContainer;
