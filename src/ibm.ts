import { IamAuthenticator } from 'ibm-watson/auth';
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import type { RecognizeParams } from 'ibm-watson/speech-to-text/v1-generated';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
import type { SynthesizeParams } from 'ibm-watson/text-to-speech/v1-generated';

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
 * List of available IBM Watson speech-to-text models
 * Includes models for different languages, bandwidths and use cases:
 * - BroadbandModel: For high-quality audio (16kHz+)
 * - NarrowbandModel: For telephony audio (8kHz)
 * - Multimedia: Optimized for media/entertainment content
 * - Telephony: Optimized for phone conversations
 * Format: {language}-{region}_{type} (e.g. en-US_BroadbandModel)
 */

const models = [
  'ar-MS_BroadbandModel',
  'ar-MS_Telephony',
  'cs-CZ_Telephony',
  'de-DE_BroadbandModel',
  'de-DE_Multimedia',
  'de-DE_NarrowbandModel',
  'de-DE_Telephony',
  'en-AU_BroadbandModel',
  'en-AU_Multimedia',
  'en-AU_NarrowbandModel',
  'en-AU_Telephony',
  'en-IN_Telephony',
  'en-GB_BroadbandModel',
  'en-GB_Multimedia',
  'en-GB_NarrowbandModel',
  'en-GB_Telephony',
  'en-US_BroadbandModel',
  'en-US_Multimedia',
  'en-US_NarrowbandModel',
  'en-US_ShortForm_NarrowbandModel',
  'en-US_Telephony',
  'en-WW_Medical_Telephony',
  'es-AR_BroadbandModel',
  'es-AR_NarrowbandModel',
  'es-CL_BroadbandModel',
  'es-CL_NarrowbandModel',
  'es-CO_BroadbandModel',
  'es-CO_NarrowbandModel',
  'es-ES_BroadbandModel',
  'es-ES_NarrowbandModel',
  'es-ES_Multimedia',
  'es-ES_Telephony',
  'es-LA_Telephony',
  'es-MX_BroadbandModel',
  'es-MX_NarrowbandModel',
  'es-PE_BroadbandModel',
  'es-PE_NarrowbandModel',
  'fr-CA_BroadbandModel',
  'fr-CA_Multimedia',
  'fr-CA_NarrowbandModel',
  'fr-CA_Telephony',
  'fr-FR_BroadbandModel',
  'fr-FR_Multimedia',
  'fr-FR_NarrowbandModel',
  'fr-FR_Telephony',
  'hi-IN_Telephony',
  'it-IT_BroadbandModel',
  'it-IT_NarrowbandModel',
  'it-IT_Multimedia',
  'it-IT_Telephony',
  'ja-JP_BroadbandModel',
  'ja-JP_Multimedia',
  'ja-JP_NarrowbandModel',
  'ja-JP_Telephony',
  'ko-KR_BroadbandModel',
  'ko-KR_Multimedia',
  'ko-KR_NarrowbandModel',
  'ko-KR_Telephony',
  'nl-BE_Telephony',
  'nl-NL_BroadbandModel',
  'nl-NL_Multimedia',
  'nl-NL_NarrowbandModel',
  'nl-NL_Telephony',
  'pt-BR_BroadbandModel',
  'pt-BR_Multimedia',
  'pt-BR_NarrowbandModel',
  'pt-BR_Telephony',
  'sv-SE_Telephony',
  'zh-CN_BroadbandModel',
  'zh-CN_NarrowbandModel',
  'zh-CN_Telephony',
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
  tts: (
    voice: (typeof voices)[number] = 'en-US_AllisonV3Voice',
    options?: Omit<SynthesizeParams, 'text' | 'voice'>
  ) => {
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
        ...options,
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
  stt: (
    model: (typeof models)[number] = 'en-US_BroadbandModel',
    options?: Omit<RecognizeParams, 'model' | 'audio'>
  ) => {
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
