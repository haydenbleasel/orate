import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { isolate, speak, transcribe } from '../src';
import { CambAI } from '../src/cambai';

describe('CambAI Tests', () => {
  const cambai = new CambAI();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: cambai.tts(),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './website/public/examples/tts/cambai.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const text = await transcribe({
      model: cambai.stt(),
      audio,
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });

  it('should isolate speech', async () => {
    const file = await readFile('./__tests__/noise.mp3');
    const audio = new File([file], 'noise.mp3', { type: 'audio/mp3' });

    const speech = await isolate({
      model: cambai.isl(),
      audio,
    });

    await writeFile(
      './__tests__/output/cambai-speech-isolated.mp3',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
