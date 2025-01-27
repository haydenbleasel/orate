import { ThemeProvider } from '@/app/providers/theme';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/next';
import { RootProvider } from 'fumadocs-ui/provider';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { ReactNode } from 'react';
import './globals.css';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning className="scroll-smooth">
    <body
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        'bg-secondary font-sans antialiased dark:bg-background'
      )}
    >
      <ThemeProvider>
        <RootProvider>
          {children}
          <Toaster />
        </RootProvider>
      </ThemeProvider>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
