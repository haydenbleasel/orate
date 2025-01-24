import { AnimateProvider } from '@/providers/animate';
import Image from 'next/image';
import { Snippet } from '../snippet';
import Writing from './writing.jpg';

const createSnippet = (
  provider: string,
  props?: string
) => `import { transcribe } from 'orate';
import { ${provider} } from 'orate/${provider}';

const text = await transcribe({
  model: ${provider}.stt(${props ?? ''}),
  audio: await fetch('/audio.wav').then((res) => res.arrayBuffer()),
});`;

const snippets = [
  {
    provider: 'assembly',
    name: 'AssemblyAI',
    code: createSnippet('assembly', "'nano'"),
  },
  {
    provider: 'openai',
    name: 'OpenAI',
    code: createSnippet('openai', "'whisper-1'"),
  },
  {
    provider: 'azure',
    name: 'Azure',
    code: createSnippet('azure'),
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

export const SpeechToText = () => (
  <section
    id="stt"
    className="container mx-auto grid items-start gap-32 px-4 py-16 sm:py-24 lg:grid-cols-2"
  >
    <Image src={Writing} alt="Writing" className="hidden lg:block" />
    <div className="grid gap-6">
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      >
        <p className="text-muted-foreground">Speech to text</p>
      </AnimateProvider>
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        delay={0.2}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Transcribe complex audio into text
        </h2>
      </AnimateProvider>
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        delay={0.4}
      >
        <p className="text-lg text-muted-foreground">
          Convert speech to text with a unified API that works with leading AI
          providers like OpenAI, ElevenLabs and AssemblyAI.
        </p>
      </AnimateProvider>
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        delay={0.6}
        className="grid"
      >
        <Snippet snippets={snippets} />
      </AnimateProvider>
    </div>
  </section>
);
