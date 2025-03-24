export type SpeakOptions = {
  model: {
    generate: (prompt: string) => Promise<File>;
    stream: (prompt: string) => Promise<ReadableStream>;
  };
  prompt: string;
  stream?: boolean;
};

export type TranscribeOptions = {
  model: {
    generate: (audio: File) => Promise<string>;
    stream: (audio: File) => Promise<ReadableStream>;
  };
  audio: File;
  stream?: boolean;
};

export type ChangeOptions = {
  model: {
    generate: (audio: File) => Promise<File>;
    stream: (audio: File) => Promise<ReadableStream>;
  };
  audio: File;
  stream?: boolean;
};

export type IsolateOptions = {
  model: {
    generate: (audio: File) => Promise<File>;
    stream: (audio: File) => Promise<ReadableStream>;
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
 * @returns {Promise<File> | AsyncGenerator<File>} A Promise that resolves to a File containing the generated audio
 */
export const speak = async ({ model, prompt, stream }: SpeakOptions) =>
  stream ? model.stream(prompt) : model.generate(prompt);

/**
 * Transcribes audio to text using the provided model.
 * @param {TranscribeOptions} options - The options for speech-to-text transcription
 * @param {function} options.model - The model function to use for transcription
 * @param {File} options.audio - The audio data to transcribe
 * @param {boolean} options.stream - Whether to stream the transcription
 * @returns {Promise<string> | Promise<ReadableStream>} A Promise that resolves to the transcribed text
 */
export const transcribe = async ({
  model,
  audio,
  stream,
}: TranscribeOptions) => (stream ? model.stream(audio) : model.generate(audio));

/**
 * Converts speech to speech using the provided model.
 * @param {ChangeOptions} options - The options for changing the voice of the audio
 * @param {function} options.model - The model function to use for conversion
 * @param {File} options.audio - The audio data to convert to speech
 * @param {boolean} options.stream - Whether to stream the converted audio
 * @returns {Promise<File> | AsyncGenerator<File>} A Promise that resolves to a File containing the converted audio
 */
export const change = async ({ model, audio, stream }: ChangeOptions) =>
  stream ? model.stream(audio) : model.generate(audio);

/**
 * Isolates speech from the audio using the provided model.
 * @param {IsolateOptions} options - The options for isolating the speech from the audio
 * @param {function} options.model - The model function to use for isolation
 * @param {File} options.audio - The audio data to isolate
 * @param {boolean} options.stream - Whether to stream the isolated speech
 * @returns {Promise<File> | AsyncGenerator<File>} A Promise that resolves to a File containing the isolated speech
 */
export const isolate = async ({ model, audio, stream }: IsolateOptions) =>
  stream ? model.stream(audio) : model.generate(audio);
