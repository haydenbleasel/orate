'use client';

import { type CSSProperties, useEffect, useState } from 'react';

type WaveformProps = {
  bars?: number;
};

export const Waveform = ({ bars = 24 }: WaveformProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="inline-flex h-8 items-center justify-center gap-1">
      {new Array(bars).fill(0).map((_, i) => {
        const height = Math.random() * 100;
        const style = {
          '--bar-height': `${height}%`,
          height: 'var(--bar-height)',
          animationDuration: `${1 + Math.random()}s`,
        } as CSSProperties;

        return (
          <div
            key={i}
            className="w-1 animate-waveform bg-foreground/20"
            style={style}
          />
        );
      })}
    </div>
  );
};
