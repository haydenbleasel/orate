import { AzureOpenAI } from 'openai';
import type { SpeechCreateParams } from 'openai/resources/audio/speech';
import type { TranscriptionCreateParams } from 'openai/resources/audio/transcriptions';

const createProvider = (model: string, type: 'tts' | 'stt') => {
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const endpoint =
    type === 'tts'
      ? process.env.AZURE_OPENAI_TTS_ENDPOINT
      : process.env.AZURE_OPENAI_STT_ENDPOINT;
  const apiVersion =
    process.env.AZURE_OPENAI_API_VERSION ?? '2024-05-01-preview';

  if (!apiKey) {
    throw new Error('AZURE_OPENAI_API_KEY is not set');
  }

  if (!endpoint) {
    throw new Error('AZURE_OPENAI_ENDPOINT is not set');
  }

  return new AzureOpenAI({
    apiKey,
    apiVersion,
    endpoint,
    deployment: model,
  });
};

export const openaiAzure = {
  /**
   * Creates a text-to-speech synthesis function using OpenAI TTS
   * @param {string} model - The model (Resource ID) to use for synthesis.
   * @param {SpeechCreateParams["voice"]} voice - The voice to use for synthesis. Defaults to 'alloy'
   * @param {Omit<SpeechCreateParams, 'model' | 'voice' | 'input'>} properties - Additional properties for the synthesis request
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: string,
    voice: SpeechCreateParams['voice'],
    properties?: Omit<SpeechCreateParams, 'model' | 'voice' | 'input'>
  ) => {
    const provider = createProvider(model, 'tts');

    return async (prompt: string) => {
      const response = await provider.audio.speech.create({
        model: '',
        voice,
        input: prompt,
        response_format: 'mp3',
        ...properties,
      });

      const buffer = await response.arrayBuffer();
      const file = new File([buffer], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  },

  /**
   * Creates a speech-to-text transcription function using OpenAI Whisper
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'whisper-1'
   * @param {Omit<TranscriptionCreateParams, 'model' | 'file'>} properties - Additional properties for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: string,
    properties?: Omit<TranscriptionCreateParams, 'model' | 'file'>
  ) => {
    const provider = createProvider(model, 'stt');

    return async (audio: File) => {
      const response = await provider.audio.transcriptions.create({
        model,
        file: audio,
        ...properties,
      });

      return response.text;
    };
  },
};
