import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';
import LogoImage from './logo.svg';

type LogoProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>;

export const Logo = ({ ...props }: LogoProps) => (
  <Image
    src={LogoImage}
    alt="Logo"
    width={204}
    height={48}
    className={cn('h-4 w-auto dark:invert', props.className)}
  />
);
