export type SpeakOptions = {
  model: {
    generate: (prompt: string) => Promise<File>;
    stream?: (prompt: string) => Promise<ReadableStream>;
  };
  prompt: string;
  stream?: boolean;
};

export type TranscribeOptions = {
  model: {
    generate: (audio: File) => Promise<string>;
    stream?: (audio: File) => Promise<ReadableStream>;
  };
  audio: File;
  stream?: boolean;
};

export type ChangeOptions = {
  model: {
    generate: (audio: File) => Promise<File>;
    stream?: (audio: File) => Promise<ReadableStream>;
  };
  audio: File;
  stream?: boolean;
};

export type IsolateOptions = {
  model: {
    generate: (audio: File) => Promise<File>;
    stream?: (audio: File) => Promise<ReadableStream>;
  };
  audio: File;
  stream?: boolean;
};

/**
 * Converts text to speech using the provided model.
 * @param {SpeakOptions} options - The options for text-to-speech conversion
 * @param {function} options.model - The model function to use for conversion
 * @param {string} options.prompt - The text to convert to speech
 * @param {boolean} options.stream - Whether to stream the audio
 * @returns {Promise<File> | Promise<ReadableStream>} A Promise that resolves to a File containing the generated audio
 */
export const speak = async <T extends boolean = false>({
  model,
  prompt,
  stream = false as T,
}: SpeakOptions & { stream?: T }): Promise<
  T extends true ? ReadableStream : File
> => {
  if (!stream) {
    return (await model.generate(prompt)) as never;
  }

  if (!model.stream) {
    throw new Error('Model does not support streaming');
  }

  return (await model.stream(prompt)) as never;
};

/**
 * Transcribes audio to text using the provided model.
 * @param {TranscribeOptions} options - The options for speech-to-text transcription
 * @param {function} options.model - The model function to use for transcription
 * @param {File} options.audio - The audio data to transcribe
 * @param {boolean} options.stream - Whether to stream the transcription
 * @returns {Promise<string> | Promise<ReadableStream>} A Promise that resolves to the transcribed text
 */
export const transcribe = async <T extends boolean = false>({
  model,
  audio,
  stream = false as T,
}: TranscribeOptions & { stream?: T }): Promise<
  T extends true ? ReadableStream : string
> => {
  if (!stream) {
    return (await model.generate(audio)) as never;
  }

  if (!model.stream) {
    throw new Error('Model does not support streaming');
  }

  return (await model.stream(audio)) as never;
};

/**
 * Converts speech to speech using the provided model.
 * @param {ChangeOptions} options - The options for changing the voice of the audio
 * @param {function} options.model - The model function to use for conversion
 * @param {File} options.audio - The audio data to convert to speech
 * @param {boolean} options.stream - Whether to stream the converted audio
 * @returns {Promise<File> | Promise<ReadableStream>} A Promise that resolves to a File containing the converted audio
 */
export const change = async <T extends boolean = false>({
  model,
  audio,
  stream = false as T,
}: ChangeOptions & { stream?: T }): Promise<
  T extends true ? ReadableStream : File
> => {
  if (!stream) {
    return (await model.generate(audio)) as never;
  }

  if (!model.stream) {
    throw new Error('Model does not support streaming');
  }

  return (await model.stream(audio)) as never;
};

/**
 * Isolates speech from the audio using the provided model.
 * @param {IsolateOptions} options - The options for isolating the speech from the audio
 * @param {function} options.model - The model function to use for isolation
 * @param {File} options.audio - The audio data to isolate
 * @param {boolean} options.stream - Whether to stream the isolated speech
 * @returns {Promise<File> | Promise<ReadableStream>} A Promise that resolves to a File containing the isolated speech
 */
export const isolate = async <T extends boolean = false>({
  model,
  audio,
  stream = false as T,
}: IsolateOptions & { stream?: T }): Promise<
  T extends true ? ReadableStream : File
> => {
  if (!stream) {
    return (await model.generate(audio)) as never;
  }

  if (!model.stream) {
    throw new Error('Model does not support streaming');
  }

  return (await model.stream(audio)) as never;
};
