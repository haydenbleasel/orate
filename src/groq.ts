import GroqSDK from 'groq-sdk';
import type { TranscriptionCreateParams } from 'groq-sdk/resources/audio/transcriptions';
import type { TranscribeOptions } from '.';

export class Groq {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GROQ_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('GROQ_API_KEY is not set');
    }
  }

  private createProvider() {
    return new GroqSDK({ apiKey: this.apiKey });
  }

  /**
   * Creates a speech-to-text transcription function using Groq
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'whisper-large-v3'
   * @param {Omit<TranscriptionCreateParams, 'model' | 'file'>} properties - Additional properties for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt(
    model: TranscriptionCreateParams['model'] = 'whisper-large-v3',
    properties?: Omit<TranscriptionCreateParams, 'model' | 'file'>
  ) {
    const provider = this.createProvider();

    const generate: TranscribeOptions['model']['generate'] = async (
      audio: File
    ) => {
      const response = await provider.audio.transcriptions.create({
        model,
        file: audio,
        ...properties,
      });

      return response.text;
    };

    return { generate };
  }
}
