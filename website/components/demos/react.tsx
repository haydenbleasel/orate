'use client';

import { useSpeech } from 'orate/react';
import { useEffect } from 'react';

export const ReactDemo = () => {
  const { speak, loading, error } = useSpeech({ endpoint: '/api/react-demo' });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => speak('Hello, world!')}
    >
      {loading ? 'Loading...' : 'Speak'}
    </button>
  );
};
