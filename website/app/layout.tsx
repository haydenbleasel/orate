import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme';
import { Analytics } from '@vercel/analytics/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Orate',
  description: 'The AI toolkit for speech.',
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning className="scroll-smooth">
    <body
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        'bg-secondary antialiased dark:bg-background'
      )}
    >
      <ThemeProvider>
        <Navbar />
        {children}
        <Toaster />
      </ThemeProvider>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
