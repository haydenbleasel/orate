'use client';

import { useEffect, useRef, useState } from 'react';
import Marquee, { type MarqueeProps } from 'react-fast-marquee';

// https://github.com/justin-chu/react-fast-marquee/issues/66#issuecomment-1575052529
export const MarqueeProvider = (props: MarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
      }
    };

    // Set initial width
    updateWidth();

    // Create ResizeObserver to watch for size changes
    const observer = new ResizeObserver(updateWidth);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="w-full overflow-hidden" ref={ref}>
      <Marquee {...props} style={{ width }} />
    </div>
  );
};
