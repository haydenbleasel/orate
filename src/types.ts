export type OrateModel = {
  tts?: () => (prompt: string) => Promise<File>;
  stt?: () => (audio: File) => Promise<string>;
};
