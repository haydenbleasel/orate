import { Installer } from '@/components/installer';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import { Button } from './ui/button';

export const Hero = () => (
  <header className="container mx-auto grid items-center justify-center gap-6 px-4 py-24 text-center">
    <p className="text-7xl">
      <Balancer>The AI toolkit for speech</Balancer>
    </p>
    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
      <Balancer>
        Create realistic, human-like speech and transcribe audio with a unified
        API that works with leading AI providers like OpenAI, ElevenLabs and
        AssemblyAI.
      </Balancer>
    </p>
    <div className="flex items-center justify-center gap-4">
      <Installer code="npm i orate" />
      <Button asChild variant="link" size="lg" className="px-4">
        <Link href="https://github.com/haydenbleasel/orate">
          View on GitHub
        </Link>
      </Button>
    </div>
  </header>
);
