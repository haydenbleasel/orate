import { Snippet } from '@/components/snippet';
import { AnimateProvider } from '@/providers/animate';
import Image from 'next/image';
import Speech from './speech.jpg';

const createSnippet = (
  provider: string,
  props?: string
) => `import { speak } from 'orate';
import { ${provider} } from 'orate/${provider}';

const speech = await speak({
  model: ${provider}.tts(${props ?? ''}),
  prompt: 'Friends, Romans, countrymen, lend me your ears;'
});`;

const snippets = [
  {
    provider: 'elevenlabs',
    name: 'ElevenLabs',
    code: createSnippet('elevenlabs', "'multilingual_v2', 'aria'"),
  },
  {
    provider: 'openai',
    name: 'OpenAI',
    code: createSnippet('openai', "'tts-1', 'alloy'"),
  },
  {
    provider: 'assemblyai',
    name: 'AssemblyAI',
    code: createSnippet('assemblyai', "'en-US-AvaMultilingualNeural'"),
  },
  {
    provider: 'google',
    name: 'Google',
    code: createSnippet('google'),
  },
  {
    provider: 'ibm',
    name: 'IBM',
    code: createSnippet('ibm'),
  },
];

export const TextToSpeech = () => (
  <section
    id="tts"
    className="container mx-auto grid grid-cols-2 items-start gap-32 px-4 py-24"
  >
    <div className="grid gap-6">
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      >
        <p className="text-muted-foreground">Text to speech</p>
      </AnimateProvider>
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        delay={0.2}
      >
        <h2 className="text-7xl">Generate realistic, human-like speech</h2>
      </AnimateProvider>
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        delay={0.4}
      >
        <p className="text-lg text-muted-foreground">
          Transform text into natural-sounding speech with a unified API that
          works with leading AI providers like OpenAI, ElevenLabs and
          AssemblyAI.
        </p>
      </AnimateProvider>
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        delay={0.6}
      >
        <Snippet snippets={snippets} />
      </AnimateProvider>
    </div>
    <Image src={Speech} alt="Speech" />
  </section>
);
