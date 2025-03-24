import type { TranscribeOptions } from '.';

interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

declare class SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start(): void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

export class Native {
  /**
   * Creates a speech-to-text transcription function using Web Speech API
   * @param {SpeechRecognition} options - Additional options to pass to the SpeechRecognition
   * @param {string} options.lang - The language to use for transcription. If not specified, this defaults to the HTML lang attribute value, or the user agent's language setting if that isn't set either.
   * @returns {Function} Async function that records audio and returns transcribed text
   */
  stt(options?: { lang?: string }) {
    const SpeechRecognition =
      (window as unknown as Window).SpeechRecognition ||
      (window as unknown as Window).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      throw new Error('Speech recognition not supported in this browser');
    }

    const generate: TranscribeOptions['model']['generate'] = async () => {
      const promise = new Promise<string>((resolve, reject) => {
        const recognition = new SpeechRecognition();

        if (options?.lang) {
          recognition.lang = options.lang;
        }

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          resolve(transcript);
        };

        recognition.onerror = (err) => reject(err);

        recognition.start();
      });

      return promise;
    };

    return { generate };
  }
}
