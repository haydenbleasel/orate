import { IamAuthenticator } from 'ibm-watson/auth';
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';

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
 * List of available IBM Watson voice models for text-to-speech
 * Includes both Expressive and V3 voices in various languages and regions
 * Format examples:
 * - Expressive voices: {language}-{region}_{name}Expressive (e.g. en-US_AllisonExpressive)
 * - V3 voices: {language}-{region}_{name}V3Voice (e.g. en-US_AllisonV3Voice)
 */
const voices = [
  'en-AU_HeidiExpressive',
  'en-AU_JackExpressive',
  'en-US_AllisonExpressive',
  'en-US_EmmaExpressive',
  'en-US_LisaExpressive',
  'en-US_MichaelExpressive',
  'en-GB_GeorgeExpressive',
  'es-LA_DanielaExpressive',
  'nl-NL_MerelV3Voice',
  'en-GB_CharlotteV3Voice',
  'en-GB_JamesV3Voice',
  'en-GB_KateV3Voice',
  'en-US_AllisonV3Voice',
  'en-US_EmilyV3Voice',
  'en-US_HenryV3Voice',
  'en-US_KevinV3Voice',
  'en-US_LisaV3Voice',
  'en-US_MichaelV3Voice',
  'en-US_OliviaV3Voice',
  'fr-CA_LouiseV3Voice',
  'fr-FR_NicolasV3Voice',
  'fr-FR_ReneeV3Voice',
  'de-DE_BirgitV3Voice',
  'de-DE_DieterV3Voice',
  'de-DE_ErikaV3Voice',
  'it-IT_FrancescaV3Voice',
  'ja-JP_EmiV3Voice',
  'ko-KR_JinV3Voice',
  'pt-BR_IsabelaV3Voice',
  'es-ES_EnriqueV3Voice',
  'es-ES_LauraV3Voice',
  'es-LA_SofiaV3Voice',
  'es-US_SofiaV3Voice',
] as const;

/**
 * IBM Watson Speech Services functionality for text-to-speech and speech-to-text
 */
export const ibm = {
  /**
   * Creates a text-to-speech synthesis function using IBM Watson TTS
   * @param {(typeof voices)[number]} voice - The voice model to use for synthesis. Defaults to 'en-US_AllisonV3Voice'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (voice: (typeof voices)[number] = 'en-US_AllisonV3Voice') => {
    const provider = createTTSProvider();

    /**
     * Synthesizes text to speech using IBM Watson TTS
     * @param {string} prompt - The text to convert to speech
     * @returns {Promise<ArrayBuffer>} The synthesized audio data as an ArrayBuffer
     */
    return async (prompt: string) => {
      const response = await provider.synthesize({
        text: prompt,
        accept: 'audio/mp3',
        voice,
      });

      const chunks: Buffer[] = [];

      for await (const chunk of response.result) {
        chunks.push(Buffer.from(chunk));
      }

      return Buffer.concat(chunks).buffer;
    };
  },

  /**
   * Creates a speech-to-text transcription function using IBM Watson STT
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: () => {
    const provider = createSTTProvider();

    /**
     * Transcribes audio to text using IBM Watson STT
     * @param {ArrayBuffer} audio - The audio data to transcribe
     * @returns {Promise<string>} The transcribed text
     * @throws {Error} If no transcription results are found
     * @throws {Error} If no transcription alternatives are found
     */
    return async (audio: ArrayBuffer) => {
      const response = await provider.recognize({
        audio: Buffer.from(audio),
        contentType: 'audio/mp3',
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
