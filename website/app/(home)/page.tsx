import { CallToAction } from '@/app/(home)/components/cta';
import { Footer } from '@/app/(home)/components/footer';
import { Hero } from '@/app/(home)/components/hero';
import { Providers } from '@/app/(home)/components/providers';
import { SpeechToText } from '@/app/(home)/components/speech-to-text';
import { TextToSpeech } from '@/app/(home)/components/text-to-speech';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { Social } from './components/social';
import { SpeechIsolation } from './components/speech-isolation';
import { SpeechToSpeech } from './components/speech-to-speech';

const title = 'Orate | The AI toolkit for speech';
const description =
  'Create realistic, human-like speech and transcribe audio with a unified API that works with leading AI providers like OpenAI, ElevenLabs and AssemblyAI.';

export const metadata: Metadata = createMetadata(title, description);

const Home = () => (
  <>
    <Hero />
    <Providers />
    <TextToSpeech />
    <SpeechToText />
    <SpeechToSpeech />
    <SpeechIsolation />
    <CallToAction />
    <Social />
    <Footer />
  </>
);

export default Home;
