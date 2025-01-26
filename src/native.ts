/**
 * Native Web Speech API functionality for speech-to-text
 */
export const native = {
  /**
   * Creates a speech-to-text transcription function using Web Speech API
   * @param {SpeechRecognition} options - Additional options to pass to the SpeechRecognition
   * @returns {Function} Async function that records audio and returns transcribed text
   */
  stt: (options?: { lang?: string }) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      throw new Error('Speech recognition not supported in this browser');
    }

    /**
     * Transcribes speech to text using Web Speech API
     * @returns {Promise<string>} The transcribed text
     */
    return async () => {
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
  },
};
