import { speak, transcribe } from "../dist";
import { openai } from "../dist/openai";
import { assembly } from "../dist/assembly";
import { elevenlabs } from "../dist/eleven-labs";

// OpenAI Text to Speech
const openAiSpeech = await speak({
  model: openai.tts("tts-1", "alloy"),
  prompt: "What is love?",
});

console.log("OpenAI Text to Speech", openAiSpeech);

// OpenAI Speech to Text
const openAiText = await transcribe({
  model: openai.sst("whisper-1"),
  audio: openAiSpeech,
});

console.log("OpenAI Speech to Text", openAiText);

// ElevenLabs Text to Speech
const elevenLabsSpeech = await speak({
  model: elevenlabs.tts("eleven_multilingual_v2"),
  prompt: "What is love?",
});

console.log("ElevenLabs Text to Speech", elevenLabsSpeech);

// AssemblyAI Speech to Text
const assemblyText = await transcribe({
  model: assembly.sst(),
  audio: elevenLabsSpeech,
});

console.log("AssemblyAI Speech to Text", assemblyText);
