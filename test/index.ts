import { generateSpeech } from "../dist";
import { openai } from "../dist/openai";

const { audio } = await generateSpeech({
  model: openai.speech("tts-1", "alloy"),
  prompt: "What is love?",
});

const text = await openai.transcribe({
  model: openai.transcribe("whisper-1"),
  audio,
});

console.log(text);
