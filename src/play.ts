import ky from 'ky';

const getApiKey = () => {
  const apiKey = process.env.PLAYAI_API_KEY;

  if (!apiKey) {
    throw new Error('PLAYAI_API_KEY is not set');
  }

  return apiKey;
};

const getUserId = () => {
  const userId = process.env.PLAYAI_USER_ID;

  if (!userId) {
    throw new Error('PLAYAI_USER_ID is not set');
  }

  return userId;
};

type PlayModel = 'Play3.0-mini' | 'PlayDialog';
type PlayVoice = `s3://${string}`;

type PlayTTSProps = {
  model: PlayModel;
  text: string;
  voice: PlayVoice;
  language?:
    | 'afrikaans'
    | 'albanian'
    | 'amharic'
    | 'arabic'
    | 'bengali'
    | 'bulgarian'
    | 'catalan'
    | 'croatian'
    | 'czech'
    | 'danish'
    | 'dutch'
    | 'english'
    | 'french'
    | 'galician'
    | 'german'
    | 'greek'
    | 'hebrew'
    | 'hindi'
    | 'hungarian'
    | 'indonesian'
    | 'italian'
    | 'japanese'
    | 'korean'
    | 'malay'
    | 'mandarin'
    | 'polish'
    | 'portuguese'
    | 'russian'
    | 'serbian'
    | 'spanish'
    | 'swedish'
    | 'tagalog'
    | 'thai'
    | 'turkish'
    | 'ukrainian'
    | 'urdu'
    | 'xhosa';
  outputFormat?: 'mp3' | 'mulaw' | 'raw' | 'wav' | 'ogg' | 'flac';
  prompt?: string;
  prompt2?: string;
  sampleRate?: number;
  seed?: number;
  speed?: number;
  temperature?: number;
  turnPrefix?: string;
  turnPrefix2?: string;
  voice2?: string;
  voiceConditioningSeconds?: number;
  voiceConditioningSeconds2?: number;
  webHookUrl?: string;
};

type PlayTTSResponse = {
  id: string;
  createdAt: string;
  input: PlayTTSProps;
  completedAt: string | null;
  output:
    | {
        status: 'COMPLETED';
        contentType: string;
        fileSize: number;
        duration: number;
        url: string;
      }
    | {
        status: 'IN_PROGRESS';
      }
    | {
        status: 'FAILED';
      };
};

/**
 * Play.ai text-to-speech functionality
 */
export const play = {
  /**
   * Creates a text-to-speech synthesis function using PlayAI
   * @param {PlayModel} model - The model to use for synthesis. Defaults to 'Play3.0-mini'
   * @param {string} voice - The voice to use for synthesis. Defaults to 's3://voice-cloning-zero-shot/baf1ef41-36b6-428c-9bdf-50ba54682bd8/original/manifest.json'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: PlayModel = 'Play3.0-mini',
    voice: PlayVoice = 's3://voice-cloning-zero-shot/baf1ef41-36b6-428c-9bdf-50ba54682bd8/original/manifest.json',
    options?: Omit<PlayTTSProps, 'model' | 'voice' | 'text'>
  ) => {
    return async (prompt: string) => {
      const url = new URL('/api/v1/tts', 'https://api.play.ai');
      const body: PlayTTSProps = {
        model,
        voice,
        text: prompt,
        ...options,
      };

      const response = await ky
        .post(url, {
          headers: {
            AUTHORIZATION: getApiKey(),
            'X-USER-ID': getUserId(),
          },
          json: body,
        })
        .json<PlayTTSResponse>();

      if (response.output.status === 'FAILED') {
        throw new Error('Failed to synthesize speech');
      }

      if (response.output.status === 'COMPLETED') {
        const blob = await ky.get(response.output.url).blob();
        const file = new File([blob], 'speech.mp3', {
          type: 'audio/mpeg',
        });

        return file;
      }

      while (true) {
        const checkUrl = new URL(
          `/api/v1/tts/${response.id}`,
          'https://api.play.ai'
        );
        const checkResponse = await ky
          .get(checkUrl, {
            headers: {
              AUTHORIZATION: getApiKey(),
              'X-USER-ID': getUserId(),
            },
          })
          .json<PlayTTSResponse>();

        if (checkResponse.output.status === 'FAILED') {
          throw new Error('Failed to synthesize speech');
        }

        if (checkResponse.output.status === 'COMPLETED') {
          const blob = await ky.get(checkResponse.output.url).blob();
          const file = new File([blob], 'speech.mp3', {
            type: 'audio/mpeg',
          });

          return file;
        }

        // If queued or processing, wait 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
  },
};
