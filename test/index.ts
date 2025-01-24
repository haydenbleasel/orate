import { writeFile } from "node:fs/promises";
import { speak, transcribe } from "../src";
import { openai } from "../src/openai";
import { assembly } from "../src/assembly";
import { elevenlabs } from "../src/eleven-labs";
import { azure } from "../src/azure";
import { google } from "../src/google";

const prompt = "What is love? Baby don't hurt me.";

// OpenAI Text to Speech
const openAiSpeech = await speak({
  model: openai.tts("tts-1", "alloy"),
  prompt,
});

await writeFile("./test/openai-speech.wav", Buffer.from(openAiSpeech));
console.log("OpenAI Text to Speech", openAiSpeech);


// OpenAI Speech to Text
const openAiText = await transcribe({
  model: openai.stt('whisper-1'),
  audio: openAiSpeech,
});

console.log("OpenAI Speech to Text", openAiText);

// ElevenLabs Text to Speech
const elevenLabsSpeech = await speak({
  model: elevenlabs.tts('multilingual_v2', 'aria'),
  prompt,
});

await writeFile("./test/eleven-labs-speech.wav", Buffer.from(elevenLabsSpeech));
console.log("ElevenLabs Text to Speech", elevenLabsSpeech);

// AssemblyAI Speech to Text
const assemblyText = await transcribe({
  model: assembly.stt(),
  audio: elevenLabsSpeech,
});

console.log("AssemblyAI Speech to Text", assemblyText);

// Azure Text to Speech
const azureSpeech = await speak({
  model: azure.tts('en-US-AvaMultilingualNeural'),
  prompt,
});

await writeFile("./test/azure-speech.wav", Buffer.from(azureSpeech));
console.log("Azure Text to Speech", azureSpeech);

// Azure Speech to Text
const azureText = await transcribe({
  model: azure.stt(),
  audio: azureSpeech,
});

console.log("Azure Speech to Text", azureText);

// Google Text to Speech
const googleSpeech = await speak({
  model: google.tts(),
  prompt,
});

await writeFile("./test/google-speech.wav", Buffer.from(googleSpeech));
console.log("Google Text to Speech", googleSpeech);

// Google Speech to Text
const googleText = await transcribe({
  model: google.stt(),
  audio: googleSpeech,
});

console.log("Google Speech to Text", googleText);

process.exit(0);
