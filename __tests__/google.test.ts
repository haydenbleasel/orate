import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../src';
import { Google } from '../src/google';

describe('Google Tests', () => {
  const google = new Google();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: google.tts('en-US-Journey-D'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './website/public/examples/tts/google.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const text = await transcribe({
      model: google.stt(process.env.GOOGLE_RECOGNIZER as string),
      audio,
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });
});
