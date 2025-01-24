import { AssemblyAI } from 'assemblyai';
import type { SpeechModel } from 'assemblyai';

const createProvider = () => {
  const apiKey = process.env.ASSEMBLYAI_API_KEY;

  if (!apiKey) {
    throw new Error('ASSEMBLYAI_API_KEY is not set');
  }

  return new AssemblyAI({ apiKey });
};

export const assembly = {
  stt: (model: SpeechModel = 'best') => {
    const provider = createProvider();

    return async (audio: ArrayBuffer) => {
      const response = await provider.transcripts.transcribe({
        audio,
        speech_model: model,
      });

      if (response.status === 'error') {
        throw new Error(response.error);
      }

      if (response.status === 'processing') {
        throw new Error('Processing');
      }

      if (response.status === 'queued') {
        throw new Error('Queued');
      }

      if (!response.text) {
        throw new Error('No text returned.');
      }

      return response.text;
    };
  },
};
