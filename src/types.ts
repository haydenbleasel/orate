export type SpeechModel = {
  generate: (prompt: string) => Promise<{ audio: ArrayBuffer }>;
};