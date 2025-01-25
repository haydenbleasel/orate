import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../src';
import { openai } from '../src/openai';

describe('OpenAI Tests', () => {
  it('should convert text to speech', async () => {
    const speech = await speak({
      model: openai.tts('tts-1', 'alloy'),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/openai-speech.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(ArrayBuffer);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const openAiText = await transcribe({
      model: openai.stt('whisper-1'),
      audio,
    });

    expect(typeof openAiText).toBe('string');
    expect(openAiText.length).toBeGreaterThan(0);
  });
});
