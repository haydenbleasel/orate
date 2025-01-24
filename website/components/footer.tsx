import Link from 'next/link';
import { Logo } from './logo';

export const Footer = () => (
  <nav className="container mx-auto grid grid-cols-[150px_1fr_150px] items-center justify-between p-4">
    <Link href="/">
      <Logo />
    </Link>
    <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
      <p>
        Made with love by{' '}
        <a
          href="https://www.haydenbleasel.com"
          // biome-ignore lint/a11y/noBlankTarget: "referral"
          target="_blank"
          className="underline transition-colors hover:text-foreground"
        >
          Hayden Bleasel
        </a>
      </p>
    </div>
    <div className="flex items-center justify-end">
      <Link
        href="https://github.com/haydenbleasel/orate"
        target="_blank"
        className="text-muted-foreground text-sm hover:underline"
      >
        View on GitHub
      </Link>
    </div>
  </nav>
);
