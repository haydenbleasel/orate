/**
 * Options for the speak function to convert text to speech.
 * @interface SpeakOptions
 * @property {function} model - A function that takes a text prompt and returns a Promise resolving to a File containing audio data
 * @property {string} prompt - The text to convert to speech
 */
export type SpeakOptions = {
  model: (prompt: string) => Promise<File>;
  prompt: string;
};

/**
 * Converts text to speech using the provided model.
 * @param {SpeakOptions} options - The options for text-to-speech conversion
 * @param {function} options.model - The model function to use for conversion
 * @param {string} options.prompt - The text to convert to speech
 * @returns {Promise<File>} A Promise that resolves to a File containing the generated audio
 */
export const speak = async ({ model, prompt }: SpeakOptions): Promise<File> =>
  model(prompt);

/**
 * Options for the transcribe function to convert speech to text.
 * @interface TranscribeOptions
 * @property {function} model - A function that takes a File of audio data and returns a Promise resolving to the transcribed text
 * @property {File} audio - The audio data to transcribe
 */
export type TranscribeOptions = {
  model: (audio: File) => Promise<string>;
  audio: File;
};

/**
 * Transcribes audio to text using the provided model.
 * @param {TranscribeOptions} options - The options for speech-to-text transcription
 * @param {function} options.model - The model function to use for transcription
 * @param {File} options.audio - The audio data to transcribe
 * @returns {Promise<string>} A Promise that resolves to the transcribed text
 */
export const transcribe = async ({
  model,
  audio,
}: TranscribeOptions): Promise<string> => model(audio);

/**
 * Options for the change function to change the voice of the audio.
 * @interface ChangeOptions
 * @property {function} model - A function that takes a File of audio data and returns a Promise resolving to a File containing the converted audio
 * @property {File} audio - The audio data to convert to speech
 */
export type ChangeOptions = {
  model: (audio: File) => Promise<File>;
  audio: File;
};

/**
 * Converts speech to speech using the provided model.
 * @param {ChangeOptions} options - The options for changing the voice of the audio
 * @param {function} options.model - The model function to use for conversion
 * @param {File} options.audio - The audio data to convert to speech
 * @returns {Promise<File>} A Promise that resolves to a File containing the converted audio
 */
export const change = async ({ model, audio }: ChangeOptions): Promise<File> =>
  model(audio);
