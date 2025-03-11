import { Snippet } from './snippet';

const createSnippet = (
  provider: string,
  path: string,
  props?: string
) => `import { speak } from 'orate';
import { ${provider} } from 'orate/${path}';

const speech = await speak({
  model: new ${provider}().tts(${props ?? ''}),
  prompt: 'Friends, Romans, countrymen, lend me your ears!'
});`;

const snippets = [
  {
    provider: 'elevenlabs',
    name: 'ElevenLabs',
    code: createSnippet(
      'ElevenLabs',
      'elevenlabs',
      "'multilingual_v2', 'aria'"
    ),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/elevenlabs.wav" controls />
    ),
  },
  {
    provider: 'openai',
    name: 'OpenAI',
    code: createSnippet('OpenAI', 'openai', "'tts-1', 'alloy'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/openai.wav" controls />
    ),
  },
  {
    provider: 'azure',
    name: 'Azure',
    code: createSnippet('Azure', 'azure', "'en-US-AriaNeural'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/azure.wav" controls />
    ),
  },
  {
    provider: 'azureOpenai',
    name: 'Azure OpenAI',
    code: createSnippet('AzureOpenAI', 'azure.openai', "'tts', 'alloy'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/azure.openai.wav" controls />
    ),
  },
  {
    provider: 'google',
    name: 'Google',
    code: createSnippet('Google', 'google', "'en-US-Casual-K'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/google.wav" controls />
    ),
  },
  {
    provider: 'ibm',
    name: 'IBM',
    code: createSnippet('IBM', 'ibm', "'en-US_BroadbandModel'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/ibm.wav" controls />
    ),
  },
  {
    provider: 'murf',
    name: 'Murf',
    code: createSnippet('Murf', 'murf', "'GEN2', 'en-US-natalie'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/murf.wav" controls />
    ),
  },
  {
    provider: 'deepgram',
    name: 'Deepgram',
    code: createSnippet('Deepgram', 'deepgram', "'aura', 'asteria-en'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/deepgram.wav" controls />
    ),
  },
  {
    provider: 'speechify',
    name: 'Speechify',
    code: createSnippet(
      'Speechify',
      'speechify',
      "'simba-multilingual', 'george'"
    ),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/speechify.wav" controls />
    ),
  },
  {
    provider: 'play',
    name: 'Play',
    code: createSnippet('Play', 'play', "'PlayDialog', 'Angelo'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/play.wav" controls />
    ),
  },
  {
    provider: 'hume',
    name: 'Hume',
    code: createSnippet('Hume', 'hume', "'A Roman senator'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/hume.wav" controls />
    ),
  },
  {
    provider: 'lmnt',
    name: 'LMNT',
    code: createSnippet('LMNT', 'lmnt', "'blizzard', 'zeke'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/lmnt.wav" controls />
    ),
  },
  {
    provider: 'jigsawstack',
    name: 'JigsawStack',
    code: createSnippet('JigsawStack', 'jigsawstack', "'en-US-female-27'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/jigsawstack.wav" controls />
    ),
  },
  {
    provider: 'lemonfox',
    name: 'LemonFox',
    code: createSnippet('LemonFox', 'lemonfox', "'en-US', 'sarah'"),
    children: (
      // biome-ignore lint/a11y/useMediaCaption: 'inline demo'
      <audio className="w-full" src="/examples/tts/lemonfox.wav" controls />
    ),
  },
  {
    provider: 'replicate',
    name: 'Replicate',
    code: `import { speak } from 'orate';
import { Replicate } from 'orate/replicate';

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
  model: new Replicate().tts(model, inputTransformer, outputTransformer),
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
