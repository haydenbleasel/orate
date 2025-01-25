import { baseOptions } from '@/app/layout.config';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  authors: [
    {
      name: 'Hayden Bleasel',
      url: 'https://www.haydenbleasel.com',
    },
  ],
  formatDetection: {
    telephone: false,
  },
  creator: 'Hayden Bleasel',
  keywords: ['speech', 'ai', 'toolkit', 'text-to-speech', 'speech-to-text'],
  openGraph: {
    siteName: 'Orate',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.orate.dev/opengraph-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    creator: '@haydenbleasel',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://www.orate.dev/opengraph-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
};

const Layout = ({ children }: LayoutProps) => (
  <HomeLayout className="pt-0" {...baseOptions}>
    {children}
  </HomeLayout>
);

export default Layout;
