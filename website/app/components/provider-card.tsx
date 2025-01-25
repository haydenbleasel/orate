import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

type ProviderCardProps = {
  id: string;
  provider: string;
  supports: ('speech' | 'transcription')[];
};

export const ProviderCard = ({ id, provider, supports }: ProviderCardProps) => (
  <Link
    href={`/docs/providers/${id}`}
    className="rounded-lg border p-0.5 no-underline"
  >
    <div className="flex aspect-video items-center justify-center rounded-[6px] bg-secondary">
      <Image
        src={`/providers/${id}.svg`}
        alt={provider}
        width={32}
        height={32}
        className="m-0 h-8 w-auto object-contain brightness-0 dark:invert"
      />
    </div>
    <div className="grid gap-4 p-4">
      <h2 className="m-0">{provider}</h2>
      <div className="grid gap-2">
        <p className="m-0 text-muted-foreground text-sm">Supports</p>
        <div className="flex flex-wrap gap-1">
          {supports.map((support) => (
            <Badge variant="outline" key={support} className="capitalize">
              {support}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </Link>
);
