import Image from 'next/image';

import AppleIcon from './apple-icon.png';

const Home = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-black">
    <Image src={AppleIcon} alt="Apple Icon" width={96} height={96} />
  </div>
);

export default Home;
