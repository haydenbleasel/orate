import { ElevenLabsClient } from "elevenlabs";

const provider = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

export const elevenlabs = {
  speech: (model: string, voice: string) => {
    return async (prompt: string) => {
      const response = await provider.textToSpeech.convert(voice, {
        text: prompt,
        model_id: model,
      });

      return response.toArray();
    };
  },
};
