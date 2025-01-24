import { ElevenLabsClient } from 'elevenlabs';
import type { TextToSpeechRequest } from 'elevenlabs/api';
import { models } from './models';
import { voices } from './voices';

/**
 * Creates an ElevenLabs provider instance with API key from environment variables
 * @returns {ElevenLabsClient} Configured ElevenLabs client instance
 * @throws {Error} If ELEVENLABS_API_KEY environment variable is not set
 */
const createProvider = () => {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not set');
  }

  return new ElevenLabsClient({ apiKey });
};

/**
 * ElevenLabs text-to-speech functionality
 */
export const elevenlabs = {
  /**
   * Creates a text-to-speech synthesis function using ElevenLabs
   * @param {keyof typeof models} model - The model ID to use for synthesis. Defaults to 'multilingual_v2'
   * @param {keyof typeof voices} voice - The voice ID to use for synthesis. Defaults to 'aria'
   * @param {Omit<TextToSpeechRequest, 'text' | 'model_id'>} options - Additional options for the synthesis
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: keyof typeof models = 'multilingual_v2',
    voice: keyof typeof voices = 'aria',
    options?: Omit<TextToSpeechRequest, 'text' | 'model_id'>
  ) => {
    /**
     * Synthesizes text to speech using ElevenLabs
     * @param {string} prompt - The text to convert to speech
     * @returns {Promise<ArrayBuffer>} The synthesized audio data
     * @throws {Error} If synthesis fails
     */
    return async (prompt: string) => {
      const provider = createProvider();

      const response = await provider.textToSpeech.convert(voices[voice], {
        text: prompt,
        model_id: models[model],
        ...options,
      });

      const chunks: Uint8Array[] = [];

      for await (const chunk of response) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);
      const arrayBuffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      );

      return arrayBuffer;
    };
  },
};
