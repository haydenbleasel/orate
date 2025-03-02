import { cn } from '@/lib/utils';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

const code = `import { speak, transcribe, isolate, change } from 'orate';
import { elevenlabs } from 'orate/elevenlabs';
import { assembly } from 'orate/assembly';
import { azure } from 'orate/azure';
import { lmnt } from 'orate/lmnt';

const speech = await speak({
  model: azure.tts('en-US-AriaNeural'),
  prompt: 'Friends, Romans, countrymen, lend me your ears!'
});

const text = await transcribe({
  model: assembly.stt('best'),
  audio,
});

const newSpeech = await change({
  model: lmnt.sts('zeke'),
  audio,
});

const isolatedSpeech = await isolate({
  model: elevenlabs.isl(),
  audio: new File([], 'audio.wav'),
});
`;

export const HeroSnippet = () => (
  <div
    className={cn(
      '[&>figure]:rounded-none',
      '[&>figure]:border-none',
      '[&>figure]:text-base',
      '[&_pre]:p-6'
    )}
  >
    <DynamicCodeBlock lang="typescript" code={code} />
  </div>
);
