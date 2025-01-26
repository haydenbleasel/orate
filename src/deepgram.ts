import {
  type PrerecordedSchema,
  type SpeakSchema,
  createClient,
} from '@deepgram/sdk';

/**
 * Creates a Deepgram provider instance with API key from environment variables
 * @returns {DeepgramClient} Configured Deepgram client instance
 * @throws {Error} If DEEPGRAM_API_KEY environment variable is not set
 */
const createProvider = () => {
  const apiKey = process.env.DEEPGRAM_API_KEY;

  if (!apiKey) {
    throw new Error('DEEPGRAM_API_KEY is not set');
  }

  return createClient(apiKey);
};

/**
 * Deepgram Speech Services functionality for text-to-speech and speech-to-text
 */
export const deepgram = {
  /**
   * Creates a text-to-speech synthesis function using Deepgram TTS
   * @param {SpeakSchema["model"]} model - The model to use for synthesis. Defaults to 'aura-asteria-en'
   * @param {Omit<SpeakSchema, "model">} properties - The properties to use for synthesis.
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: SpeakSchema['model'] = 'aura-asteria-en',
    properties?: Omit<SpeakSchema, 'model'>
  ) => {
    const provider = createProvider();

    /**
     * Synthesizes text to speech using Deepgram TTS
     * @param {string} prompt - The text to convert to speech
     * @returns {Promise<File>} The synthesized audio data
     */
    return async (prompt: string) => {
      const response = await provider.speak.request(
        { text: prompt },
        { model, ...properties }
      );

      const stream = await response.getStream();

      if (!stream) {
        throw new Error('No stream returned from Deepgram');
      }

      const read = stream.getReader();
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await read.read();

        if (done) {
          break;
        }

        chunks.push(value);
      }

      const buffer = Buffer.concat(chunks);
      const file = new File([buffer], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  },

  /**
   * Creates a speech-to-text transcription function using Deepgram STT
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'nova-2'
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: PrerecordedSchema['model'] = 'nova-2',
    properties?: Omit<PrerecordedSchema, 'model'>
  ) => {
    const provider = createProvider();

    /**
     * Transcribes audio to text using OpenAI Whisper
     * @param {File} audio - The audio data to transcribe
     * @returns {Promise<string>} The transcribed text
     */
    return async (audio: File) => {
      const arrayBuffer = await audio.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const response = await provider.listen.prerecorded.transcribeFile(
        buffer,
        {
          model,
          ...properties,
        }
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (!response.result?.results) {
        throw new Error('No results returned from Deepgram');
      }

      if (!response.result.results.channels.length) {
        throw new Error('No channels returned from Deepgram');
      }

      if (!response.result.results.channels[0].alternatives.length) {
        throw new Error('No alternatives returned from Deepgram');
      }

      return response.result.results.channels[0].alternatives[0].transcript;
    };
  },
};
