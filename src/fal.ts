import { fal as falClient } from '@fal-ai/client';
import type { WhisperInput, WizperInput } from '@fal-ai/client/endpoints';

type FalInput =
  | Omit<WhisperInput, 'audio_url'>
  | Omit<WizperInput, 'audio_url'>;

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
    return async (audio: File) => {
      const file = await falClient.storage.upload(audio);

      const response = await falClient.subscribe(model, {
        input: {
          audio_url: file,
          ...properties,
        },
      });

      return response.data.text;
    };
  },
};
