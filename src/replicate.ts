import Replicate, { type WebhookEventType } from 'replicate';

const createProvider = () => {
  const auth = process.env.REPLICATE_API_TOKEN;

  if (!auth) {
    throw new Error('REPLICATE_API_TOKEN is not set');
  }

  return new Replicate({ auth });
};

type ReplicateModel = `${string}/${string}` | `${string}/${string}:${string}`;

type ReplicateProperties = {
  input: object;
  wait?:
    | {
        mode: 'block';
        interval?: number;
        timeout?: number;
      }
    | {
        mode: 'poll';
        interval?: number;
      };
  webhook?: string;
  webhook_events_filter?: WebhookEventType[];
  signal?: AbortSignal;
};

export const replicate = {
  /**
   * Creates a text-to-speech synthesis function using Replicate TTS
   * @param {ReplicateModel} model - The model to use for synthesis.
   * @param {(prompt: string) => ReplicateProperties | Promise<ReplicateProperties>} inputTransformer - The properties to use for synthesis.
   * @param {(response: unknown) => File | Promise<File>} outputTransformer - The function to transform the response to a File.
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (
    model: ReplicateModel,
    inputTransformer: (
      prompt: string
    ) => ReplicateProperties | Promise<ReplicateProperties>,
    outputTransformer: (response: unknown) => File | Promise<File>
  ) => {
    const provider = createProvider();

    return async (prompt: string) => {
      const properties = await inputTransformer(prompt);
      const response = await provider.run(model, properties);
      const file = await outputTransformer(response);

      return file;
    };
  },

  /**
   * Creates a speech-to-text transcription function using Replicate
   * @param {ReplicateModel} model - The model to use for transcription.
   * @param {(audio: File) => ReplicateProperties | Promise<ReplicateProperties>} inputTransformer - The properties to use for transcription.
   * @param {(response: unknown) => string | Promise<string>} outputTransformer - The function to transform the response to a string.
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: ReplicateModel,
    inputTransformer: (
      audio: File
    ) => ReplicateProperties | Promise<ReplicateProperties>,
    outputTransformer: (response: unknown) => string | Promise<string>
  ) => {
    const provider = createProvider();

    return async (audio: File) => {
      const properties = await inputTransformer(audio);
      const response = await provider.run(model, properties);
      const text = await outputTransformer(response);

      return text;
    };
  },

  /**
   * Creates a speech isolation function using Replicate
   * @param {ReplicateModel} model - The model to use for isolation.
   * @param {(audio: File) => ReplicateProperties | Promise<ReplicateProperties>} inputTransformer - The properties to use for isolation.
   * @param {(response: unknown) => File | Promise<File>} outputTransformer - The function to transform the response to a File.
   * @returns {Function} Async function that takes audio and returns isolated audio
   */
  isl: (
    model: ReplicateModel,
    inputTransformer: (
      audio: File
    ) => ReplicateProperties | Promise<ReplicateProperties>,
    outputTransformer: (response: unknown) => File | Promise<File>
  ) => {
    const provider = createProvider();

    return async (audio: File) => {
      const properties = await inputTransformer(audio);
      const response = await provider.run(model, properties);
      const file = await outputTransformer(response);

      return file;
    };
  },
};
