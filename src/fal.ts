import { createFalClient } from '@fal-ai/client';
import type { WhisperInput, WizperInput } from '@fal-ai/client/endpoints';
import type { TranscribeOptions } from '.';

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

    const generate: TranscribeOptions['model']['generate'] = async (
      audio: File
    ) => {
      const file = await provider.storage.upload(audio);

      const response = await provider.subscribe(model, {
        input: {
          audio_url: file,
          ...properties,
        },
      });

      return response.data.text;
    };

    const stream: TranscribeOptions['model']['stream'] = async (
      audio: File
    ) => {
      const file = await provider.storage.upload(audio);

      const response = await provider.stream(model, {
        input: {
          audio_url: file,
          ...properties,
        },
      });

      return new ReadableStream({
        start(controller) {
          response.on('data', (data) => {
            controller.enqueue(data.text);
          });

          response.on('error', (error) => {
            controller.error(error);
          });

          response.on('done', () => {
            controller.close();
          });
        },
      });
    };

    return { generate, stream };
  }
}
