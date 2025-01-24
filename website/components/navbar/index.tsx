import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './logo.svg';

export const Navbar = () => (
  <nav className="container sticky top-0 z-50 mx-auto grid grid-cols-[100px_1fr_100px] items-center bg-background/90 p-4 backdrop-blur-sm">
    <Link href="/">
      <Image
        src={Logo}
        alt="Logo"
        width={204}
        height={48}
        className="h-4 w-auto dark:invert"
      />
    </Link>
    <div className="flex items-center justify-center gap-4 text-sm">
      <a href="/#overview">Overview</a>
      <a href="/#docs">Docs</a>
    </div>
    <div className="flex items-center justify-end">
      <Button size="sm" variant="outline">
        Install
      </Button>
    </div>
  </nav>
);
