import ky from 'ky';
import type { voices } from './voices';

const getApiKey = () => {
  const apiKey = process.env.MURF_API_KEY;

  if (!apiKey) {
    throw new Error('MURF_API_KEY is not set');
  }

  return apiKey;
};

type SpeechCreateParams = {
  voiceId: (typeof voices)[number];
  style: string;
  text: string;
  rate: number;
  pitch: number;
  sampleRate: 8000 | 24000 | 44100 | 48000;
  format: 'MP3' | 'WAV' | 'FLAC' | 'ALAW' | 'ULAW';
  channelType: 'STEREO' | 'MONO';
  pronunciationDictionary: Record<string, string>;
  encodeAsBase64: boolean;
  variation: number;
  audioDuration: number;
  modelVersion: 'GEN1' | 'GEN2';
  multiNativeLocale: string;
};

type SpeechCreateResponse = {
  audioFile: string;
  audioLengthInSeconds: number;
  consumedCharacterCount: number;
  encodedAudio: string;
  remainingCharacterCount: number;
  warning: string;
  wordDurations: {
    endMs: number;
    pitchScaleMaximum: number;
    pitchScaleMinimum: number;
    sourceWordIndex: number;
    startMs: number;
    word: string;
  }[];
};

/**
 * Murf text-to-speech functionality
 */
export const murf = {
  /**
   * Creates a text-to-speech synthesis function using Murf
   * @param {SpeechCreateParams["modelVersion"]} model - The model to use for synthesis. Defaults to 'GEN2'
   * @param {SpeechCreateParams["voiceId"]} voice - The voice to use for synthesis. Defaults to 'en-US-natalie'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: SpeechCreateParams['modelVersion'] = 'GEN2',
    voice: SpeechCreateParams['voiceId'] = 'en-US-natalie',
    properties?: Omit<SpeechCreateParams, 'modelVersion' | 'voiceId' | 'text'>
  ) => {
    const token = getApiKey();

    /**
     * Synthesizes text to speech using Murf
     * @param {string} prompt - The text to convert to speech
     * @returns {Promise<File>} The synthesized audio data
     */
    return async (prompt: string) => {
      const response = await ky
        .post('https://api.murf.ai/v1/speech/generate', {
          headers: {
            'api-key': token,
          },
          json: {
            voiceId: voice,
            text: prompt,
            modelVersion: model,
            ...properties,
          },
        })
        .json<SpeechCreateResponse>();

      const blob = await ky.get(response.audioFile).blob();
      const file = new File([blob], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  },
};
