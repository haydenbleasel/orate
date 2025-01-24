import { ElevenLabsClient } from "elevenlabs";

const createProvider = () => {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY is not set");
  }

  return new ElevenLabsClient({ apiKey });
};

export const elevenlabs = {
  speech: (model: string, voice: string) => {
    return async (prompt: string) => {
      const provider = createProvider();

      const response = await provider.textToSpeech.convert(voice, {
        text: prompt,
        model_id: model,
      });

      return response.toArray();
    };
  },
};
