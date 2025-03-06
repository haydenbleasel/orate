import { cn } from '@/lib/utils';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

const code = `import { speak, transcribe, isolate, change } from 'orate';
import { ElevenLabs } from 'orate/elevenlabs';
import { AssemblyAI } from 'orate/assembly';
import { Azure } from 'orate/azure';
import { LMNT } from 'orate/lmnt';

const speech = await speak({
  model: new Azure().tts('en-US-AriaNeural'),
  prompt: 'Friends, Romans, countrymen, lend me your ears!'
});

const text = await transcribe({
  model: new AssemblyAI().stt('best'),
  audio,
});

const newSpeech = await change({
  model: new LMNT().sts('zeke'),
  audio,
});

const isolatedSpeech = await isolate({
  model: new ElevenLabs().isl(),
  audio: new File([], 'audio.wav'),
});`;

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
