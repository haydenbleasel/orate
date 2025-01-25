import {
  RevAiApiClient,
  RevAiApiDeployment,
  RevAiApiDeploymentConfigMap,
  type RevAiJobOptions,
} from 'revai-node-sdk';

/**
 * Creates a Rev.ai provider instance with API key from environment variables
 * @returns {RevAiApiClient} Configured Rev.ai client instance
 * @throws {Error} If REV_API_KEY environment variable is not set
 */
const createProvider = () => {
  const token = process.env.REV_API_KEY;

  if (!token) {
    throw new Error('REV_API_KEY is not set');
  }

  const client = new RevAiApiClient({
    token,
    deploymentConfig: RevAiApiDeploymentConfigMap.get(RevAiApiDeployment.US),
  });

  return client;
};

/**
 * Rev.ai Speech Services functionality for speech-to-text
 */
export const rev = {
  /**
   * Creates a speech-to-text transcription function using Rev.ai
   * @param {TranscriptionCreateParams["model"]} model - The model to use for transcription. Defaults to 'whisper-1'
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (
    model: 'machine' | 'human' | 'low_cost' | 'fusion' = 'machine',
    properties?: Omit<RevAiJobOptions, 'transcriber'>
  ) => {
    const provider = createProvider();

    /**
     * Transcribes audio to text using OpenAI Whisper
     * @param {File} audio - The audio data to transcribe
     * @returns {Promise<string>} The transcribed text
     */
    return async (audio: File) => {
      const arrayBuffer = await audio.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const response = await provider.submitJobAudioData(buffer, audio.name, {
        transcriber: model,
        ...properties,
      });

      if (response.status === 'failed') {
        throw new Error(response.failure_detail);
      }

      while (true) {
        const details = await provider.getJobDetails(response.id);

        if (details.status === 'transcribed') {
          const transcript = await provider.getTranscriptText(response.id);

          return transcript;
        }

        if (details.status === 'failed') {
          throw new Error(details.failure_detail);
        }

        // Wait 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
  },
};
