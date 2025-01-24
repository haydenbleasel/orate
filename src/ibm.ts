import { IamAuthenticator } from 'ibm-watson/auth';
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';

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

export const ibm = {
  tts: (voice: (typeof voices)[number] = 'en-US_AllisonV3Voice') => {
    const provider = createTTSProvider();

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
  stt: () => {
    const provider = createSTTProvider();

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
