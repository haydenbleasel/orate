import OpenAISDK from 'openai';
import type { SpeechCreateParams } from 'openai/resources/audio/speech';
import type { TranscriptionCreateParams } from 'openai/resources/audio/transcriptions';

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
    return async (prompt: string) => {
      const provider = this.createProvider();

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
  }

  /**
   * Creates a speech-to-text transcription function using OpenAI Whisper
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'whisper-1'
   * @param {Omit<TranscriptionCreateParams, 'model' | 'file'>} properties - Additional properties for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt(
    model: TranscriptionCreateParams['model'] = 'whisper-1',
    properties?: Omit<TranscriptionCreateParams, 'model' | 'file'>
  ) {
    return async (audio: File) => {
      const provider = this.createProvider();

      const response = await provider.audio.transcriptions.create({
        model,
        file: audio,
        ...properties,
      });

      return response.text;
    };
  }
}
