import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Orate',
  description: 'The AI toolkit for speech.',
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        'antialiased',
        'bg-secondary dark:bg-background'
      )}
    >
      <ThemeProvider>
        <Navbar />
        {children}
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
