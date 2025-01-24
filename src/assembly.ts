import { AssemblyAI, SpeechModel } from "assemblyai";

const createProvider = () => {
  const apiKey = process.env.ASSEMBLYAI_API_KEY;

  if (!apiKey) {
    throw new Error("ASSEMBLYAI_API_KEY is not set");
  }

  return new AssemblyAI({ apiKey });
};

export const assembly = {
  sst: (model: SpeechModel = 'best') => {
    const provider = createProvider();

    return async (audio: Buffer) => {
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

