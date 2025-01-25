import OpenAI from 'openai';
import type { SpeechCreateParams } from 'openai/resources/audio/speech';
import type { TranscriptionCreateParams } from 'openai/resources/audio/transcriptions';

/**
 * Creates an OpenAI provider instance with API key from environment variables
 * @returns {OpenAI} Configured OpenAI client instance
 * @throws {Error} If OPENAI_API_KEY environment variable is not set
 */
const createProvider = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  return new OpenAI({ apiKey });
};

/**
 * OpenAI Speech Services functionality for text-to-speech and speech-to-text
 */
export const openai = {
  /**
   * Creates a text-to-speech synthesis function using OpenAI TTS
   * @param {SpeechCreateParams["model"]} model - The model to use for synthesis. Defaults to 'tts-1'
   * @param {SpeechCreateParams["voice"]} voice - The voice to use for synthesis. Defaults to 'alloy'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: SpeechCreateParams['model'] = 'tts-1',
    voice: SpeechCreateParams['voice'] = 'alloy',
    properties?: Omit<SpeechCreateParams, 'model' | 'voice' | 'input'>
  ) => {
    const provider = createProvider();

    /**
     * Synthesizes text to speech using OpenAI TTS
     * @param {string} prompt - The text to convert to speech
     * @returns {Promise<File>} The synthesized audio data
     */
    return async (prompt: string) => {
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
  },

  /**
   * Creates a speech-to-text transcription function using OpenAI Whisper
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'whisper-1'
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: TranscriptionCreateParams['model'] = 'whisper-1',
    properties?: Omit<TranscriptionCreateParams, 'model' | 'file'>
  ) => {
    const provider = createProvider();

    /**
     * Transcribes audio to text using OpenAI Whisper
     * @param {File} audio - The audio data to transcribe
     * @returns {Promise<string>} The transcribed text
     */
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
