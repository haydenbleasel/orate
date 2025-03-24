import OpenAISDK from 'openai';
import type { SpeechCreateParams } from 'openai/resources/audio/speech';
import type { TranscriptionCreateParams } from 'openai/resources/audio/transcriptions';
import type { SpeakOptions, TranscribeOptions } from '.';

export class OpenAI {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }
  }

  private createProvider() {
    return new OpenAISDK({ apiKey: this.apiKey });
  }

  /**
   * Creates a text-to-speech synthesis function using OpenAI TTS
   * @param {SpeechCreateParams["model"]} model - The model to use for synthesis. Defaults to 'tts-1'
   * @param {SpeechCreateParams["voice"]} voice - The voice to use for synthesis. Defaults to 'alloy'
   * @param {Omit<SpeechCreateParams, 'model' | 'voice' | 'input'>} properties - Additional properties for the synthesis request
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    model: SpeechCreateParams['model'] = 'tts-1',
    voice: SpeechCreateParams['voice'] = 'alloy',
    properties?: Omit<SpeechCreateParams, 'model' | 'voice' | 'input'>
  ) {
    const provider = this.createProvider();

    const generate: SpeakOptions['model']['generate'] = async (
      prompt: string
    ) => {
      const response = await provider.audio.speech.create({
        model,
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

    const stream: SpeakOptions['model']['stream'] = async (prompt: string) => {
      const response = await provider.audio.speech.create({
        model,
        voice,
        input: prompt,
        response_format: 'mp3',
        ...properties,
      });

      if (!response.body) {
        throw new Error('No response body');
      }

      return response.body;
    };

    return { generate, stream };
  }

  /**
   * Creates a speech-to-text transcription function using OpenAI Whisper
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'whisper-1'
   * @param {Omit<TranscriptionCreateParams, 'model' | 'file' | 'stream'>} properties - Additional properties for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt(
    model: TranscriptionCreateParams['model'] = 'whisper-1',
    properties?: Omit<TranscriptionCreateParams, 'model' | 'file' | 'stream'>
  ) {
    const provider = this.createProvider();

    const generate: TranscribeOptions['model']['generate'] = async (
      audio: File
    ) => {
      const response = await provider.audio.transcriptions.create({
        model,
        file: audio,
        stream: false,
        ...properties,
      });

      return response.text;
    };

    const stream: TranscribeOptions['model']['stream'] = async (
      audio: File
    ) => {
      const response = await provider.audio.transcriptions.create({
        model,
        file: audio,
        stream: true,
        ...properties,
      });

      return response.toReadableStream();
    };

    return { generate, stream };
  }
}
