import { AnimateProvider } from '@/app/providers/animate';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Snippet } from '../snippet';
import Isolate from './isolate.jpg';

const createSnippet = (
  provider: string,
  props?: string
) => `import { isolate } from 'orate';
import { ${provider} } from 'orate/${provider}';
import audio from './audio.wav';

const speech = await isolate({
  model: ${provider}.isl(${props ?? ''}),
  audio,
});`;

const snippets = [
  {
    provider: 'elevenlabs',
    name: 'ElevenLabs',
    code: createSnippet('elevenlabs'),
  },
  {
    provider: 'cleanvoice',
    name: 'CleanVoice',
    code: createSnippet('cleanvoice'),
  },
  {
    provider: 'replicate',
    name: 'Replicate',
    code: `import { isolate } from 'orate';
import { replicate } from 'orate/replicate';
import audio from './audio.wav';

const model = 'cjwbw/audiosep:f07004438b8f3e6c5b720ba889389007cbf8dbbc9caa124afc24d9bbd2d307b8';

const inputTransformer = (audio: File) => {
  // Upload audio somewhere
  const url = 'https://www.acme.com/test.mp3';
  
  return {
    input: {
      audio: url,
      text: 'speech',
    },
  };
};

const outputTransformer = async (response: unknown) => {
  const stream = response as ReadableStream;
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
  }

  const blob = new Blob(chunks, { type: 'audio/mp3' });

  return new File([blob], 'isolated.mp3', { type: 'audio/mp3' });
};

const speech = await isolate({
  model: replicate.isl(
    model,
    inputTransformer,
    outputTransformer,
  ),
  audio,
});`,
  },
];

export const SpeechIsolation = () => (
  <section
    id="isl"
    className="container mx-auto grid items-start gap-32 px-4 py-16 sm:py-24 lg:grid-cols-2"
  >
    <AnimateProvider
      initial={{ opacity: 0, transform: 'translateY(-8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
    >
      <Image src={Isolate} alt="Writing" className="hidden lg:block" />
    </AnimateProvider>
    <div className="grid gap-6">
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      >
        <p className="text-muted-foreground">Speech isolation</p>
      </AnimateProvider>
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        delay={0.2}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Find the signal in the noise
        </h2>
      </AnimateProvider>
      <AnimateProvider
        initial={{ opacity: 0, transform: 'translateY(-8px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        delay={0.4}
      >
        <p className="text-lg text-muted-foreground">
          Transform audio recordings with background noise into clean,
          studio-quality speech. Powered by leading AI providers.
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
          <Link href="/docs/features/isl">Read the docs</Link>
        </Button>
      </AnimateProvider>
    </div>
  </section>
);
