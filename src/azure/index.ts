import Azure from 'microsoft-cognitiveservices-speech-sdk';
import type { voices } from './voices';

/**
 * Creates an Azure Speech Service provider configuration
 * @returns {Azure.SpeechConfig} Configured Azure Speech Service provider
 * @throws {Error} If AZURE_API_KEY or AZURE_REGION environment variables are not set
 */
const createProvider = () => {
  const apiKey = process.env.AZURE_API_KEY;
  const region = process.env.AZURE_REGION;

  if (!apiKey) {
    throw new Error('AZURE_API_KEY is not set');
  }

  if (!region) {
    throw new Error('AZURE_REGION is not set');
  }

  const speechConfig = Azure.SpeechConfig.fromSubscription(apiKey, region);
  speechConfig.speechRecognitionLanguage = 'en-US';

  return speechConfig;
};

/**
 * Azure Speech Service functionality for text-to-speech and speech-to-text
 */
export const azure = {
  /**
   * Creates a text-to-speech synthesis function using Azure Speech Service
   * @param {(typeof voices)[number]} voice - The neural voice to use for synthesis. Defaults to 'en-US-AriaNeural'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts: (voice: (typeof voices)[number] = 'en-US-AriaNeural') => {
    const provider = createProvider();
    provider.speechSynthesisVoiceName = voice;

    /**
     * Synthesizes text to speech using Azure Speech Service
     * @param {string} prompt - The text to convert to speech
     * @returns {Promise<ArrayBuffer>} The synthesized audio data
     * @throws {Error} If synthesis fails
     */
    return async (prompt: string) => {
      const speechSynthesizer = new Azure.SpeechSynthesizer(provider);

      const result = new Promise<ArrayBuffer>((resolve, reject) => {
        speechSynthesizer.speakTextAsync(
          prompt,
          (result) => {
            speechSynthesizer.close();
            resolve(result.audioData);
          },
          (error) => {
            speechSynthesizer.close();
            reject(error);
          }
        );
      });

      const audio = await result;

      return audio;
    };
  },

  /**
   * Creates a speech-to-text transcription function using Azure Speech Service
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: () => {
    const provider = createProvider();

    /**
     * Transcribes audio to text using Azure Speech Service
     * @param {ArrayBuffer} audio - The audio data to transcribe
     * @returns {Promise<string>} The transcribed text
     * @throws {Error} If transcription fails or no text is returned
     */
    return async (audio: ArrayBuffer) => {
      const buffer = Buffer.from(audio);
      const audioConfig = Azure.AudioConfig.fromWavFileInput(buffer);
      const speechRecognizer = new Azure.SpeechRecognizer(
        provider,
        audioConfig
      );

      const result = await new Promise<string | null>((resolve, reject) => {
        speechRecognizer.recognizeOnceAsync(
          (result) => {
            speechRecognizer.close();

            switch (result.reason) {
              case Azure.ResultReason.RecognizedSpeech:
                resolve(result.text);
                break;
              case Azure.ResultReason.NoMatch:
                resolve(null);
                break;
              case Azure.ResultReason.Canceled:
                reject(Azure.CancellationDetails.fromResult(result).reason);
                break;
              default:
                resolve(null);
            }
          },
          (error) => {
            speechRecognizer.close();
            reject(error);
          }
        );
      });

      if (!result) {
        throw new Error('No text returned.');
      }

      return result;
    };
  },
};
