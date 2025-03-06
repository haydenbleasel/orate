import { IamAuthenticator } from 'ibm-watson/auth';
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import type { RecognizeParams } from 'ibm-watson/speech-to-text/v1-generated';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
import type { SynthesizeParams } from 'ibm-watson/text-to-speech/v1-generated';

type IBMModel =
  | 'ar-MS_BroadbandModel'
  | 'ar-MS_Telephony'
  | 'cs-CZ_Telephony'
  | 'de-DE_BroadbandModel'
  | 'de-DE_Multimedia'
  | 'de-DE_NarrowbandModel'
  | 'de-DE_Telephony'
  | 'en-AU_BroadbandModel'
  | 'en-AU_Multimedia'
  | 'en-AU_NarrowbandModel'
  | 'en-AU_Telephony'
  | 'en-IN_Telephony'
  | 'en-GB_BroadbandModel'
  | 'en-GB_Multimedia'
  | 'en-GB_NarrowbandModel'
  | 'en-GB_Telephony'
  | 'en-US_BroadbandModel'
  | 'en-US_Multimedia'
  | 'en-US_NarrowbandModel'
  | 'en-US_ShortForm_NarrowbandModel'
  | 'en-US_Telephony'
  | 'en-WW_Medical_Telephony'
  | 'es-AR_BroadbandModel'
  | 'es-AR_NarrowbandModel'
  | 'es-CL_BroadbandModel'
  | 'es-CL_NarrowbandModel'
  | 'es-CO_BroadbandModel'
  | 'es-CO_NarrowbandModel'
  | 'es-ES_BroadbandModel'
  | 'es-ES_NarrowbandModel'
  | 'es-ES_Multimedia'
  | 'es-ES_Telephony'
  | 'es-LA_Telephony'
  | 'es-MX_BroadbandModel'
  | 'es-MX_NarrowbandModel'
  | 'es-PE_BroadbandModel'
  | 'es-PE_NarrowbandModel'
  | 'fr-CA_BroadbandModel'
  | 'fr-CA_Multimedia'
  | 'fr-CA_NarrowbandModel'
  | 'fr-CA_Telephony'
  | 'fr-FR_BroadbandModel'
  | 'fr-FR_Multimedia'
  | 'fr-FR_NarrowbandModel'
  | 'fr-FR_Telephony'
  | 'hi-IN_Telephony'
  | 'it-IT_BroadbandModel'
  | 'it-IT_NarrowbandModel'
  | 'it-IT_Multimedia'
  | 'it-IT_Telephony'
  | 'ja-JP_BroadbandModel'
  | 'ja-JP_Multimedia'
  | 'ja-JP_NarrowbandModel'
  | 'ja-JP_Telephony'
  | 'ko-KR_BroadbandModel'
  | 'ko-KR_Multimedia'
  | 'ko-KR_NarrowbandModel'
  | 'ko-KR_Telephony'
  | 'nl-BE_Telephony'
  | 'nl-NL_BroadbandModel'
  | 'nl-NL_Multimedia'
  | 'nl-NL_NarrowbandModel'
  | 'nl-NL_Telephony'
  | 'pt-BR_BroadbandModel'
  | 'pt-BR_Multimedia'
  | 'pt-BR_NarrowbandModel'
  | 'pt-BR_Telephony'
  | 'sv-SE_Telephony'
  | 'zh-CN_BroadbandModel'
  | 'zh-CN_NarrowbandModel'
  | 'zh-CN_Telephony';

type IBMVoice =
  | 'en-AU_HeidiExpressive'
  | 'en-AU_JackExpressive'
  | 'en-US_AllisonExpressive'
  | 'en-US_EmmaExpressive'
  | 'en-US_LisaExpressive'
  | 'en-US_MichaelExpressive'
  | 'en-GB_GeorgeExpressive'
  | 'es-LA_DanielaExpressive'
  | 'nl-NL_MerelV3Voice'
  | 'en-GB_CharlotteV3Voice'
  | 'en-GB_JamesV3Voice'
  | 'en-GB_KateV3Voice'
  | 'en-US_AllisonV3Voice'
  | 'en-US_EmilyV3Voice'
  | 'en-US_HenryV3Voice'
  | 'en-US_KevinV3Voice'
  | 'en-US_LisaV3Voice'
  | 'en-US_MichaelV3Voice'
  | 'en-US_OliviaV3Voice'
  | 'fr-CA_LouiseV3Voice'
  | 'fr-FR_NicolasV3Voice'
  | 'fr-FR_ReneeV3Voice'
  | 'de-DE_BirgitV3Voice'
  | 'de-DE_DieterV3Voice'
  | 'de-DE_ErikaV3Voice'
  | 'it-IT_FrancescaV3Voice'
  | 'ja-JP_EmiV3Voice'
  | 'ko-KR_JinV3Voice'
  | 'pt-BR_IsabelaV3Voice'
  | 'es-ES_EnriqueV3Voice'
  | 'es-ES_LauraV3Voice'
  | 'es-LA_SofiaV3Voice'
  | 'es-US_SofiaV3Voice';

export class IBM {
  private ttsApiKey: string;
  private ttsUrl: string;
  private sttApiKey: string;
  private sttUrl: string;

  constructor(config?: {
    ttsApiKey?: string;
    ttsUrl?: string;
    sttApiKey?: string;
    sttUrl?: string;
  }) {
    this.ttsApiKey = config?.ttsApiKey || process.env.IBM_TTS_API_KEY || '';
    this.ttsUrl = config?.ttsUrl || process.env.IBM_TTS_URL || '';
    this.sttApiKey = config?.sttApiKey || process.env.IBM_STT_API_KEY || '';
    this.sttUrl = config?.sttUrl || process.env.IBM_STT_URL || '';

    if (!this.ttsApiKey) {
      throw new Error('IBM_TTS_API_KEY is not set');
    }
    if (!this.ttsUrl) {
      throw new Error('IBM_TTS_URL is not set');
    }
    if (!this.sttApiKey) {
      throw new Error('IBM_STT_API_KEY is not set');
    }
    if (!this.sttUrl) {
      throw new Error('IBM_STT_URL is not set');
    }
  }

  private createTTSProvider() {
    const authenticator = new IamAuthenticator({ apikey: this.ttsApiKey });
    return new TextToSpeechV1({ authenticator, serviceUrl: this.ttsUrl });
  }

  private createSTTProvider() {
    const authenticator = new IamAuthenticator({ apikey: this.sttApiKey });
    return new SpeechToTextV1({ authenticator, serviceUrl: this.sttUrl });
  }

  /**
   * Creates a text-to-speech synthesis function using IBM Watson TTS
   * @param {IBMVoice} voice - The voice model to use for synthesis. Defaults to 'en-US_AllisonV3Voice'
   * @param {object} options - Additional options for the synthesis request
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    voice: IBMVoice = 'en-US_AllisonV3Voice',
    options?: Omit<SynthesizeParams, 'text' | 'voice'>
  ) {
    const provider = this.createTTSProvider();

    return async (prompt: string) => {
      const response = await provider.synthesize({
        text: prompt,
        accept: 'audio/mpeg',
        voice,
        ...options,
      });

      const chunks: Uint8Array[] = [];

      for await (const chunk of response.result) {
        const part = typeof chunk === 'string' ? Buffer.from(chunk) : chunk;
        chunks.push(new Uint8Array(part));
      }

      const buffer = Buffer.concat(chunks);
      const file = new File([buffer], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  }

  /**
   * Creates a speech-to-text transcription function using IBM Watson STT
   * @param {IBMModel} model - The model to use for transcription. Defaults to 'en-US_BroadbandModel'
   * @param {Omit<RecognizeParams, 'model' | 'audio'>} options - Additional options for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt(
    model: IBMModel = 'en-US_BroadbandModel',
    options?: Omit<RecognizeParams, 'model' | 'audio'>
  ) {
    const provider = this.createSTTProvider();

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
  }
}
