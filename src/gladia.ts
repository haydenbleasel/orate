import ky from 'ky';
import type { TranscribeOptions } from '.';

type TranscribeResponse = {
  result_url: string;
};

type UploadResponse = {
  audio_url: string;
};

type GetTranscriptionResponse = {
  status: 'queued' | 'processing' | 'done' | 'error';
  result?: {
    transcription?: {
      full_transcript?: string;
    };
  };
};

export class Gladia {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GLADIA_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('GLADIA_API_KEY is not set');
    }
  }

  private getApiKey() {
    return this.apiKey;
  }

  private async uploadFile(file: File) {
    const body = new FormData();
    const url = new URL('/v2/upload', 'https://api.gladia.io');

    body.append('audio', file);

    const response = await ky
      .post(url, {
        body,
        headers: {
          'x-gladia-key': this.getApiKey(),
        },
      })
      .json<UploadResponse>();

    return response.audio_url;
  }

  private async transcribe(audioUrl: string, model: string, options?: object) {
    const url = new URL('/v2/pre-recorded', 'https://api.gladia.io');

    const response = await ky
      .post(url, {
        json: {
          ...options,
          audio_url: audioUrl,
          translation_config: {
            ...(options
              ? (options as { translation_config: object }).translation_config
              : {}),
            model,
          },
        },
        headers: {
          'x-gladia-key': this.getApiKey(),
        },
      })
      .json<TranscribeResponse>();

    return response.result_url;
  }

  private async getTranscription(transcriptionUrl: string) {
    const response = await ky
      .get(transcriptionUrl, {
        headers: {
          'x-gladia-key': this.getApiKey(),
        },
      })
      .json<GetTranscriptionResponse>();

    if (response.status === 'error') {
      throw new Error(`Error: ${response.status}`);
    }

    if (response.status === 'done') {
      if (!response.result?.transcription?.full_transcript) {
        throw new Error('No transcription');
      }

      return response.result.transcription.full_transcript;
    }
  }

  /**
   * Creates a speech-to-text transcription function using Gladia
   * @param {'base' | 'enhanced'} model - The model to use for transcription. Defaults to 'base'
   * @param {object} options - Additional options for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt(model: 'base' | 'enhanced' = 'base', options?: object) {
    const generate: TranscribeOptions['model']['generate'] = async (
      audio: File
    ) => {
      const audioUrl = await this.uploadFile(audio);
      const transcriptionUrl = await this.transcribe(audioUrl, model, options);

      while (true) {
        const text = await this.getTranscription(transcriptionUrl);

        if (text) {
          return text;
        }

        // If queued or processing, wait 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    return { generate };
  }
}
