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
  <section className="container mx-auto grid grid-cols-2 items-start gap-32 px-4 py-24">
    <Image src={Writing} alt="Writing" />
    <div className="grid gap-6">
      <p className="text-muted-foreground">Speech to text</p>
      <h2 className="text-7xl">Transcribe complex audio into text</h2>
      <p className="text-lg text-muted-foreground">
        Convert speech to text with a unified API that works with leading AI
        providers like OpenAI, ElevenLabs and AssemblyAI.
      </p>
      <Snippet snippets={snippets} />
    </div>
  </section>
);
