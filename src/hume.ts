import { HumeClient } from 'hume';
import type { PostedTts } from 'hume/api/resources/tts';

export class Hume {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.HUME_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('HUME_API_KEY is not set');
    }
  }

  private createProvider() {
    return new HumeClient({ apiKey: this.apiKey });
  }

  /**
   * Creates a text-to-speech synthesis function using Hume
   * @param {string} model - The model to use for synthesis, described in natural language.
   * @param {string} voice - The voice to use for synthesis.
   * @param {Omit<PostedTts, 'utterances' | 'format'>} properties - Additional properties for the synthesis request
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    model?: string,
    voice?: string,
    properties?: Omit<PostedTts, 'utterances' | 'format'>
  ) {
    const provider = this.createProvider();

    return async (prompt: string) => {
      const response = await provider.tts.synthesizeJson({
        utterances: [
          {
            description: model,
            voice: voice ? { name: voice } : undefined,
            text: prompt,
          },
        ],
        format: {
          type: 'wav',
        },
        ...properties,
      });

      const [generation] = response.generations;

      if (!generation) {
        throw new Error('No audio returned from Hume');
      }

      const base64 = Buffer.from(generation.audio, 'base64');
      const file = new File([base64], 'speech.wav', {
        type: 'audio/wav',
      });

      return file;
    };
  }
}
