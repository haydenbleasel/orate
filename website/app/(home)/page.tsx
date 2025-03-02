import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Hero } from './components/hero';
import { Providers } from './components/providers';
import { HeroSnippet } from './components/snippet';
import Speech from './speech.jpg';

const title = 'Orate | The AI toolkit for speech';
const description =
  'Create realistic, human-like speech and transcribe audio with a unified API that works with leading AI providers like OpenAI, ElevenLabs and AssemblyAI.';

export const metadata: Metadata = createMetadata(title, description);

const Home = () => (
  <div className="grid h-[calc(100dvh-var(--fd-nav-height))] grid-cols-2 divide-x overflow-hidden">
    <div className="relative flex items-end justify-start p-16">
      <Image
        src={Speech}
        alt="Speech"
        className="absolute inset-0 object-cover opacity-5"
      />
      <Hero />
    </div>
    <div className="grid grid-rows-2 divide-y overflow-hidden">
      <div className="grid overflow-auto">
        <HeroSnippet />
      </div>
      <Providers />
    </div>
  </div>
);

export default Home;
