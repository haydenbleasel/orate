import { AnimateProvider } from '@/app/providers/animate';
import Balancer from 'react-wrap-balancer';
import { Installer } from './installer';

export const CallToAction = () => (
  <div className="container mx-auto grid items-center justify-center gap-6 px-4 py-16 text-center sm:py-24">
    <AnimateProvider
      initial={{ opacity: 0, transform: 'translateY(-8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
    >
      <p className="text-4xl sm:text-5xl">
        <Balancer>Install and use in seconds</Balancer>
      </p>
    </AnimateProvider>
    <AnimateProvider
      initial={{ opacity: 0, transform: 'translateY(-8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      delay={0.2}
    >
      <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
        <Balancer>
          Install Orate with your favorite package manager and start speaking
          and transcribing audio in seconds.
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
      </div>
    </AnimateProvider>
  </div>
);
