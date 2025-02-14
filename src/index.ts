export type SpeakOptions = {
  model: (prompt: string) => Promise<File>;
  prompt: string;
};

export type TranscribeOptions = {
  model: (audio: File) => Promise<string>;
  audio: File;
};

export type ChangeOptions = {
  model: (audio: File) => Promise<File>;
  audio: File;
};

export type IsolateOptions = {
  model: (audio: File) => Promise<File>;
  audio: File;
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
 * Converts speech to speech using the provided model.
 * @param {ChangeOptions} options - The options for changing the voice of the audio
 * @param {function} options.model - The model function to use for conversion
 * @param {File} options.audio - The audio data to convert to speech
 * @returns {Promise<File>} A Promise that resolves to a File containing the converted audio
 */
export const change = async ({ model, audio }: ChangeOptions): Promise<File> =>
  model(audio);

/**
 * Isolates speech from the audio using the provided model.
 * @param {IsolateOptions} options - The options for isolating the speech from the audio
 * @param {function} options.model - The model function to use for isolation
 * @param {File} options.audio - The audio data to isolate
 * @returns {Promise<File>} A Promise that resolves to a File containing the isolated speech
 */
export const isolate = async ({
  model,
  audio,
}: IsolateOptions): Promise<File> => model(audio);



/**
 * Options for the transcribe function to convert speech to text.
 * @interface TranscribeWithUrlOptions
 * @property {function} model - A function that takes an audio url  and returns a Promise resolving to the transcribed text
 * @property {string} url - The audio url to transcribe
 */
export type TranscribeWithUrlOptions = {
  model: (url: string) => Promise<string>;
  url: string;
};


/**
 * Transcribes audio url to text using the provided model.
 * @param {TranscribeWithUrlOptions} options - The options for speech-to-text transcription using audio url
 * @param {function} options.model - The model function to use for transcription
 * @param {string} options.url - The audio url to transcribe
 * @returns {Promise<string>} A Promise that resolves to the transcribed text
 */
export const transcribeWithUrl = async ({
  model,
  url,
}: TranscribeWithUrlOptions): Promise<string> => model(url);