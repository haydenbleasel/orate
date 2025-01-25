import { AnimateProvider } from '@/app/providers/animate';
import Image from 'next/image';
import Link from 'next/link';
import AssemblyAI from '../../../public/providers/assembly.svg';
import Azure from '../../../public/providers/azure.svg';
import ElevenLabs from '../../../public/providers/elevenlabs.svg';
import Google from '../../../public/providers/google.svg';
import IBM from '../../../public/providers/ibm.svg';
import OpenAI from '../../../public/providers/openai.svg';

const providers = [
  { name: 'OpenAI', image: OpenAI, href: '/docs/openai' },
  { name: 'ElevenLabs', image: ElevenLabs, href: '/docs/elevenlabs' },
  { name: 'AssemblyAI', image: AssemblyAI, href: '/docs/assembly' },
  { name: 'Azure', image: Azure, href: '/docs/azure' },
  { name: 'IBM', image: IBM, href: '/docs/ibm' },
  { name: 'Google', image: Google, href: '/docs/google' },
];

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
    <div className="grid w-full grid-cols-2 items-center gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-6">
      {providers.map(({ name, image, href }, index) => (
        <AnimateProvider
          key={name}
          initial={{ opacity: 0, transform: 'translateY(-8px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          delay={0.1 * index}
        >
          <Link href={href}>
            <div className="flex items-center justify-center">
              <Image
                src={image}
                alt=""
                className="h-full max-h-7 w-full max-w-28 brightness-0 dark:invert"
              />
            </div>
          </Link>
        </AnimateProvider>
      ))}
    </div>
  </section>
);
