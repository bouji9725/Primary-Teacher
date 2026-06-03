// src/Components/SectionContainer.tsx
import * as React from 'react';
import { Container } from '@mui/material';
import { layout } from '@/src/theme';

interface SectionContainerProps {
  children: React.ReactNode;
}

// SectionContainer: shared responsive section wrapper for consistent page width
const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
  return (
    <Container
      maxWidth={false}
      sx={layout.container}
    >
      {children}
    </Container>
  );
};

export default SectionContainer;
