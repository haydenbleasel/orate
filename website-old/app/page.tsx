import { CallToAction } from '@/components/cta';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Providers } from '@/components/providers';
import { SpeechToText } from '@/components/speech-to-text';
import { TextToSpeech } from '@/components/text-to-speech';
import type { Metadata } from 'next';

const title = 'Orate | The AI toolkit for speech';
const description =
  'Create realistic, human-like speech and transcribe audio with a unified API that works with leading AI providers like OpenAI, ElevenLabs and AssemblyAI.;';
const url = 'https://www.orate.dev';

export const metadata: Metadata = {
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
    url,
    siteName: title,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title,
    description,
    creator: '@haydenbleasel',
    card: 'summary_large_image',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title,
  },
};

const Home = () => (
  <>
    <Hero />
    <Providers />
    <TextToSpeech />
    <SpeechToText />
    <CallToAction />
    <Footer />
  </>
);

export default Home;
