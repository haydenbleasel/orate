export type OrateModel = {
  tts?: () => (prompt: string) => Promise<ArrayBuffer>;
  stt?: () => (audio: ArrayBuffer) => Promise<string>;
};
