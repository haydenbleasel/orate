/**
 * Options for the speak function to convert text to speech.
 * @interface SpeakOptions
 * @property {function} model - A function that takes a text prompt and returns a Promise resolving to an ArrayBuffer containing audio data
 * @property {string} prompt - The text to convert to speech
 */
export type SpeakOptions = {
  model: (prompt: string) => Promise<ArrayBuffer>;
  prompt: string;
};

/**
 * Converts text to speech using the provided model.
 * @param {SpeakOptions} options - The options for text-to-speech conversion
 * @param {function} options.model - The model function to use for conversion
 * @param {string} options.prompt - The text to convert to speech
 * @returns {Promise<ArrayBuffer>} A Promise that resolves to an ArrayBuffer containing the generated audio
 */
export const speak = async ({
  model,
  prompt,
}: SpeakOptions): Promise<ArrayBuffer> => model(prompt);

/**
 * Options for the transcribe function to convert speech to text.
 * @interface TranscribeOptions
 * @property {function} model - A function that takes an ArrayBuffer of audio data and returns a Promise resolving to the transcribed text
 * @property {ArrayBuffer} audio - The audio data to transcribe
 */
export type TranscribeOptions = {
  model: (audio: ArrayBuffer) => Promise<string>;
  audio: ArrayBuffer;
};

/**
 * Transcribes audio to text using the provided model.
 * @param {TranscribeOptions} options - The options for speech-to-text transcription
 * @param {function} options.model - The model function to use for transcription
 * @param {ArrayBuffer} options.audio - The audio data to transcribe
 * @returns {Promise<string>} A Promise that resolves to the transcribed text
 */
export const transcribe = async ({
  model,
  audio,
}: TranscribeOptions): Promise<string> => model(audio);
