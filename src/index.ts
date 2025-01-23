import { SpeechModel } from "./types";

export type GenerateSpeechOptions = {
  model: SpeechModel;
  prompt: string;
};

export async function generateSpeech({
  model,
  prompt,
}: GenerateSpeechOptions): Promise<{ audio: ArrayBuffer }> {
  return model.generate(prompt);
}

