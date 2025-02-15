import { Installer } from '@/app/(home)/components/installer';
import { AnimateProvider } from '@/app/providers/animate';
import { Button } from '@/components/ui/button';
import Balancer from 'react-wrap-balancer';
import { Waveform } from './waveform';

export const Hero = () => (
  <header
    id="overview"
    className="container mx-auto grid items-center justify-center gap-6 px-4 py-16 text-center sm:py-24"
  >
    <Waveform />
    <AnimateProvider
      initial={{ opacity: 0, transform: 'translateY(-8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl">
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
          <a
            href="https://github.com/haydenbleasel/orate"
            target="_blank"
            rel="noreferrer noopener"
          >
            View on GitHub
          </a>
        </Button>
      </div>
    </AnimateProvider>
  </header>
);
