import OpenAI from "openai";
import type { SpeechCreateParams } from "openai/resources/audio/speech";
import type { TranscriptionCreateParams } from "openai/resources/audio/transcriptions";

const createProvider = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  return new OpenAI({ apiKey });
};

export const openai = {
  speech: (model: SpeechCreateParams["model"], voice: SpeechCreateParams["voice"]) => {
    const provider = createProvider();

    return async (prompt: string) => {
      const response = await provider.audio.speech.create({
        model,
        voice,
        input: prompt,
      });

      return response.arrayBuffer();
    };
  },
  transcribe: (model: TranscriptionCreateParams["model"]) => {
    const provider = createProvider();

    return async (audio: ArrayBuffer) => {
      const response = await provider.audio.transcriptions.create({
        model,
        file: audio,
      });

      return response.text;
    };
  },
};
