import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const links = [
  { href: '/#overview', label: 'Overview' },
  { href: '/#providers', label: 'Providers' },
  { href: '/#tts', label: 'Text-to-Speech' },
  { href: '/#stt', label: 'Speech-to-Text' },
];

export const Navbar = () => (
  <nav className="container sticky top-0 z-50 mx-auto grid grid-cols-[1fr_1fr] items-center bg-background/90 p-4 backdrop-blur-sm md:grid-cols-[100px_1fr_100px]">
    <Link href="/">
      <Logo />
    </Link>
    <div className="hidden items-center justify-center gap-8 text-sm md:flex">
      {links.map(({ href, label }) => (
        <a
          key={href}
          className="text-muted-foreground transition-colors hover:text-foreground"
          href={href}
        >
          {label}
        </a>
      ))}
    </div>
    <div className="flex items-center justify-end">
      <Button size="sm" variant="outline" asChild>
        <Link href="/#footer">Install</Link>
      </Button>
    </div>
  </nav>
);
