import { AzureOpenAI as AzureOpenAISDK } from 'openai';
import type { SpeechCreateParams } from 'openai/resources/audio/speech';
import type { TranscriptionCreateParams } from 'openai/resources/audio/transcriptions';

export class AzureOpenAI {
  private ttsProvider?: AzureOpenAISDK;
  private sttProvider?: AzureOpenAISDK;
  private apiKey: string;
  private apiVersion: string;

  constructor(options?: {
    apiKey: string;
    ttsEndpoint: string;
    sttEndpoint: string;
    apiVersion: string;
  }) {
    this.apiKey = options?.apiKey || process.env.AZURE_OPENAI_API_KEY || '';
    this.apiVersion =
      options?.apiVersion ||
      process.env.AZURE_OPENAI_API_VERSION ||
      '2025-02-01-preview';

    if (!this.apiKey) {
      throw new Error('AZURE_OPENAI_API_KEY is not set');
    }

    if (!options?.ttsEndpoint && !options?.sttEndpoint) {
      throw new Error(
        'AZURE_OPENAI_TTS_ENDPOINT or AZURE_OPENAI_STT_ENDPOINT is not set'
      );
    }
  }

  private createProvider(model: string, type: 'tts' | 'stt'): AzureOpenAISDK {
    const endpoint =
      type === 'tts'
        ? process.env.AZURE_OPENAI_TTS_ENDPOINT
        : process.env.AZURE_OPENAI_STT_ENDPOINT;

    if (!endpoint) {
      throw new Error('AZURE_OPENAI_ENDPOINT is not set');
    }

    return new AzureOpenAISDK({
      apiKey: this.apiKey,
      apiVersion: this.apiVersion,
      endpoint,
      deployment: model,
    });
  }

  /**
   * Creates a text-to-speech synthesis function using OpenAI TTS
   * @param {string} model - The model (Resource ID) to use for synthesis.
   * @param {SpeechCreateParams["voice"]} voice - The voice to use for synthesis. Defaults to 'alloy'
   * @param {Omit<SpeechCreateParams, 'model' | 'voice' | 'input'>} properties - Additional properties for the synthesis request
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    model: string,
    voice: SpeechCreateParams['voice'],
    properties?: Omit<SpeechCreateParams, 'model' | 'voice' | 'input'>
  ) {
    this.ttsProvider = this.createProvider(model, 'tts');

    return async (prompt: string) => {
      if (!this.ttsProvider) {
        throw new Error('Failed to create TTS provider');
      }

      const response = await this.ttsProvider.audio.speech.create({
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
  }

  /**
   * Creates a speech-to-text transcription function using OpenAI Whisper
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'whisper-1'
   * @param {Omit<TranscriptionCreateParams, 'model' | 'file'>} properties - Additional properties for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt(
    model: string,
    properties?: Omit<TranscriptionCreateParams, 'model' | 'file'>
  ) {
    this.sttProvider = this.createProvider(model, 'stt');

    return async (audio: File) => {
      if (!this.sttProvider) {
        throw new Error('Failed to create STT provider');
      }

      const response = await this.sttProvider.audio.transcriptions.create({
        model,
        file: audio,
        ...properties,
      });

      return response.text;
    };
  }
}
