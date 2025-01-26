import type { Metadata } from 'next';

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

export const createMetadata = (
  title: string,
  description: string
): Metadata => ({
  title,
  description,
  metadataBase: new URL(baseUrl),
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
  keywords: [
    'speech',
    'ai',
    'toolkit',
    'text-to-speech',
    'speech-to-text',
    'orate',
    'openai',
    'elevenlabs',
    'assemblyai',
    'azure',
    'google',
    'ibm',
  ],
  openGraph: {
    title,
    description,
    siteName: 'Orate',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: new URL('/opengraph-image.png', baseUrl).toString(),
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
        url: new URL('/opengraph-image.png', baseUrl).toString(),
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
