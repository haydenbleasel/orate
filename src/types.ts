export type OrateModel = {
  tts?: () => (prompt: string) => Promise<ArrayBuffer>;
  sst?: () => (audio: ArrayBuffer) => Promise<string>;
};
