import { generateSpeech } from "orate";
import { openai } from "orate/openai";

const { audio } = await generateSpeech({
  model: openai("tts-1", "alloy"),
  prompt: "What is love?",
});

console.log(text);
