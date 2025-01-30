import { JigsawStack } from 'jigsawstack';

type JigsawStackType = ReturnType<typeof JigsawStack>;
type STTParams = Parameters<JigsawStackType['audio']['speech_to_text']>['0'];
type TTSParams = Parameters<JigsawStackType['audio']['text_to_speech']>['0'];

/**
 * Creates an JigsawStack provider instance with API key from environment variables
 * @returns {JigsawStackType} Configured JigsawStack client instance
 * @throws {Error} If JIGSAWSTACK_API_KEY environment variable is not set
 */
const createProvider = () => {
  const apiKey = process.env.JIGSAWSTACK_API_KEY;

  if (!apiKey) {
    throw new Error('JIGSAWSTACK_API_KEY is not set');
  }

  return JigsawStack({ apiKey });
};

/**
 * JigsawStack speech-to-text functionality
 */
export const jigsawstack = {
  /**
   * Creates a speech-to-text transcription function using JigsawStack
   * @param {Omit<STTParams, 'url'>} options - Additional options for the transcription
   * @returns {Function} Async function that takes audio url and returns transcribed text
   */
  stt: (options?: Omit<STTParams, 'url'>) => {
    const provider = createProvider();
    /**
     * Transcribes audio to text using JigsawStack
     * @param {string} url - The audio url to transcribe
     * @returns {Promise<string>} The transcribed text
     * @throws {Error} If no transcription results are found
     */
    return async (url: string) => {
      const response = await provider.audio.speech_to_text({
        url,
        ...options,
      });
      return response.text;
    };
  },

  /**
   * Creates a text-to-speech synthesis function using JigsawStack TTS
   * @param {TTSParams["accent"]} accent - The voice to use for synthesis. Defaults to 'en-US-female-27'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    accent: TTSParams['accent'] = 'en-US-female-27',
    properties?: Omit<TTSParams, 'text' | 'accent'>
  ) => {
    const provider = createProvider();

    /**
     * Synthesizes text to speech using JigsawStack TTS
     * @param {string} text - The text to convert to speech
     * @returns {Promise<File>} The synthesized audio data
     */
    return async (text: string) => {
      const response = await provider.audio.text_to_speech({
        text,
        accent,
        ...properties,
      });
      const file = await response.file('speech.mp3', { type: 'audio/mpeg' });
      return file;
    };
  },
};
