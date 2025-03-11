import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../src';
import { Lemonfox } from '../src/lemonfox';

describe('Lemonfox Tests', () => {
  const lemonfox = new Lemonfox();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: lemonfox.tts('en-gb', 'daniel'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './website/public/examples/tts/lemonfox.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const text = await transcribe({
      model: lemonfox.stt(),
      audio,
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });
});
