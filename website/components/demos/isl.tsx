import { Snippet } from './snippet';

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

export const SpeechIsolationDemo = () => {
  return <Snippet data={snippets} />;
};
