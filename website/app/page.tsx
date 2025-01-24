import { CallToAction } from '@/components/cta';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Providers } from '@/components/providers';
import { SpeechToText } from '@/components/speech-to-text';
import { TextToSpeech } from '@/components/text-to-speech';

const Home = () => (
  <>
    <Hero />
    <Providers />
    <TextToSpeech />
    <SpeechToText />
    <CallToAction />
    <Footer />
  </>
);

export default Home;
