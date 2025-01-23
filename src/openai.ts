import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech";
import { SpeechModel } from "./types";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set");
}

const provider = new OpenAI({ apiKey });

export const openai = (
  model: SpeechCreateParams["model"],
  voice: SpeechCreateParams["voice"]
): SpeechModel => {
  return {
    generate: async (prompt: string) => {
      const response = await provider.audio.speech.create({
        model,
        voice,
        input: prompt,
      });

      return { audio: await response.arrayBuffer() };
    },
  };
};
