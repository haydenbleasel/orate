import Link from 'next/link';
import { Logo } from './logo';

export const Footer = () => (
  <footer
    id="footer"
    className="container mx-auto items-center justify-between px-4 py-8 sm:grid sm:grid-cols-[150px_1fr_150px]"
  >
    <Link href="/" className="hidden sm:block">
      <Logo />
    </Link>
    <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
      <p>
        Made with love by{' '}
        <a
          href="https://www.haydenbleasel.com"
          target="_blank"
          rel="noreferrer noopener"
          className="underline transition-colors hover:text-foreground"
        >
          Hayden Bleasel
        </a>
      </p>
    </div>
    <div className="hidden items-center justify-end gap-4 sm:flex">
      <a
        href="https://www.npmjs.com/package/orate"
        target="_blank"
        rel="noreferrer noopener"
        className="text-muted-foreground text-sm hover:underline"
      >
        NPM
      </a>
      <a
        href="https://github.com/haydenbleasel/orate"
        target="_blank"
        rel="noreferrer noopener"
        className="text-muted-foreground text-sm hover:underline"
      >
        GitHub
      </a>
    </div>
  </footer>
);
