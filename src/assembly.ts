import { AssemblyAI } from "assemblyai";

const createProvider = () => {
  const apiKey = process.env.ASSEMBLYAI_API_KEY;

  if (!apiKey) {
    throw new Error("ASSEMBLYAI_API_KEY is not set");
  }

  return new AssemblyAI({ apiKey });
};

export const assembly = {
  transcribe: () => {
    const provider = createProvider();

    return async (audio: Buffer) => {
      const response = await provider.transcripts.transcribe({
        audio,
      });

      return response.text;
    };
  },
};
