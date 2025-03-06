import { Snippet } from './snippet';

const createSnippet = (
  provider: string,
  props?: string
) => `import { change } from 'orate';
import { ${provider} } from 'orate/${provider}';
import audio from './audio.wav';

const speech = await change({
  model: new ${provider}().sts(${props ?? ''}),
  audio,
});`;

const snippets = [
  {
    provider: 'elevenlabs',
    name: 'ElevenLabs',
    code: createSnippet('ElevenLabs', "'multilingual_v2', 'aria'"),
  },
  {
    provider: 'lmnt',
    name: 'LMNT',
    code: createSnippet('LMNT', "'zeke'"),
  },
];

export const SpeechToSpeechDemo = () => {
  return <Snippet data={snippets} />;
};
