import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech";
import { TranscriptionCreateParams } from "openai/resources/audio/transcriptions";

const provider = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const openai = {
  speech: (model: SpeechCreateParams["model"], voice: SpeechCreateParams["voice"]) => {
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
    return async (audio: ArrayBuffer) => {
      const response = await provider.audio.transcriptions.create({
        model,
        file: audio,
      });

      return response.text;
    };
  },
};
