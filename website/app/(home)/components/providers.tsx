import { AnimateProvider } from '@/app/providers/animate';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import AssemblyAI from '../../../public/providers/assembly.svg';
import Azure from '../../../public/providers/azure.svg';
import Deepgram from '../../../public/providers/deepgram.svg';
import ElevenLabs from '../../../public/providers/elevenlabs.svg';
import Gladia from '../../../public/providers/gladia.svg';
import Google from '../../../public/providers/google.svg';
import IBM from '../../../public/providers/ibm.svg';
import Murf from '../../../public/providers/murf.svg';
import OpenAI from '../../../public/providers/openai.svg';
import Rev from '../../../public/providers/rev.svg';
import Speechify from '../../../public/providers/speechify.svg';

const providers = [
  { name: 'OpenAI', image: OpenAI, href: '/docs/openai' },
  { name: 'ElevenLabs', image: ElevenLabs, href: '/docs/elevenlabs' },
  { name: 'AssemblyAI', image: AssemblyAI, href: '/docs/assembly' },
  { name: 'Azure', image: Azure, href: '/docs/azure' },
  { name: 'IBM', image: IBM, href: '/docs/ibm' },
  { name: 'Google', image: Google, href: '/docs/google' },
  { name: 'Gladia', image: Gladia, href: '/docs/gladia' },
  { name: 'Rev', image: Rev, href: '/docs/rev' },
  { name: 'Murf', image: Murf, href: '/docs/murf' },
  { name: 'Speechify', image: Speechify, href: '/docs/speechify' },
  { name: 'Deepgram', image: Deepgram, href: '/docs/deepgram' },
];

export const Providers = () => (
  <section
    id="providers"
    className={cn(
      'container mx-auto grid gap-8 overflow-hidden border-y px-4 py-8 text-center',
      'sm:gap-16 sm:py-16'
    )}
  >
    <AnimateProvider
      initial={{ opacity: 0, transform: 'translateY(-8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
    >
      <p className="font-medium text-muted-foreground text-sm">
        Plug and play your favorite AI speech provider
      </p>
    </AnimateProvider>
    <AnimateProvider
      initial={{ opacity: 0, transform: 'translateY(-8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      delay={0.2}
      className="sm:-my-8 w-full overflow-hidden sm:h-24 sm:py-8"
    >
      <Marquee
        loop={0}
        autoFill
        pauseOnHover
        className="!overflow-visible flex items-center"
      >
        {providers.map(({ name, image, href }) => (
          <Link
            href={href}
            className="group mx-8 block sm:mx-16"
            key={name}
            aria-label={`View docs for ${name}`}
          >
            <div className="relative flex items-center justify-center">
              <Image
                src={image}
                alt=""
                className={cn(
                  'h-full w-full object-contain blur-0 brightness-0 transition-all duration-300 dark:invert',
                  'max-h-4 max-w-16',
                  'sm:max-h-8 sm:max-w-32',
                  'sm:group-hover:blur-lg'
                )}
              />
              <div
                className={cn(
                  '-translate-y-1/2 pointer-events-none absolute top-1/2 left-0 hidden w-full select-none items-center justify-center gap-1 text-center text-xs opacity-0 transition-all',
                  'sm:flex',
                  'group-hover:opacity-100'
                )}
              >
                <span>View docs</span>
                <ArrowRightIcon size={12} />
              </div>
            </div>
          </Link>
        ))}
      </Marquee>
      <div className="absolute top-0 bottom-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-secondary to-transparent dark:from-background" />
      <div className="absolute top-0 right-0 bottom-0 z-10 h-full w-24 bg-gradient-to-l from-secondary to-transparent dark:from-background" />
    </AnimateProvider>
  </section>
);
