import { AnimateProvider } from '@/app/providers/animate';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
  { name: 'Deepgram', image: Deepgram, href: '/docs/deepgram' },
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
    <div className="grid w-full grid-cols-2 items-center gap-x-4 gap-y-12 sm:grid-cols-3 md:grid-cols-4">
      {providers.map(({ name, image, href }, index) => (
        <AnimateProvider
          key={name}
          initial={{ opacity: 0, transform: 'translateY(-8px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          delay={0.1 * index}
        >
          <Link href={href} className="group">
            <div className="relative flex items-center justify-center">
              <Image
                src={image}
                alt=""
                className={cn(
                  'h-full max-h-7 w-full max-w-28 blur-0 brightness-0 transition-all duration-300 dark:invert',
                  'group-hover:blur-lg'
                )}
              />
              <div
                className={cn(
                  '-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 flex select-none items-center gap-1 text-xs opacity-0 transition-all',
                  'group-hover:opacity-100'
                )}
              >
                <span>View docs</span>
                <ArrowRightIcon size={12} />
              </div>
            </div>
          </Link>
        </AnimateProvider>
      ))}
    </div>
  </section>
);
