import { Snippet } from './snippet';

const createSnippet = (
  provider: string,
  props?: string
) => `import { transcribe } from 'orate';
import { ${provider} } from 'orate/${provider}';
import audio from './audio.wav';

const text = await transcribe({
  model: new ${provider}().stt(${props ?? ''}),
  audio,
});`;

const snippets = [
  {
    provider: 'assembly',
    name: 'AssemblyAI',
    code: createSnippet('Assembly', "'best'"),
  },
  {
    provider: 'openai',
    name: 'OpenAI',
    code: createSnippet('OpenAI', "'whisper-1'"),
  },
  {
    provider: 'elevenlabs',
    name: 'ElevenLabs',
    code: createSnippet('ElevenLabs', "'scribe_v1'"),
  },
  {
    provider: 'azure',
    name: 'Azure',
    code: createSnippet('Azure', "'en-US-AvaMultilingualNeural'"),
  },
  {
    provider: 'google',
    name: 'Google',
    code: createSnippet(
      'Google',
      "'projects/{project}/locations/{region}/recognizers/{recognizer}'"
    ),
  },
  {
    provider: 'ibm',
    name: 'IBM',
    code: createSnippet('IBM', "'en-US_BroadbandModel'"),
  },
  {
    provider: 'gladia',
    name: 'Gladia',
    code: createSnippet('Gladia', "'enhanced'"),
  },
  {
    provider: 'rev',
    name: 'Rev AI',
    code: createSnippet('Rev', "'machine'"),
  },
  {
    provider: 'deepgram',
    name: 'Deepgram',
    code: createSnippet('Deepgram', "'nova-2'"),
  },
  {
    provider: 'groq',
    name: 'Groq',
    code: createSnippet('Groq', "'whisper-large-v3'"),
  },
  {
    provider: 'fal',
    name: 'Fal',
    code: createSnippet('Fal', "'fal-ai/whisper'"),
  },
  {
    provider: 'cleanvoice',
    name: 'CleanVoice',
    code: createSnippet('CleanVoice'),
  },
  {
    provider: 'jigsawstack',
    name: 'JigsawStack',
    code: createSnippet('JigsawStack'),
  },
  {
    provider: 'replicate',
    name: 'Replicate',
    code: `import { transcribe } from 'orate';
import { Replicate } from 'orate/replicate';
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
  model: new Replicate().stt(model, inputTransformer, outputTransformer),
  audio,
});`,
  },
];

export const SpeechToTextDemo = () => {
  return <Snippet data={snippets} />;
};
