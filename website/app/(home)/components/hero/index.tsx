import { Installer } from '@/app/(home)/components/installer';
import { AnimateProvider } from '@/app/providers/animate';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import { Providers } from '../providers';
import Speech from '../text-to-speech/speech.jpg';
import { HeroSnippet } from './snippet';
import { Waveform } from './waveform';

export const Hero = () => (
  <div className="grid h-[calc(100dvh-var(--fd-nav-height))] grid-cols-2 divide-x overflow-hidden">
    <div className="flex items-end justify-start p-16">
      <div className="flex flex-col items-start gap-8">
        <Waveform />
        <AnimateProvider
          initial={{ opacity: 0, transform: 'translateY(-8px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        >
          <h1 className="text-5xl sm:text-6xl">
            <Balancer>The AI toolkit for speech</Balancer>
          </h1>
        </AnimateProvider>
        <AnimateProvider
          initial={{ opacity: 0, transform: 'translateY(-8px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          delay={0.2}
        >
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            <Balancer>
              Create realistic, human-like speech and transcribe audio with a
              unified API that works with leading AI providers like OpenAI,
              ElevenLabs and AssemblyAI.
            </Balancer>
          </p>
        </AnimateProvider>
        <AnimateProvider
          initial={{ opacity: 0, transform: 'translateY(-8px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          delay={0.4}
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Installer code="npm i orate" />
            <Button asChild variant="link" size="lg" className="px-4">
              <Link href="/docs">Read the docs</Link>
            </Button>
          </div>
        </AnimateProvider>
      </div>
    </div>
    <div className="grid grid-rows-2 divide-y overflow-hidden">
      <div className="grid overflow-hidden">
        <HeroSnippet />
      </div>
      <div className="flex divide-x">
        <Image src={Speech} alt="Speech" className="h-full w-auto" />
        <Providers />
      </div>
    </div>
  </div>
);
