import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../dist';
import { openai } from '../dist/openai';

describe('OpenAI Tests', () => {
  it('should convert text to speech', async () => {
    const openAiSpeech = await speak({
      model: openai.tts('tts-1', 'alloy'),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/openai-speech.wav',
      Buffer.from(openAiSpeech)
    );

    expect(openAiSpeech).toBeInstanceOf(ArrayBuffer);
    expect(openAiSpeech.byteLength).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const audio = await readFile('./__tests__/test.mp3');

    const openAiText = await transcribe({
      model: openai.stt('whisper-1'),
      audio,
    });

    expect(typeof openAiText).toBe('string');
    expect(openAiText.length).toBeGreaterThan(0);
  });
});
