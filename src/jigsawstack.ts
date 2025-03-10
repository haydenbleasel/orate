import { JigsawStack } from 'jigsawstack';

type JigsawStackType = ReturnType<typeof JigsawStack>;
type STTParams = Parameters<JigsawStackType['audio']['speech_to_text']>['0'];
type TTSParams = Parameters<JigsawStackType['audio']['text_to_speech']>['0'];

export class JigsawStackProvider {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.JIGSAWSTACK_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('JIGSAWSTACK_API_KEY is not set');
    }
  }

  private createProvider() {
    return JigsawStack({ apiKey: this.apiKey });
  }

  /**
   * Creates a speech-to-text transcription function using JigsawStack
   * @param {Omit<STTParams, 'url'>} options - Additional options for the transcription
   * @returns {Function} Async function that takes audio url and returns transcribed text
   */
  stt(options?: Omit<STTParams, 'url'>) {
    return async (audio: File) => {
      const provider = this.createProvider();

      const result = await provider.store.upload(audio, {
        filename: audio.name,
      });

      const response = await provider.audio.speech_to_text({
        url: result.url,
        ...options,
      });

      return response.text;
    };
  }

  /**
   * Creates a text-to-speech synthesis function using JigsawStack TTS
   * @param {TTSParams["accent"]} voice - The voice to use for synthesis. Defaults to 'en-US-female-27'
   * @param {Omit<TTSParams, 'text' | 'accent'>} properties - Additional properties for the synthesis request
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    voice: TTSParams['accent'] = 'en-US-female-27',
    properties?: Omit<TTSParams, 'text' | 'accent'>
  ) {
    return async (text: string) => {
      const provider = this.createProvider();

      const response = await provider.audio.text_to_speech({
        text,
        accent: voice,
        ...properties,
      });

      const file = await response.file('speech.mp3', { type: 'audio/mpeg' });

      return file;
    };
  }
}
