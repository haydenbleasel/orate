import { Snippet } from '@/app/(home)/components/snippet';

const createSnippet = (
  provider: string,
  props?: string
) => `import { speak } from 'orate';
import { ${provider} } from 'orate/${provider}';

const speech = await speak({
  model: ${provider}.tts(${props ?? ''}),
  prompt: 'Friends, Romans, countrymen, lend me your ears!'
});`;

const snippets = [
  {
    provider: 'elevenlabs',
    name: 'ElevenLabs',
    code: createSnippet('elevenlabs', "'multilingual_v2', 'aria'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/elevenlabs.wav" controls />
    ),
  },
  {
    provider: 'openai',
    name: 'OpenAI',
    code: createSnippet('openai', "'tts-1', 'alloy'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/openai.wav" controls />
    ),
  },
  {
    provider: 'azure',
    name: 'Azure',
    code: createSnippet('azure', "'en-US-AriaNeural'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/azure.wav" controls />
    ),
  },
  {
    provider: 'azureOpenai',
    name: 'Azure OpenAI',
    code: createSnippet('azureOpenai', "'tts', 'alloy'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/azure.openai.wav" controls />
    ),
  },
  {
    provider: 'google',
    name: 'Google',
    code: createSnippet('google', "'en-US-Casual-K'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/google.wav" controls />
    ),
  },
  {
    provider: 'ibm',
    name: 'IBM',
    code: createSnippet('ibm', "'en-US_BroadbandModel'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/ibm.wav" controls />
    ),
  },
  {
    provider: 'murf',
    name: 'Murf',
    code: createSnippet('murf', "'GEN2', 'en-US-natalie'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/murf.wav" controls />
    ),
  },
  {
    provider: 'deepgram',
    name: 'Deepgram',
    code: createSnippet('deepgram', "'aura', 'asteria-en'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/deepgram.wav" controls />
    ),
  },
  {
    provider: 'speechify',
    name: 'Speechify',
    code: createSnippet('speechify', "'simba-multilingual', 'george'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/speechify.wav" controls />
    ),
  },
  {
    provider: 'play',
    name: 'Play',
    code: createSnippet('play', "'PlayDialog', 'Angelo'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/play.wav" controls />
    ),
  },
  {
    provider: 'hume',
    name: 'Hume',
    code: createSnippet('hume', "'A Roman senator'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/hume.wav" controls />
    ),
  },
  {
    provider: 'lmnt',
    name: 'LMNT',
    code: createSnippet('lmnt', "'blizzard', 'zeke'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/lmnt.wav" controls />
    ),
  },
  {
    provider: 'replicate',
    name: 'Replicate',
    code: `import { speak } from 'orate';
import { replicate } from 'orate/replicate';

const model = 'jaaari/kokoro-82m:dfdf537ba482b029e0a761699e6f55e9162cfd159270bfe0e44857caa5f275a6';

const inputTransformer = (prompt: string) => ({
  input: { text: prompt },
});

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

  const blob = new Blob(chunks, { type: 'audio/mpeg' });

  return new File([blob], 'speech.mp3', {
    type: 'audio/mpeg',
  });
};

const speech = await speak({
  model: replicate.tts(model, inputTransformer, outputTransformer),
  prompt: 'Friends, Romans, countrymen, lend me your ears!'
});`,
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/replicate.wav" controls />
    ),
  },
];

export const TextToSpeechDemo = () => {
  return <Snippet data={snippets} />;
};
