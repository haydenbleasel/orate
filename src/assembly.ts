import { AssemblyAI as AssemblyAISDK } from 'assemblyai';
import type { SpeechModel, TranscribeParams } from 'assemblyai';
import type { TranscribeOptions } from '.';

export class AssemblyAI {
  private provider: AssemblyAISDK;

  constructor(apiKey?: string) {
    const key = apiKey || process.env.ASSEMBLYAI_API_KEY;

    if (!key) {
      throw new Error('ASSEMBLYAI_API_KEY is not set');
    }

    this.provider = new AssemblyAISDK({ apiKey: key });
  }

  /**
   * Creates a speech-to-text transcription function using AssemblyAI
   * @param {SpeechModel} model - The speech model to use for transcription. Defaults to 'best'
   * @param {Omit<TranscribeParams, 'audio' | 'speech_model'>} options - Additional options for the transcription
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt(
    model: SpeechModel = 'best',
    options?: Omit<TranscribeParams, 'audio' | 'speech_model'>
  ) {
    const generate: TranscribeOptions['model']['generate'] = async (
      audio: File
    ) => {
      const buffer = await audio.arrayBuffer();
      const audioBuffer = Buffer.from(buffer);

      const response = await this.provider.transcripts.transcribe({
        audio: audioBuffer,
        speech_model: model,
        ...options,
      });

      if (response.status === 'error') {
        throw new Error(response.error);
      }

      while (true) {
        const transcript = await this.provider.transcripts.get(response.id);

        if (transcript.status === 'error') {
          throw new Error(transcript.error);
        }

        if (transcript.status === 'completed') {
          if (!transcript.text) {
            throw new Error('No text returned.');
          }

          return transcript.text;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    return { generate };
  }
}
