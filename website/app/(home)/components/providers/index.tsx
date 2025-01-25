import { AnimateProvider } from '@/app/providers/animate';
import Image from 'next/image';
import AssemblyAI from './assemblyai.svg';
import Azure from './azure.svg';
import ElevenLabs from './elevenlabs.svg';
import Google from './google.svg';
import IBM from './ibm.svg';
import OpenAI from './openai.svg';

const images = [OpenAI, ElevenLabs, AssemblyAI, Azure, IBM, Google];

export const Providers = () => (
  <section
    id="providers"
    className="container mx-auto grid gap-16 border-y px-4 py-16 text-center"
  >
    <AnimateProvider
      initial={{ opacity: 0, transform: 'translateY(-8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
    >
      <p className="font-medium text-muted-foreground text-sm">
        Plug and play your favorite AI provider
      </p>
    </AnimateProvider>
    <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-6">
      {images.map((image, index) => (
        <AnimateProvider
          key={image.src}
          initial={{ opacity: 0, transform: 'translateY(-8px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          delay={0.1 * index}
        >
          <div className="flex items-center justify-center">
            <Image
              src={image}
              alt=""
              className="h-full max-h-7 w-full max-w-28 brightness-0 dark:invert"
            />
          </div>
        </AnimateProvider>
      ))}
    </div>
  </section>
);
