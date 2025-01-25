import speechToText from '@google-cloud/speech';
import type { google as SpeechToTextTypes } from '@google-cloud/speech/build/protos/protos';
import textToSpeech from '@google-cloud/text-to-speech';
import type { google as TextToSpeechTypes } from '@google-cloud/text-to-speech/build/protos/protos';
import deepmerge from 'deepmerge';
import type { voices } from './voices';

/**
 * Creates a Text-to-Speech client using the Google Cloud API
 * @returns {textToSpeech.TextToSpeechClient} Configured TTS client
 * @throws {Error} If GOOGLE_API_KEY environment variable is not set
 */
const createTTSProvider = () => {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY is not set');
  }

  return new textToSpeech.TextToSpeechClient({ apiKey });
};

/**
 * Creates a Speech-to-Text client using the Google Cloud API
 * @returns {speechToText.v2.SpeechClient} Configured STT client
 * @throws {Error} If GOOGLE_API_KEY environment variable is not set
 */
const createSTTProvider = () => {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY is not set');
  }

  return new speechToText.v2.SpeechClient({ apiKey });
};

/**
 * List of available Google Cloud Speech-to-Text models
 * Each model is optimized for different use cases:
 * - long: For long-form audio content
 * - short: For short utterances
 * - telephony: Optimized for phone call audio
 * - telephony_short: For short phone call segments
 * - medical_dictation: Specialized for medical dictation
 * - medical_conversation: For medical conversations
 * - chirp_2: Latest general purpose model
 * - chirp_telephony: Latest model for phone calls
 * - chirp: Previous generation general model
 */
const models = [
  'long',
  'short',
  'telephony',
  'telephony_short',
  'medical_dictation',
  'medical_conversation',
  'chirp_2',
  'chirp_telephony',
  'chirp',
] as const;

/**
 * Google Cloud Speech Services functionality for text-to-speech and speech-to-text
 */
export const google = {
  /**
   * Creates a text-to-speech synthesis function using Google Cloud TTS
   * @param {TextToSpeechTypes.cloud.texttospeech.v1.ISynthesizeSpeechRequest} options - Additional voice configuration options
   * @param {(typeof voices)[number]} model - The voice model to use for synthesis. Defaults to 'en-US-Casual-K'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: (typeof voices)[number] = 'en-US-Casual-K',
    options?: TextToSpeechTypes.cloud.texttospeech.v1.ISynthesizeSpeechRequest
  ) => {
    const provider = createTTSProvider();
    /**
     * Synthesizes text to speech using Google Cloud TTS
     * @param {string} prompt - The text to convert to speech
     * @returns {Promise<Buffer>} The synthesized audio data as a Buffer
     * @throws {Error} If synthesis fails or no audio content is returned
     */
    return async (prompt: string) => {
      const defaultConfig: TextToSpeechTypes.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
        {
          input: { text: prompt },
          voice: { name: model, languageCode: 'en-US' },
          audioConfig: { audioEncoding: 'MP3' },
        };

      const request: TextToSpeechTypes.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
        deepmerge(defaultConfig, options ?? {});

      const [response] = await provider.synthesizeSpeech(request);

      if (!response.audioContent) {
        throw new Error('No audio content returned.');
      }

      if (typeof response.audioContent === 'string') {
        throw new Error('Audio content is a string.');
      }

      return response.audioContent;
    };
  },

  /**
   * Creates a speech-to-text transcription function using Google Cloud STT
   * @param {(typeof models)[number]} model - The model to use for transcription. Defaults to 'chirp_2'
   * @param {SpeechToTextTypes.cloud.speech.v2.IRecognizeRequest} options - Additional options for the transcription
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: (typeof models)[number] = 'chirp_2',
    options?: SpeechToTextTypes.cloud.speech.v2.IRecognizeRequest
  ) => {
    const provider = createSTTProvider();

    /**
     * Transcribes audio to text using Google Cloud STT
     * @param {ArrayBuffer} audio - The audio data to transcribe
     * @returns {Promise<string>} The transcribed text
     * @throws {Error} If transcription fails or no text is returned
     */
    return async (audio: ArrayBuffer) => {
      const content = Buffer.from(audio).toString('base64');

      const defaultConfig: SpeechToTextTypes.cloud.speech.v2.IRecognizeRequest =
        {
          config: {
            autoDecodingConfig: {},
            model: model,
            languageCodes: ['en-US'],
          },
          content,
        };

      const request: SpeechToTextTypes.cloud.speech.v2.IRecognizeRequest =
        deepmerge(defaultConfig, options ?? {});

      const [response] = await provider.recognize(request);

      if (!response.results?.length) {
        throw new Error('No results returned.');
      }

      if (!response.results[0].alternatives?.length) {
        throw new Error('No alternatives returned.');
      }

      const { transcript } = response.results[0].alternatives[0];

      if (!transcript) {
        throw new Error('No transcript returned.');
      }

      return transcript;
    };
  },
};
