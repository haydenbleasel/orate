import Image from 'next/image';
import Link from 'next/link';
import Logo from './logo.svg';

export const Navbar = () => (
  <nav className="grid grid-cols-[100px_1fr_100px]">
    <Link href="/">
      <Image src={Logo} alt="Logo" width={100} height={100} />
    </Link>
  </nav>
);
