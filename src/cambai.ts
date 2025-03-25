import ky from 'ky';
import type { SpeakOptions } from '.';

type CreateTextToSpeechRequest = {
  text: string;
  voice_id: number;
  language: number;
  gender: 0 | 1 | 2 | 9;
  age?: number;
};

type CreateTextToSpeechResponse = {
  task_id: string;
};

type GetTextToSpeechStatusResponse = {
  status: 'SUCCESS' | 'PENDING' | 'TIMEOUT' | 'ERROR' | 'PAYMENT_REQUIRED';
  run_id?: string;
};

type GetTextToSpeechResultResponse = string;

const CambAILanguages = {
  'en-us': 1,
  'af-za': 2,
  'am-et': 3,
  'ar-ae': 4,
  'ar-bh': 5,
  'ar-dz': 6,
  'ar-eg': 7,
  'ar-iq': 8,
  'ar-jo': 9,
  'ar-kw': 10,
  'ar-lb': 11,
  'ar-ly': 12,
  'ar-ma': 13,
  'ar-om': 14,
  'ar-qa': 15,
  'ar-sa': 16,
  'ar-sy': 17,
  'ar-tn': 18,
  'ar-ye': 19,
  'az-az': 20,
  'bg-bg': 21,
  'bn-bd': 22,
  'bn-in': 23,
  'bs-ba': 24,
  'ca-es': 25,
  'cs-cz': 26,
  'cy-gb': 27,
  'da-dk': 28,
  'de-at': 29,
  'de-ch': 30,
  'de-de': 31,
  'el-gr': 32,
  'en-au': 33,
  'en-ca': 34,
  'en-gb': 35,
  'en-hk': 36,
  'en-ie': 37,
  'en-in': 38,
  'en-ke': 39,
  'en-ng': 40,
  'en-nz': 41,
  'en-ph': 42,
  'en-sg': 43,
  'en-tz': 44,
  'en-za': 45,
  'es-ar': 46,
  'es-bo': 47,
  'es-cl': 48,
  'es-co': 49,
  'es-cr': 50,
  'es-cu': 51,
  'es-do': 52,
  'es-ec': 53,
  'es-es': 54,
  'es-gq': 55,
  'es-gt': 56,
  'es-hn': 57,
  'es-mx': 58,
  'es-ni': 59,
  'es-pa': 60,
  'es-pe': 61,
  'es-pr': 62,
  'es-py': 63,
  'es-sv': 64,
  'es-us': 65,
  'es-uy': 66,
  'es-ve': 67,
  'et-ee': 68,
  'eu-es': 69,
  'fa-ir': 70,
  'fi-fi': 71,
  'fr-be': 73,
  'fr-ca': 74,
  'fr-ch': 75,
  'fr-fr': 76,
  'gl-es': 78,
  'gu-in': 79,
  'he-il': 80,
  'hi-in': 81,
  'hr-hr': 82,
  'hu-hu': 83,
  'hy-am': 84,
  'id-id': 85,
  'is-is': 86,
  'it-it': 87,
  'ja-jp': 88,
  'ka-ge': 90,
  'kk-kz': 91,
  'km-kh': 92,
  'kn-in': 93,
  'ko-kr': 94,
  'lo-la': 95,
  'lt-lt': 96,
  'lv-lv': 97,
  'mk-mk': 98,
  'ml-in': 99,
  'mn-mn': 100,
  'mr-in': 101,
  'ms-my': 102,
  'mt-mt': 103,
  'my-mm': 104,
  'ne-np': 106,
  'nl-be': 107,
  'nl-nl': 108,
  'pl-pl': 109,
  'ps-af': 110,
  'pt-br': 111,
  'pt-pt': 112,
  'ro-ro': 113,
  'ru-ru': 114,
  'si-lk': 115,
  'sk-sk': 116,
  'sl-si': 117,
  'so-so': 118,
  'sq-al': 119,
  'sr-rs': 120,
  'su-id': 121,
  'sv-se': 122,
  'sw-ke': 123,
  'sw-tz': 124,
  'ta-in': 125,
  'ta-lk': 126,
  'ta-my': 127,
  'ta-sg': 128,
  'te-in': 129,
  'th-th': 130,
  'tr-tr': 131,
  'uk-ua': 132,
  'ur-in': 133,
  'ur-pk': 134,
  'uz-uz': 135,
  'vi-vn': 136,
  'zh-cn': 139,
  'zh-cn-henan': 140,
  'zh-cn-liaoning': 141,
  'zh-cn-shaanxi': 142,
  'zh-cn-shandong': 143,
  'zh-cn-sichuan': 144,
  'zh-hk': 145,
  'zh-tw': 146,
  'pa-in': 148,
} as const;

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

  private async createTTSJob(props: CreateTextToSpeechRequest) {
    const url = new URL('/apis/tts', 'https://client.camb.ai');

    const response = await ky
      .post(url, {
        json: props,
        headers: {
          'x-api-key': this.getApiKey(),
          'Content-Type': 'application/json',
        },
      })
      .json<CreateTextToSpeechResponse>();

    return response.task_id;
  }

  private async getTTSStatus(id: string) {
    const url = new URL(`/apis/tts/${id}`, 'https://client.camb.ai');

    const response = await ky
      .get(url, {
        headers: {
          'x-api-key': this.getApiKey(),
        },
      })
      .json<GetTextToSpeechStatusResponse>();

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
      .json<GetTextToSpeechResultResponse>();

    return response;
  }

  /**
   * Creates a text-to-speech function using CambAI
   * @param {keyof typeof CambAILanguages} voice - The voice ID to use
   * @param {options} options - Additional options for the TTS job
   * @returns {Function} Async function that takes text and returns audio URL
   */
  tts(
    voice: keyof typeof CambAILanguages,
    options?: Omit<CreateTextToSpeechRequest, 'text' | 'voice_id'>
  ) {
    const generate: SpeakOptions['model'] = async (text: string) => {
      const jobId = await this.createTTSJob({
        text,
        voice_id: CambAILanguages[voice],
        language: 1,
        gender: 0,
        ...options,
      });

      while (true) {
        const status = await this.getTTSStatus(jobId);

        if (status.status === 'SUCCESS' && status.run_id) {
          return await this.getTTSResult(status.run_id);
        }

        if (status.status === 'ERROR') {
          throw new Error('TTS job failed');
        }

        // If still processing, wait 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
  }
}
