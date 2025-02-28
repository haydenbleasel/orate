import { createFalClient } from '@fal-ai/client';
import type { WhisperInput, WizperInput } from '@fal-ai/client/endpoints';

type FalInput =
  | Omit<WhisperInput, 'audio_url'>
  | Omit<WizperInput, 'audio_url'>;

const createProvider = () => {
  const credentials = process.env.FAL_API_KEY;

  if (!credentials) {
    throw new Error('FAL_API_KEY is not set');
  }

  return createFalClient({ credentials });
};

export const fal = {
  /**
   * Creates a speech-to-text transcription function using Fal
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'whisper-1'
   * @param {Omit<TranscriptionCreateParams, 'model' | 'file'>} properties - Additional properties for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: 'fal-ai/whisper' | 'fal-ai/wizper' = 'fal-ai/whisper',
    properties?: FalInput
  ) => {
    const provider = createProvider();

    return async (audio: File) => {
      const file = await provider.storage.upload(audio);

      const response = await provider.subscribe(model, {
        input: {
          audio_url: file,
          ...properties,
        },
      });

      return response.data.text;
    };
  },
};
