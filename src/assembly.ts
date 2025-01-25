import { AssemblyAI } from 'assemblyai';
import type { SpeechModel, TranscribeParams } from 'assemblyai';

/**
 * Creates an AssemblyAI provider instance with API key from environment variables
 * @returns {AssemblyAI} Configured AssemblyAI client instance
 * @throws {Error} If ASSEMBLYAI_API_KEY environment variable is not set
 */
const createProvider = () => {
  const apiKey = process.env.ASSEMBLYAI_API_KEY;

  if (!apiKey) {
    throw new Error('ASSEMBLYAI_API_KEY is not set');
  }

  return new AssemblyAI({ apiKey });
};

/**
 * AssemblyAI speech-to-text functionality
 */
export const assembly = {
  /**
   * Creates a speech-to-text transcription function using AssemblyAI
   * @param {SpeechModel} model - The speech model to use for transcription. Defaults to 'best'
   * @param {Omit<TranscribeParams, 'audio' | 'speech_model'>} options - Additional options for the transcription
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: SpeechModel = 'best',
    options?: Omit<TranscribeParams, 'audio' | 'speech_model'>
  ) => {
    const provider = createProvider();

    /**
     * Transcribes audio to text using AssemblyAI
     * @param {File} audio - The audio data to transcribe
     * @returns {Promise<string>} The transcribed text
     * @throws {Error} If transcription fails, is still processing/queued, or returns no text
     */
    return async (audio: File) => {
      const buffer = await audio.arrayBuffer();
      const audioBuffer = Buffer.from(buffer);

      const response = await provider.transcripts.transcribe({
        audio: audioBuffer,
        speech_model: model,
        ...options,
      });

      if (response.status === 'error') {
        throw new Error(response.error);
      }

      if (response.status === 'processing') {
        throw new Error('Processing');
      }

      if (response.status === 'queued') {
        throw new Error('Queued');
      }

      if (!response.text) {
        throw new Error('No text returned.');
      }

      return response.text;
    };
  },
};
