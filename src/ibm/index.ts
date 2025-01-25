import { IamAuthenticator } from 'ibm-watson/auth';
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import type { RecognizeParams } from 'ibm-watson/speech-to-text/v1-generated';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
import type { SynthesizeParams } from 'ibm-watson/text-to-speech/v1-generated';
import type { models } from './models';
import type { voices } from './voices';

/**
 * Creates a Text-to-Speech client using the IBM Watson API
 * @returns {TextToSpeechV1} Configured TTS client
 * @throws {Error} If IBM_TTS_API_KEY environment variable is not set
 * @throws {Error} If IBM_TTS_URL environment variable is not set
 */
const createTTSProvider = () => {
  const apikey = process.env.IBM_TTS_API_KEY;
  const serviceUrl = process.env.IBM_TTS_URL;

  if (!apikey) {
    throw new Error('IBM_TTS_API_KEY is not set');
  }

  if (!serviceUrl) {
    throw new Error('IBM_TTS_URL is not set');
  }

  const authenticator = new IamAuthenticator({ apikey });

  return new TextToSpeechV1({ authenticator, serviceUrl });
};

/**
 * Creates a Speech-to-Text client using the IBM Watson API
 * @returns {SpeechToTextV1} Configured STT client
 * @throws {Error} If IBM_STT_API_KEY environment variable is not set
 * @throws {Error} If IBM_STT_URL environment variable is not set
 */
const createSTTProvider = () => {
  const apikey = process.env.IBM_STT_API_KEY;
  const serviceUrl = process.env.IBM_STT_URL;

  if (!apikey) {
    throw new Error('IBM_STT_API_KEY is not set');
  }

  if (!serviceUrl) {
    throw new Error('IBM_STT_URL is not set');
  }

  const authenticator = new IamAuthenticator({ apikey });

  return new SpeechToTextV1({ authenticator, serviceUrl });
};

/**
 * IBM Watson Speech Services functionality for text-to-speech and speech-to-text
 */
export const ibm = {
  /**
   * Creates a text-to-speech synthesis function using IBM Watson TTS
   * @param {(typeof voices)[number]} voice - The voice model to use for synthesis. Defaults to 'en-US_AllisonV3Voice'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    voice: (typeof voices)[number] = 'en-US_AllisonV3Voice',
    options?: Omit<SynthesizeParams, 'text' | 'voice'>
  ) => {
    const provider = createTTSProvider();

    /**
     * Synthesizes text to speech using IBM Watson TTS
     * @param {string} prompt - The text to convert to speech
     * @returns {Promise<File>} The synthesized audio data as an File
     */
    return async (prompt: string) => {
      const response = await provider.synthesize({
        text: prompt,
        accept: 'audio/mpeg',
        voice,
        ...options,
      });

      const chunks: Buffer[] = [];

      for await (const chunk of response.result) {
        chunks.push(Buffer.from(chunk));
      }

      const buffer = Buffer.concat(chunks).buffer;

      const file = new File([buffer], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  },

  /**
   * Creates a speech-to-text transcription function using IBM Watson STT
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: (typeof models)[number] = 'en-US_BroadbandModel',
    options?: Omit<RecognizeParams, 'model' | 'audio'>
  ) => {
    const provider = createSTTProvider();

    /**
     * Transcribes audio to text using IBM Watson STT
     * @param {File} audio - The audio data to transcribe
     * @returns {Promise<string>} The transcribed text
     * @throws {Error} If no transcription results are found
     * @throws {Error} If no transcription alternatives are found
     */
    return async (audio: File) => {
      const buffer = await audio.arrayBuffer();
      const audioBuffer = Buffer.from(buffer);

      const response = await provider.recognize({
        audio: audioBuffer,
        contentType: 'audio/mpeg',
        model,
        ...options,
      });

      if (!response.result.results?.length) {
        throw new Error('No results found');
      }

      if (!response.result.results[0].alternatives.length) {
        throw new Error('No alternatives found');
      }

      const { transcript } = response.result.results[0].alternatives[0];

      return transcript;
    };
  },
};
