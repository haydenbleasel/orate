import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../src';
import { OpenAI } from '../src/openai';

describe('OpenAI Tests', () => {
  const openai = new OpenAI();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: openai.tts('tts-1', 'ash'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './__tests__/output/openai.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const text = await transcribe({
      model: openai.stt('whisper-1'),
      audio,
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });

  it('should stream text to speech', async () => {
    const stream = await speak({
      model: openai.tts('tts-1', 'ash'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
      stream: true,
    });

    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const combinedBuffer = Buffer.concat(chunks);
    await writeFile(
      './__tests__/output/openai-speech-stream.wav',
      combinedBuffer
    );

    expect(chunks.length).toBeGreaterThan(0);
    expect(combinedBuffer.length).toBeGreaterThan(0);
  });

  it('should stream speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const stream = await transcribe({
      model: openai.stt('whisper-1'),
      audio,
      stream: true,
    });

    const chunks: string[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks.join('').length).toBeGreaterThan(0);
  });
});
