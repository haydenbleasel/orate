import {
  LiveTranscriptionEvents,
  type PrerecordedSchema,
  type SpeakSchema,
  createClient,
} from '@deepgram/sdk';
import type { SpeakOptions, TranscribeOptions } from '.';

type DeepgramTranscriptModel = 'aura';

type DeepgramTranscriptVoice =
  | 'asteria-en'
  | 'luna-en'
  | 'stella-en'
  | 'athena-en'
  | 'hera-en'
  | 'orion-en'
  | 'arcas-en'
  | 'perseus-en'
  | 'angus-en'
  | 'orpheus-en'
  | 'helios-en'
  | 'zeus-en';

type DeepgramSpeechModel =
  | 'nova-2'
  | 'nova-2-general'
  | 'nova-2-meeting'
  | 'nova-2-phonecall'
  | 'nova-2-finance'
  | 'nova-2-conversationalai'
  | 'nova-2-voicemail'
  | 'nova-2-video'
  | 'nova-2-medical'
  | 'nova-2-drivethru'
  | 'nova-2-automotive'
  | 'nova-2-atc'
  | 'nova'
  | 'nova-general'
  | 'nova-phonecall'
  | 'nova-medical'
  | 'enhanced'
  | 'enhanced-general'
  | 'enhanced-meeting'
  | 'enhanced-phonecall'
  | 'enhanced-finance'
  | 'base'
  | 'base-general'
  | 'base-meeting'
  | 'base-phonecall'
  | 'base-finance'
  | 'base-conversationalai'
  | 'base-voicemail'
  | 'base-video'
  | 'whisper'
  | 'whisper-tiny'
  | 'whisper-base'
  | 'whisper-small'
  | 'whisper-medium'
  | 'whisper-large';

export class Deepgram {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.DEEPGRAM_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('DEEPGRAM_API_KEY is not set');
    }
  }

  private createProvider() {
    return createClient(this.apiKey);
  }

  /**
   * Creates a text-to-speech synthesis function using Deepgram TTS
   * @param {DeepgramTranscriptModel} model - The model to use for synthesis. Defaults to 'aura'
   * @param {DeepgramTranscriptVoice} voice - The voice to use for synthesis. Defaults to 'asteria-en'
   * @param {Omit<SpeakSchema, 'model'>} properties - Additional properties for the TTS request
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    model: DeepgramTranscriptModel = 'aura',
    voice: DeepgramTranscriptVoice = 'asteria-en',
    properties?: Omit<SpeakSchema, 'model'>
  ) {
    const provider = this.createProvider();
    const parsedModel = `${model}-${voice}`;

    const generate: SpeakOptions['model']['generate'] = async (
      prompt: string
    ) => {
      const response = await provider.speak.request(
        { text: prompt },
        { model: parsedModel, ...properties }
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

    const stream: SpeakOptions['model']['stream'] = async (prompt: string) => {
      const response = await provider.speak.request(
        { text: prompt },
        { model: parsedModel, ...properties }
      );

      const stream = await response.getStream();

      if (!stream) {
        throw new Error('No stream returned from Deepgram');
      }

      return new ReadableStream({
        async start(controller) {
          const reader = stream.getReader();

          try {
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                controller.close();
                break;
              }

              controller.enqueue(value);
            }
          } catch (error) {
            controller.error(error);
          }
        },
      });
    };

    return { generate, stream };
  }

  /**
   * Creates a speech-to-text transcription function using Deepgram STT
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'nova-2'
   * @param {Omit<PrerecordedSchema, 'model'>} properties - Additional properties for the STT request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt(
    model: DeepgramSpeechModel | string = 'nova-2',
    properties?: Omit<PrerecordedSchema, 'model'>
  ) {
    const provider = this.createProvider();

    const generate: TranscribeOptions['model']['generate'] = async (
      audio: File
    ) => {
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

    const stream: TranscribeOptions['model']['stream'] = async (
      audio: File
    ) => {
      const arrayBuffer = await audio.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const response = provider.listen.live({
        buffer,
        model,
        ...properties,
      });

      return new ReadableStream({
        async start(controller) {
          response.on(LiveTranscriptionEvents.Open, () => {
            response.on(LiveTranscriptionEvents.Transcript, (data) => {
              const transcript = data.channel.alternatives.at(0)?.transcript;

              if (!transcript) {
                return;
              }

              controller.enqueue(transcript);
            });
          });

          response.on(LiveTranscriptionEvents.Error, (err) => {
            controller.error(err);
          });

          response.on(LiveTranscriptionEvents.Close, () => {
            controller.close();
          });
        },
      });
    };

    return { generate, stream };
  }
}
