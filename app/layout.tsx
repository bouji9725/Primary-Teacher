import * as React from 'react';
import NavBar from '@/src/Components/NavBar';
import Providers from './providers';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
            <NavBar />
            {children}
        </Providers>
      </body>
    </html>
  );
}
