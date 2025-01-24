import { Snippet } from '@/components/snippet';
import Image from 'next/image';
import Speech from './speech.jpg';

const code = `import { speak } from 'orate';
import { elevenlabs } from 'orate/elevenlabs';

const speech = await speak({
  model: elevenlabs.tts('multilingual_v2', 'aria'),
  prompt: 'Friends, Romans, countrymen, lend me your ears;'
});`;

export const TextToSpeech = () => (
  <section className="container mx-auto grid grid-cols-2 items-start gap-32 px-4 py-24">
    <div className="grid gap-6">
      <p className="text-muted-foreground">Text to speech</p>
      <h2 className="text-7xl">Generate realistic, human-like speech</h2>
      <p className="text-lg text-muted-foreground">
        Transform text into natural-sounding speech with a unified API that
        works with leading AI providers like OpenAI, ElevenLabs and AssemblyAI.
      </p>
      <Snippet code={code} />
    </div>
    <Image src={Speech} alt="Speech" />
  </section>
);
