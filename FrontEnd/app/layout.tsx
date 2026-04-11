'use client';

import { ThemeProvider } from '@mui/material/styles';
import theme from '@/src/theme';
import NavBar from '@/src/Components/NavBar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
