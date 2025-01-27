import { ElevenLabsClient } from 'elevenlabs';
import type { TextToSpeechRequest } from 'elevenlabs/api';

/**
 * Map of available ElevenLabs model IDs
 */
const models = {
  multilingual_v2: 'eleven_multilingual_v2',
  flash_v2_5: 'eleven_flash_v2_5',
  flash_v2: 'eleven_flash_v2',
  turbo_v2: 'eleven_turbo_v2',
  turbo_v2_5: 'eleven_turbo_v2_5',
  multilingual_sts_v2: 'eleven_multilingual_sts_v2',
  english_sts_v2: 'eleven_english_sts_v2',
};

/**
 * Map of available ElevenLabs voice IDs
 */
const voices = {
  alice: 'Xb7hH8MSUJpSbSDYk0k2',
  aria: '9BWtsMINqrJLrRacOk9x',
  bill: 'pqHfZKP75CvOlQylNhV4',
  brian: 'nPczCjzI2devNBz1zQrb',
  callum: 'N2lVS1w4EtoT3dr4eOWO',
  charlie: 'IKne3meq5aSn9XLyUdCD',
  charlotte: 'XB0fDUnXU5powFXDhCwa',
  chris: 'iP95p4xoKVk53GoZ742B',
  daniel: 'onwK4e9ZLuTAKqWW03F9',
  eric: 'cjVigY5qzO86Huf0OWal',
  george: 'JBFqnCBsd6RMkjVDRZzb',
  jessica: 'cgSgspJ2msm6clMCkdW9',
  laura: 'FGY2WhTYpPnrIDTdsKH5',
  liam: 'TX3LPaxmHKxFdv7VOQHJ',
  lily: 'pFZP5JQG7iQjIQuC4Bku',
  matilda: 'XrExE9yKIg1WjnnlVkGX',
  river: 'SAz9YHcvj6GT2YYXdXww',
  roger: 'CwhRBWXzGAHq8TQ4Fs17',
  sarah: 'EXAVITQu4vr4xnSDxMaL',
  will: 'bIHbv24MWmeRgasZH58o',
};

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
    voice: keyof typeof voices | (string & {}) = 'aria',
    options?: Omit<TextToSpeechRequest, 'text' | 'model_id'>
  ) => {
    /**
     * Synthesizes text to speech using ElevenLabs
     * @param {string} prompt - The text to convert to speech
     * @returns {Promise<File>} The synthesized audio data
     * @throws {Error} If synthesis fails
     */
    return async (prompt: string) => {
      const provider = createProvider();
      let newVoice = voice;

      if (voice in voices) {
        newVoice = voices[voice as keyof typeof voices];
      }

      const response = await provider.textToSpeech.convert(newVoice, {
        text: prompt,
        model_id: models[model],
        ...options,
      });

      const chunks: Uint8Array[] = [];

      for await (const chunk of response) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);

      const file = new File([buffer], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  },
};
