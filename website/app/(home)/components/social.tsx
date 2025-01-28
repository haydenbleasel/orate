import { AnimateProvider } from '@/app/providers/animate';
import { Tweet } from 'react-tweet';
import Balancer from 'react-wrap-balancer';

const tweets = [
  '1884046066926104827',
  '1883976330330660918',
  '1883927107799245200',
  '1883929386610729192',
  '1883931558228418934',
  '1883941831634981072',
  '1883942356283736208',
  '1883948529758113970',
  '1883951025780150308',
  '1883952272910270912',
  '1883955187137798283',
  '1883996009736659225',
  '1884002039375749608',
  '1884016312344797686',
  '1884017247380988186',
  '1884026286382932388',
  '1884037205464867219',
  '1884041134416302218',
  '1884071306318209469',
  '1884096865458946546',
  '1884103988175630459',
  '1884118067204198637',
];

export const Social = () => (
  <section
    id="social"
    className="container mx-auto px-4 py-16 text-center sm:py-24"
  >
    <section className="grid lg:grid-cols-3">
      <div>
        <div className="sticky top-14">
          <AnimateProvider
            initial={{ opacity: 0, transform: 'translateY(-8px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            <h2 className="text-center text-4xl lg:text-left lg:text-5xl">
              <Balancer>Loved by the community</Balancer>
            </h2>
          </AnimateProvider>
        </div>
      </div>
      <div className="columns-1 gap-6 md:columns-2 lg:col-span-2">
        {tweets.map((tweet, index) => (
          <AnimateProvider
            key={tweet}
            initial={{ opacity: 0, transform: 'translateY(-8px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            <div key={tweet} className={index ? '' : 'lg:-mt-6'}>
              <Tweet id={tweet} />
            </div>
          </AnimateProvider>
        ))}
      </div>
    </section>
  </section>
);
