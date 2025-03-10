import ky from 'ky';

type CreateTTSResponse = {
  id: string;
  status: string;
};

type TTSStatusResponse = {
  status: string;
  run_id?: string;
};

type TTSResultResponse = {
  url: string;
};

export class CambAI {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.CAMBAI_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('CAMBAI_API_KEY is not set');
    }
  }

  private getApiKey() {
    return this.apiKey;
  }

  private async createTTSJob(
    text: string,
    voiceId: number,
    language: number,
    gender: number,
    age: number
  ) {
    const url = new URL('/apis/tts', 'https://client.camb.ai');

    const response = await ky
      .post(url, {
        json: {
          text,
          voice_id: voiceId,
          language,
          gender,
          age,
        },
        headers: {
          'x-api-key': this.getApiKey(),
          'Content-Type': 'application/json',
        },
      })
      .json<CreateTTSResponse>();

    return response.id;
  }

  private async getTTSStatus(id: string) {
    const url = new URL(`/apis/tts/${id}`, 'https://client.camb.ai');

    const response = await ky
      .get(url, {
        headers: {
          'x-api-key': this.getApiKey(),
        },
      })
      .json<TTSStatusResponse>();

    return response;
  }

  private async getTTSResult(runId: string) {
    const url = new URL(`/apis/tts-result/${runId}`, 'https://client.camb.ai');

    const response = await ky
      .get(url, {
        headers: {
          'x-api-key': this.getApiKey(),
        },
      })
      .json<TTSResultResponse>();

    return response.url;
  }

  /**
   * Creates a text-to-speech function using CambAI
   * @param {number} voiceId - The voice ID to use
   * @param {number} language - The language ID
   * @param {number} gender - The gender ID (0 or 1)
   * @param {number} age - The age category ID
   * @returns {Function} Async function that takes text and returns audio URL
   */
  tts(voiceId: number, language = 1, gender = 0, age = 2) {
    return async (text: string) => {
      const jobId = await this.createTTSJob(
        text,
        voiceId,
        language,
        gender,
        age
      );

      while (true) {
        const status = await this.getTTSStatus(jobId);

        if (status.status === 'completed' && status.run_id) {
          return await this.getTTSResult(status.run_id);
        }

        if (status.status === 'failed') {
          throw new Error('TTS job failed');
        }

        // If still processing, wait 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
  }
}
