import Groq from 'groq-sdk';
import type { TranscriptionCreateParams } from 'groq-sdk/resources/audio/transcriptions';

/**
 * Creates a Groq provider instance with API key from environment variables
 * @returns {Groq} Configured Groq client instance
 * @throws {Error} If GROQ_API_KEY environment variable is not set
 */
const createProvider = () => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not set');
  }

  return new Groq({ apiKey });
};

/**
 * Groq Speech Services functionality for text-to-speech and speech-to-text
 */
export const groq = {
  /**
   * Creates a speech-to-text transcription function using Groq
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'whisper-large-v3'
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: TranscriptionCreateParams['model'] = 'whisper-large-v3',
    properties?: Omit<TranscriptionCreateParams, 'model' | 'file'>
  ) => {
    const provider = createProvider();

    /**
     * Transcribes audio to text using OpenAI Whisper
     * @param {File} audio - The audio data to transcribe
     * @returns {Promise<string>} The transcribed text
     */
    return async (audio: File) => {
      const response = await provider.audio.transcriptions.create({
        model,
        file: audio,
        ...properties,
      });

      return response.text;
    };
  },
};
