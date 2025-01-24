import Image from 'next/image';
import AssemblyAI from './assemblyai.svg';
import Azure from './azure.svg';
import ElevenLabs from './elevenlabs.svg';
import Google from './google.svg';
import IBM from './ibm.svg';
import OpenAI from './openai.svg';

const images = [OpenAI, ElevenLabs, AssemblyAI, Azure, IBM, Google];

export const Providers = () => (
  <section className="container mx-auto grid gap-16 border-y px-4 py-16 text-center">
    <p className="font-medium text-muted-foreground text-sm">
      Plug and play your favorite AI provider
    </p>
    <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-6">
      {images.map((image) => (
        <div key={image.src} className="flex items-center justify-center">
          <Image
            src={image}
            alt=""
            className="h-full max-h-7 w-full max-w-28 brightness-0 dark:invert"
          />
        </div>
      ))}
    </div>
  </section>
);
