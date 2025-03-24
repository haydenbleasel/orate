import Lmnt from 'lmnt-node';
import type {
  SpeechConvertParams,
  SpeechGenerateParams,
} from 'lmnt-node/resources';
import type { ChangeOptions, SpeakOptions } from '.';

type LMNTVoice =
  | 'amy'
  | 'ava'
  | 'caleb'
  | 'chloe'
  | 'dalton'
  | 'daniel'
  | 'james'
  | 'lauren'
  | 'lily'
  | 'magnus'
  | 'miles'
  | 'morgan'
  | 'nathan'
  | 'noah'
  | 'oliver'
  | 'paige'
  | 'sophie'
  | 'terrence'
  | 'zain'
  | 'zeke'
  | 'zoe';

export class LMNT {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.LMNT_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('LMNT_API_KEY is not set');
    }
  }

  private createProvider() {
    return new Lmnt({ apiKey: this.apiKey });
  }

  /**
   * Creates a text-to-speech synthesis function using LMNT
   * @param {SpeechGenerateParams['model']} model - The model ID to use for synthesis. Defaults to 'aurora'
   * @param {typeof voices[number]} voice - The voice ID to use for synthesis. Defaults to 'lily'
   * @param {Omit<SpeechGenerateParams, 'text' | 'voice' | 'model'>} options - Additional options for the synthesis
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    model: SpeechGenerateParams['model'] = 'aurora',
    voice: LMNTVoice = 'lily',
    options?: Omit<SpeechGenerateParams, 'text' | 'model' | 'voice'>
  ) {
    const provider = this.createProvider();

    const generate: SpeakOptions['model']['generate'] = async (
      prompt: string
    ) => {
      const response = await provider.speech.generate({
        text: prompt,
        voice: voice,
        model: model,
        ...options,
      });

      const buffer = await response.arrayBuffer();
      const file = new File([buffer], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };

    return { generate };
  }

  /**
   * Creates a speech-to-speech conversion function using LMNT
   * @param {typeof voices[number]} voice - The voice ID to use for synthesis. Defaults to 'lily'
   * @param {Omit<SpeechConvertParams, 'audio' | 'model_id'>} options - Additional options for the synthesis
   * @returns {Function} Async function that takes audio and returns converted speech
   */
  sts(
    voice: LMNTVoice = 'lily',
    options?: Omit<SpeechConvertParams, 'audio' | 'model'>
  ) {
    const provider = this.createProvider();

    const generate: ChangeOptions['model']['generate'] = async (
      audio: File
    ) => {
      const response = await provider.speech.convert({
        audio,
        voice,
        format: 'wav',
        ...options,
      });

      const buffer = await response.arrayBuffer();
      const file = new File([buffer], 'speech.wav', {
        type: 'audio/wav',
      });

      return file;
    };

    return { generate };
  }
}
