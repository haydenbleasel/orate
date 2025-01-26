import { type AudioSpeechRequest, Speechify } from '@speechify/api-sdk';

/**
 * Creates an Speechify provider instance with API key from environment variables
 * @returns {Speechify} Configured Speechify client instance
 * @throws {Error} If SPEECHIFY_API_KEY environment variable is not set
 */
const createProvider = () => {
  const apiKey = process.env.SPEECHIFY_API_KEY;

  if (!apiKey) {
    throw new Error('SPEECHIFY_API_KEY is not set');
  }

  return new Speechify({ apiKey });
};

/**
 * Speechify Speech Services functionality for text-to-speech and speech-to-text
 */
export const speechify = {
  /**
   * Creates a text-to-speech synthesis function using Speechify TTS
   * @param {AudioSpeechRequest["model"]} model - The model to use for synthesis. Defaults to 'tts-1'
   * @param {AudioSpeechRequest["voiceId"]} voice - The voice to use for synthesis. Defaults to 'alloy'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: AudioSpeechRequest['model'] = 'simba-multilingual',
    voice: AudioSpeechRequest['voiceId'] = 'george',
    properties?: Omit<AudioSpeechRequest, 'model' | 'voiceId' | 'input'>
  ) => {
    const provider = createProvider();

    /**
     * Synthesizes text to speech using Speechify TTS
     * @param {string} prompt - The text to convert to speech
     * @returns {Promise<File>} The synthesized audio data
     */
    return async (prompt: string) => {
      const response = await provider.audioGenerate({
        input: prompt,
        voiceId: voice,
        model: model,
        audioFormat: 'mp3',
        ...properties,
      });

      const file = new File([response.audioData], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  },
};
