import ky from 'ky';
import { useCallback, useState } from 'react';

type UseSpeechOptions = {
  endpoint: string;
};

/**
 * React hook for using Orate's speech functionality in a React application.
 *
 * @param options Configuration options for the speech hook
 * @returns Object containing the speak function
 *
 * @example
 * ```tsx
 * const { speak } = useSpeech({ endpoint: '/api/speech' });
 *
 * return (
 *   <button onClick={() => speak('Hello, world!')}>Speak</button>
 * );
 * ```
 */
export const useSpeech = (options: UseSpeechOptions) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const speak = useCallback(
    async (prompt: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await ky.post(options.endpoint, {
          json: { prompt },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        audio.play();

        return audio;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [options.endpoint]
  );

  return {
    speak,
    loading,
    error,
  };
};
