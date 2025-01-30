import { ElevenLabsClient } from 'elevenlabs';
import type {
  BodySpeechToSpeechV1SpeechToSpeechVoiceIdPost,
  TextToSpeechRequest,
} from 'elevenlabs/api';

const models = {
  multilingual_v2: 'eleven_multilingual_v2',
  flash_v2_5: 'eleven_flash_v2_5',
  flash_v2: 'eleven_flash_v2',
  turbo_v2: 'eleven_turbo_v2',
  turbo_v2_5: 'eleven_turbo_v2_5',
  multilingual_sts_v2: 'eleven_multilingual_sts_v2',
  english_sts_v2: 'eleven_english_sts_v2',
};

const voices = {
  alice: 'Xb7hH8MSUJpSbSDYk0k2',
  aria: '9BWtsMINqrJLrRacOk9x',
  bill: 'pqHfZKP75CvOlQylNhV4',
  brian: 'nPczCjzI2devNBz1zQrb',
  callum: 'N2lVS1w4EtoT3dr4eOWO',
  charlie: 'IKne3meq5aSn9XLyUdCD',
  charlotte: 'XB0fDUnXU5powFXDhCwa',
  chris: 'iP95p4xoKVk53GoZ742B',
  daniel: 'onwK4e9ZLuTAKqWW03F9',
  eric: 'cjVigY5qzO86Huf0OWal',
  george: 'JBFqnCBsd6RMkjVDRZzb',
  jessica: 'cgSgspJ2msm6clMCkdW9',
  laura: 'FGY2WhTYpPnrIDTdsKH5',
  liam: 'TX3LPaxmHKxFdv7VOQHJ',
  lily: 'pFZP5JQG7iQjIQuC4Bku',
  matilda: 'XrExE9yKIg1WjnnlVkGX',
  river: 'SAz9YHcvj6GT2YYXdXww',
  roger: 'CwhRBWXzGAHq8TQ4Fs17',
  sarah: 'EXAVITQu4vr4xnSDxMaL',
  will: 'bIHbv24MWmeRgasZH58o',
};

const createProvider = () => {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not set');
  }

  return new ElevenLabsClient({ apiKey });
};

export const elevenlabs = {
  /**
   * Creates a text-to-speech synthesis function using ElevenLabs
   * @param {keyof typeof models} model - The model ID to use for synthesis. Defaults to 'multilingual_v2'
   * @param {keyof typeof voices} voice - The voice ID to use for synthesis. Defaults to 'aria'
   * @param {Omit<TextToSpeechRequest, 'text' | 'model_id'>} options - Additional options for the synthesis
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: keyof typeof models = 'multilingual_v2',
    voice: keyof typeof voices | (string & {}) = 'aria',
    options?: Omit<TextToSpeechRequest, 'text' | 'model_id'>
  ) => {
    return async (prompt: string) => {
      const provider = createProvider();
      let newVoice = voice;

      if (voice in voices) {
        newVoice = voices[voice as keyof typeof voices];
      }

      const response = await provider.textToSpeech.convert(newVoice, {
        text: prompt,
        model_id: models[model],
        ...options,
      });

      const chunks: Uint8Array[] = [];

      for await (const chunk of response) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);

      const file = new File([buffer], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  },

  /**
   * Creates a speech-to-speech conversion function using ElevenLabs
   * @param {BodySpeechToSpeechV1SpeechToSpeechVoiceIdPost['model_id']} model - The model ID to use for conversion. Defaults to 'eleven_multilingual_sts_v2'
   * @param {keyof typeof voices | (string & {})} voice - The voice ID to use for synthesis. Defaults to 'aria'
   * @param {Omit<BodySpeechToSpeechV1SpeechToSpeechVoiceIdPost, 'audio' | 'model_id'>} options - Additional options for the conversion
   * @returns {Function} Async function that takes audio and returns converted speech
   */
  sts: (
    model: BodySpeechToSpeechV1SpeechToSpeechVoiceIdPost['model_id'] = 'eleven_multilingual_sts_v2',
    voice: keyof typeof voices | (string & {}) = 'aria',
    options?: Omit<
      BodySpeechToSpeechV1SpeechToSpeechVoiceIdPost,
      'audio' | 'model_id'
    >
  ) => {
    return async (audio: File) => {
      const provider = createProvider();
      let newVoice = voice;

      if (voice in voices) {
        newVoice = voices[voice as keyof typeof voices];
      }

      const response = await provider.speechToSpeech.convert(newVoice, {
        audio,
        model_id: model,
        output_format: 'mp3_44100_128',
        ...options,
      });

      const chunks: Uint8Array[] = [];

      for await (const chunk of response) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);

      const file = new File([buffer], 'converted-speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  },

  /**
   * Creates a speech isolation function using ElevenLabs
   * @returns {Function} Async function that takes audio and returns converted speech
   */
  isl: () => {
    return async (audio: File) => {
      const provider = createProvider();
      const response = await provider.audioIsolation.audioIsolation({ audio });

      const chunks: Uint8Array[] = [];

      for await (const chunk of response) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);

      const file = new File([buffer], 'isolated-speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  },
};
