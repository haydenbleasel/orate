import type { Metadata } from 'next';

export const createMetadata = (
  title: string,
  description: string
): Metadata => ({
  title,
  description,
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
    title,
    description,
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
    title,
    description,
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
});
