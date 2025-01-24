import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

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
      <pre className="rounded-md border px-4 py-2 text-sm">npm i orate</pre>
      <Link href="/#docs">Read more</Link>
    </div>
  </header>
);
