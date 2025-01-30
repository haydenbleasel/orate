import { AnimateProvider } from '@/app/providers/animate';
import { MarqueeProvider } from '@/app/providers/marquee';
import { cn } from '@/lib/utils';
import AssemblyAI from '@/public/providers/assembly.svg';
import Azure from '@/public/providers/azure.svg';
import CleanVoice from '@/public/providers/cleanvoice.svg';
import Deepgram from '@/public/providers/deepgram.svg';
import ElevenLabs from '@/public/providers/elevenlabs.svg';
import Fal from '@/public/providers/fal.svg';
import Gladia from '@/public/providers/gladia.svg';
import Google from '@/public/providers/google.svg';
import Groq from '@/public/providers/groq.svg';
import Hume from '@/public/providers/hume.svg';
import IBM from '@/public/providers/ibm.svg';
import JigsawStack from '@/public/providers/jigsaw-stack.svg';
import LMNT from '@/public/providers/lmnt.svg';
import Murf from '@/public/providers/murf.svg';
import OpenAI from '@/public/providers/openai.svg';
import Play from '@/public/providers/play.svg';
import Replicate from '@/public/providers/replicate.svg';
import Rev from '@/public/providers/rev.svg';
import Speechify from '@/public/providers/speechify.svg';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const providers = [
  { name: 'OpenAI', image: OpenAI, href: '/docs/providers/openai' },
  { name: 'ElevenLabs', image: ElevenLabs, href: '/docs/providers/elevenlabs' },
  { name: 'AssemblyAI', image: AssemblyAI, href: '/docs/providers/assembly' },
  { name: 'Azure', image: Azure, href: '/docs/providers/azure' },
  { name: 'IBM', image: IBM, href: '/docs/providers/ibm' },
  { name: 'Google', image: Google, href: '/docs/providers/google' },
  { name: 'Gladia', image: Gladia, href: '/docs/providers/gladia' },
  { name: 'Rev', image: Rev, href: '/docs/providers/rev' },
  { name: 'Murf', image: Murf, href: '/docs/providers/murf' },
  { name: 'Speechify', image: Speechify, href: '/docs/providers/speechify' },
  { name: 'Deepgram', image: Deepgram, href: '/docs/providers/deepgram' },
  { name: 'Replicate', image: Replicate, href: '/docs/providers/replicate' },
  { name: 'Groq', image: Groq, href: '/docs/providers/groq' },
  { name: 'Play', image: Play, href: '/docs/providers/play' },
  { name: 'Fal', image: Fal, href: '/docs/providers/fal' },
  { name: 'Hume', image: Hume, href: '/docs/providers/hume' },
  { name: 'LMNT', image: LMNT, href: '/docs/providers/lmnt' },
  { name: 'CleanVoice', image: CleanVoice, href: '/docs/providers/cleanvoice' },
  {
    name: 'JigsawStack',
    image: JigsawStack,
    href: '/docs/providers/jigsawstack',
  },
];

const MarqueeItem = ({ name, image, href }: (typeof providers)[number]) => (
  <Link
    href={href}
    className="group mx-8 block sm:mx-16 "
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
);

export const Providers = () => (
  <section
    id="providers"
    className="grid gap-8 overflow-hidden py-16 text-center"
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
      className="sm:-my-8 grid w-full gap-8 overflow-hidden sm:h-56 sm:py-8 [&>div]:flex"
    >
      <MarqueeProvider
        loop={0}
        autoFill
        className="overflow-visible! flex items-center"
      >
        {providers.slice(0, providers.length / 2).map((props) => (
          <MarqueeItem key={props.name} {...props} />
        ))}
      </MarqueeProvider>
      <MarqueeProvider
        loop={0}
        autoFill
        direction="right"
        className="overflow-visible! flex items-center"
      >
        {providers.slice(providers.length / 2).map((props) => (
          <MarqueeItem key={props.name} {...props} />
        ))}
      </MarqueeProvider>
    </AnimateProvider>
  </section>
);
