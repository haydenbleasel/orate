export type SpeakOptions = {
  model: (prompt: string) => Promise<ArrayBuffer>;
  prompt: string;
};

export async function speak({
  model,
  prompt,
}: SpeakOptions): Promise<ArrayBuffer> {
  return await model(prompt);
}

export type TranscribeOptions = {
  model: (audio: ArrayBuffer) => Promise<string>;
  audio: ArrayBuffer;
};

export async function transcribe({ model, audio }: TranscribeOptions): Promise<string> {
  return await model(audio);
}
