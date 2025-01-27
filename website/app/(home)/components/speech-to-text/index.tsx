import { AnimateProvider } from '@/app/providers/animate';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Snippet } from '../snippet';
import Writing from './writing.jpg';

const createSnippet = (
  provider: string,
  props?: string
) => `import { transcribe } from 'orate';
import { ${provider} } from 'orate/${provider}';
import audio from './audio.wav';

const text = await transcribe({
  model: ${provider}.stt(${props ?? ''}),
  audio,
});`;

const snippets = [
  {
    provider: 'assembly',
    name: 'AssemblyAI',
    code: createSnippet('assembly', "'best'"),
  },
  {
    provider: 'openai',
    name: 'OpenAI',
    code: createSnippet('openai', "'whisper-1'"),
  },
  {
    provider: 'azure',
    name: 'Azure',
    code: createSnippet('azure', "'en-US-AvaMultilingualNeural'"),
  },
  {
    provider: 'google',
    name: 'Google',
    code: createSnippet(
      'google',
      "'projects/{project}/locations/{region}/recognizers/{recognizer}'"
    ),
  },
  {
    provider: 'ibm',
    name: 'IBM',
    code: createSnippet('ibm', "'en-US_BroadbandModel'"),
  },
  {
    provider: 'gladia',
    name: 'Gladia',
    code: createSnippet('gladia', "'enhanced'"),
  },
  {
    provider: 'rev',
    name: 'Rev AI',
    code: createSnippet('rev', "'machine'"),
  },
  {
    provider: 'deepgram',
    name: 'Deepgram',
    code: createSnippet('deepgram', "'nova-2'"),
  },
  {
    provider: 'replicate',
    name: 'Replicate',
    code: `import { transcribe } from 'orate';
import { replicate } from 'orate/replicate';
import audio from './audio.wav';

const model = 'vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c';

const inputTransformer = (audio: File) => {
  // Upload audio somewhere
  const url = 'https://www.acme.com/test.mp3';
  
  return { input: { audio: url } };
};

const outputTransformer = (response: unknown) => (
  (response as { text: string }).text
);

const text = await transcribe({
  model: replicate.stt(model, inputTransformer, outputTransformer),
  audio,
});`,
  },
];

export const SpeechToText = () => (
  <section
    id="stt"
    className="container mx-auto grid items-start gap-32 px-4 py-16 sm:py-24 lg:grid-cols-2"
  >
    <AnimateProvider
      initial={{ opacity: 0, transform: 'translateY(-8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
    >
      <Image src={Writing} alt="Writing" className="hidden lg:block" />
    </AnimateProvider>
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
          Transform spoken words into meaningful text with unparalleled
          accuracy, speed and reliability; powered by leading AI providers.
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
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        delay={0.8}
      >
        <Button size="lg" className="px-4" asChild>
          <Link href="/docs/stt">Read the docs</Link>
        </Button>
      </AnimateProvider>
    </div>
  </section>
);
