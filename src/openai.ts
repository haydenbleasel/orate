import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech";
import { SpeechModel } from "./types";
import { TranscriptionCreateParams } from "openai/resources/audio/transcriptions";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set");
}

const provider = new OpenAI({ apiKey });

export const openai = {
  speech: (model: SpeechCreateParams["model"], voice: SpeechCreateParams["voice"]) => {
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
  },
  transcribe: (model: TranscriptionCreateParams["model"]) => {
    return {
      generate: async (audio: ArrayBuffer) => {
        const response = await provider.audio.transcriptions.create({
          model,
          file: audio,
        });

        return response.text;
      },
    };
  },
};
