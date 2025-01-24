import { writeFile } from 'node:fs/promises';
import { speak, transcribe } from '../src';
import { assembly } from '../src/assembly';
import { azure } from '../src/azure';
import { elevenlabs } from '../src/eleven-labs';
import { google } from '../src/google';
import { ibm } from '../src/ibm';
import { openai } from '../src/openai';

const prompt = "What is love? Baby don't hurt me.";

// Create a table to track progress
const table = [
  ['OpenAI', 'Text to Speech', 'Pending', null, null],
  ['OpenAI', 'Speech to Text', 'Pending', null, null],
  ['ElevenLabs', 'Text to Speech', 'Pending', null, null],
  ['AssemblyAI', 'Speech to Text', 'Pending', null, null],
  ['Azure', 'Text to Speech', 'Pending', null, null],
  ['Azure', 'Speech to Text', 'Pending', null, null],
  ['Google', 'Text to Speech', 'Pending', null, null],
  ['Google', 'Speech to Text', 'Pending', null, null],
];

// Helper to print table
const printTable = () => {
  console.clear();
  console.table(
    table.map((row) => ({
      Provider: row[0],
      Job: row[1],
      Status: row[2],
      Output: row[3],
      Time: row[4],
    }))
  );
};

// Helper to update status
const updateStatus = (
  provider: string,
  job: string,
  status: 'Success' | 'Failed',
  output: string | number,
  time: number | null
) => {
  const row = table.findIndex((r) => r[0] === provider && r[1] === job);
  if (row >= 0) {
    table[row][2] = status;
    table[row][3] = output.toString();
    table[row][4] = time?.toFixed(2).toString() ?? null;
    printTable();
  }
};

// Initial table display
printTable();

try {
  // OpenAI Text to Speech
  const openAiSpeechStart = performance.now();
  const openAiSpeech = await speak({
    model: openai.tts('tts-1', 'alloy'),
    prompt,
  });
  const openAiSpeechEnd = performance.now();
  await writeFile('./test/openai-speech.wav', Buffer.from(openAiSpeech));
  updateStatus(
    'OpenAI',
    'Text to Speech',
    'Success',
    openAiSpeech.byteLength,
    openAiSpeechEnd - openAiSpeechStart
  );

  // OpenAI Speech to Text
  const openAiTextStart = performance.now();
  const openAiText = await transcribe({
    model: openai.stt('whisper-1'),
    audio: openAiSpeech,
  });
  const openAiTextEnd = performance.now();
  updateStatus(
    'OpenAI',
    'Speech to Text',
    'Success',
    openAiText,
    openAiTextEnd - openAiTextStart
  );

  // ElevenLabs Text to Speech
  const elevenLabsSpeechStart = performance.now();
  const elevenLabsSpeech = await speak({
    model: elevenlabs.tts('multilingual_v2', 'aria'),
    prompt,
  });
  const elevenLabsSpeechEnd = performance.now();
  await writeFile(
    './test/eleven-labs-speech.wav',
    Buffer.from(elevenLabsSpeech)
  );
  updateStatus(
    'ElevenLabs',
    'Text to Speech',
    'Success',
    elevenLabsSpeech.byteLength,
    elevenLabsSpeechEnd - elevenLabsSpeechStart
  );

  // AssemblyAI Speech to Text
  const assemblyTextStart = performance.now();
  const assemblyText = await transcribe({
    model: assembly.stt(),
    audio: elevenLabsSpeech,
  });
  const assemblyTextEnd = performance.now();
  updateStatus(
    'AssemblyAI',
    'Speech to Text',
    'Success',
    assemblyText,
    assemblyTextEnd - assemblyTextStart
  );

  // Azure Text to Speech
  const azureSpeechStart = performance.now();
  const azureSpeech = await speak({
    model: azure.tts('en-US-AvaMultilingualNeural'),
    prompt,
  });
  const azureSpeechEnd = performance.now();
  await writeFile('./test/azure-speech.wav', Buffer.from(azureSpeech));
  updateStatus(
    'Azure',
    'Text to Speech',
    'Success',
    azureSpeech.byteLength,
    azureSpeechEnd - azureSpeechStart
  );

  // Azure Speech to Text
  const azureTextStart = performance.now();
  const azureText = await transcribe({
    model: azure.stt(),
    audio: azureSpeech,
  });
  const azureTextEnd = performance.now();
  updateStatus(
    'Azure',
    'Speech to Text',
    'Success',
    azureText,
    azureTextEnd - azureTextStart
  );

  // IBM Text to Speech
  const ibmSpeechStart = performance.now();
  const ibmSpeech = await speak({
    model: ibm.tts(),
    prompt,
  });
  const ibmSpeechEnd = performance.now();
  await writeFile('./test/ibm-speech.wav', Buffer.from(ibmSpeech));
  updateStatus(
    'IBM',
    'Text to Speech',
    'Success',
    ibmSpeech.byteLength,
    ibmSpeechEnd - ibmSpeechStart
  );

  // IBM Speech to Text
  const ibmTextStart = performance.now();
  const ibmText = await transcribe({
    model: ibm.stt(),
    audio: ibmSpeech,
  });
  const ibmTextEnd = performance.now();
  updateStatus(
    'IBM',
    'Speech to Text',
    'Success',
    ibmText,
    ibmTextEnd - ibmTextStart
  );

  // Google Text to Speech
  const googleSpeechStart = performance.now();
  const googleSpeech = await speak({
    model: google.tts(),
    prompt,
  });
  const googleSpeechEnd = performance.now();
  await writeFile('./test/google-speech.wav', Buffer.from(googleSpeech));
  updateStatus(
    'Google',
    'Text to Speech',
    'Success',
    googleSpeech.byteLength,
    googleSpeechEnd - googleSpeechStart
  );

  // Google Speech to Text
  const googleTextStart = performance.now();
  const googleText = await transcribe({
    model: google.stt(),
    audio: googleSpeech,
  });
  const googleTextEnd = performance.now();
  updateStatus(
    'Google',
    'Speech to Text',
    'Success',
    googleText,
    googleTextEnd - googleTextStart
  );
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
