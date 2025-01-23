import { AssemblyAI } from "assemblyai";

const provider = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });

export const assembly = {
  transcribe: () => {
    return async (audio: Buffer) => {
      const response = await provider.transcripts.transcribe({
        audio,
      });

      return response.text;
    };
  },
};
