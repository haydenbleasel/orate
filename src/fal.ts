import { createFalClient } from '@fal-ai/client';
import type { WhisperInput, WizperInput } from '@fal-ai/client/endpoints';

type FalInput =
  | Omit<WhisperInput, 'audio_url'>
  | Omit<WizperInput, 'audio_url'>;

export class Fal {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.FAL_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('FAL_API_KEY is not set');
    }
  }

  private createProvider() {
    return createFalClient({ credentials: this.apiKey });
  }

  /**
   * Creates a speech-to-text transcription function using Fal
   * @param {string} model - The model to use for transcription. Defaults to 'fal-ai/whisper'
   * @param {FalInput} properties - Additional properties for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt(
    model: 'fal-ai/whisper' | 'fal-ai/wizper' = 'fal-ai/whisper',
    properties?: FalInput
  ) {
    const provider = this.createProvider();

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
  }
}
