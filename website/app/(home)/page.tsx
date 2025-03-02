import { Hero } from '@/app/(home)/components/hero';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const title = 'Orate | The AI toolkit for speech';
const description =
  'Create realistic, human-like speech and transcribe audio with a unified API that works with leading AI providers like OpenAI, ElevenLabs and AssemblyAI.';

export const metadata: Metadata = createMetadata(title, description);

const Home = () => (
  <>
    <Hero />
  </>
);

export default Home;
