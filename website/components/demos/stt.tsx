import { Snippet } from '@/app/(home)/components/snippet';

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
    provider: 'elevenlabs',
    name: 'ElevenLabs',
    code: createSnippet('elevenlabs', "'scribe_v1'"),
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
    provider: 'groq',
    name: 'Groq',
    code: createSnippet('groq', "'whisper-large-v3'"),
  },
  {
    provider: 'fal',
    name: 'Fal',
    code: createSnippet('fal', "'fal-ai/whisper'"),
  },
  {
    provider: 'cleanvoice',
    name: 'CleanVoice',
    code: createSnippet('cleanvoice'),
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

export const SpeechToTextDemo = () => {
  return <Snippet snippets={snippets} />;
};
