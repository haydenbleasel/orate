import ky from 'ky';
import { voices } from './voices';

const getApiKey = () => {
  const apiKey = process.env.LOVO_API_KEY;

  if (!apiKey) {
    throw new Error('LOVO_API_KEY is not set');
  }

  return apiKey;
};

type CreateTranscriptionProps = {
  text: string;
  speaker: keyof typeof voices;
  speakerStyle?: string;
  speed?: number;
  callbackUrls?: string[];
};

type CreateTranscriptionPropsResponse = {
  id: string;
  type: 'tts' | 'simple_tts' | 'dubbing' | 'localization' | 'subtitles';
  status: 'in_progress' | 'done';
  progress: number;
  team: string;
  workspace: string;
  project: string;
  error: {
    code: string;
    message: string;
  } | null;
  createdAt: string;
  estimatedTimeAt: string | null;
  estimatedTimeMs: number | null;
  callbackUrls: string[];
};

type GetTranscriptionPropsResponse = CreateTranscriptionPropsResponse & {
  data: {
    status: 'pending' | 'succeeded' | 'failed';
    text: string;
    speaker: string;
    speakerStyle: string;
    speed: number;
    pause: {
      position: number;
      value: number;
    }[];
    emphasis: {
      position: number;
      value: 0.25 | 0.5 | 0.75;
    }[];
    urls: string[];
    pronunciations: {
      sourceWord: string;
      targetWord: string;
      isReplaced: boolean;
    }[];
  }[];
};

/**
 * Lovo text-to-speech functionality
 */
export const lovo = {
  /**
   * Creates a text-to-speech synthesis function using Lovo
   * @param {string} voice - The voice to use for synthesis. Defaults to 'Bryan Lee Jr. (Studio)'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    voice: CreateTranscriptionProps['speaker'] = 'Bryan Lee Jr. (Studio)',
    props?: Omit<CreateTranscriptionProps, 'text' | 'speaker'>
  ) => {
    const voiceId = voices[voice];

    return async (text: string) => {
      const transcriptionJob = await ky
        .post('https://api.genny.lovo.ai/api/v1/tts', {
          json: {
            text,
            speaker: voiceId,
            ...props,
          },
          headers: {
            'X-API-KEY': getApiKey(),
          },
        })
        .json<CreateTranscriptionPropsResponse>();

      while (true) {
        const job = await ky
          .get(`https://api.genny.lovo.ai/api/v1/tts/${transcriptionJob.id}`, {
            headers: {
              'X-API-KEY': getApiKey(),
            },
          })
          .json<GetTranscriptionPropsResponse>();

        if (job.data[0].status === 'succeeded') {
          if (!job.data.length) {
            throw new Error('No data returned from Lovo');
          }

          if (!job.data[0].urls.length) {
            throw new Error('No audio URL returned from Lovo');
          }

          return job.data[0].urls[0];
        }

        if (job.data[0].status === 'failed') {
          throw new Error(job.data[0].error?.message || 'Unknown error');
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
  },
};
