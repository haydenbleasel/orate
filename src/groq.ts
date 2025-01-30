import Groq from 'groq-sdk';
import type { TranscriptionCreateParams } from 'groq-sdk/resources/audio/transcriptions';

const createProvider = () => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not set');
  }

  return new Groq({ apiKey });
};

export const groq = {
  /**
   * Creates a speech-to-text transcription function using Groq
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'whisper-large-v3'
   * @param {Omit<TranscriptionCreateParams, 'model' | 'file'>} properties - Additional properties for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: TranscriptionCreateParams['model'] = 'whisper-large-v3',
    properties?: Omit<TranscriptionCreateParams, 'model' | 'file'>
  ) => {
    const provider = createProvider();

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
