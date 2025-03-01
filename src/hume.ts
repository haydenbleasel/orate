import { HumeClient } from 'hume';
import type { PostedTts } from 'hume/api/resources/tts';

const createProvider = () => {
  const apiKey = process.env.HUME_API_KEY;

  if (!apiKey) {
    throw new Error('HUME_API_KEY is not set');
  }

  return new HumeClient({ apiKey });
};

export const hume = {
  /**
   * Creates a text-to-speech synthesis function using Hume
   * @param {string} model - The model to use for synthesis, described in natural language.
   * @param {string} voice - The voice to use for synthesis.
   * @param {Omit<PostedTts, 'utterances' | 'format'>} properties - Additional properties for the synthesis request
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: string,
    voice: string,
    properties?: Omit<PostedTts, 'utterances' | 'format'>
  ) => {
    const provider = createProvider();

    return async (prompt: string) => {
      const response = await provider.tts.synthesizeJson({
        utterances: [
          {
            description: model,
            voice: voice ? { name: voice } : undefined,
            text: prompt,
          },
        ],
        format: {
          type: 'mp3',
        },
        ...properties,
      });

      const buffer = response.generations.at(0)?.audio;

      console.log(buffer, 'buffer');

      if (!buffer) {
        throw new Error('No buffer');
      }

      const file = new File([buffer], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  },
};
