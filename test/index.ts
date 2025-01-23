import { speak, transcribe } from "../dist";
import { openai } from "../dist/openai";
import { assembly } from "../dist/assembly";
import { elevenlabs } from "../dist/eleven-labs";

// OpenAI Text to Speech
const { audio } = await speak({
  model: openai.speech("tts-1", "alloy"),
  prompt: "What is love?",
});

// OpenAI Speech to Text
const text = await transcribe({
  model: openai.transcribe("whisper-1"),
  audio,
});

// ElevenLabs Text to Speech
const { audio } = await speak({
  model: elevenlabs.speech("eleven_multilingual_v2"),
  prompt: "What is love?",
});

// AssemblyAI Speech to Text
const text = await transcribe({
  model: assembly.transcribe(),
  audio,
});

console.log(text);
