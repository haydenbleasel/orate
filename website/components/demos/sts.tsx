import { Snippet } from './snippet';

const createSnippet = (
  provider: string,
  path: string,
  props?: string
) => `import { change } from 'orate';
import { ${provider} } from 'orate/${path}';
import audio from './audio.wav';

const speech = await change({
  model: new ${provider}().sts(${props ?? ''}),
  audio,
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
  },
  {
    provider: 'lmnt',
    name: 'LMNT',
    code: createSnippet('LMNT', 'lmnt', "'zeke'"),
  },
  {
    provider: 'cartesia',
    name: 'Cartesia',
    code: createSnippet('Cartesia', 'cartesia', "'sonic-2', 'Silas'"),
  },
];

export const SpeechToSpeechDemo = () => {
  return <Snippet data={snippets} />;
};
