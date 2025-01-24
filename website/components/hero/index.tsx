import { Installer } from '@/components/installer';
import { Button } from '@/components/ui/button';
import { AnimateProvider } from '@/providers/animate';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import { Waveform } from './waveform';

export const Hero = () => (
  <header
    id="overview"
    className="container mx-auto grid items-center justify-center gap-6 px-4 py-24 text-center"
  >
    <Waveform />
    <AnimateProvider
      initial={{ opacity: 0, transform: 'translateY(-8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
    >
      <p className="text-7xl">
        <Balancer>The AI toolkit for speech</Balancer>
      </p>
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
      <div className="flex items-center justify-center gap-4">
        <Installer code="npm i orate" />
        <Button asChild variant="link" size="lg" className="px-4">
          <Link href="https://github.com/haydenbleasel/orate">
            View on GitHub
          </Link>
        </Button>
      </div>
    </AnimateProvider>
  </header>
);
