import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../dist';
import { google } from '../dist/google';

describe('Google Tests', () => {
  it('should convert text to speech', async () => {
    const googleSpeech = await speak({
      model: google.tts(),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/google-speech.wav',
      Buffer.from(googleSpeech)
    );

    expect(googleSpeech).toBeInstanceOf(ArrayBuffer);
    expect(googleSpeech.byteLength).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const audio = await readFile('./__tests__/test.mp3');

    const googleText = await transcribe({
      model: google.stt(),
      audio,
    });

    expect(typeof googleText).toBe('string');
    expect(googleText.length).toBeGreaterThan(0);
  });
});
