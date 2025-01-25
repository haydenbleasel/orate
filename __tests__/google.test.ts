import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../dist';
import { google } from '../dist/google';

const prompt = "What is love? Baby don't hurt me.";

describe('Speech API Tests', () => {
  it('should test Google text-to-speech and speech-to-text', async () => {
    const googleSpeech = await speak({
      model: google.tts(),
      prompt,
    });

    await writeFile(
      './__tests__/output/google-speech.wav',
      Buffer.from(googleSpeech)
    );
    expect(googleSpeech).toBeInstanceOf(ArrayBuffer);
    expect(googleSpeech.byteLength).toBeGreaterThan(0);

    const googleText = await transcribe({
      model: google.stt(),
      audio: googleSpeech,
    });
    expect(typeof googleText).toBe('string');
    expect(googleText.length).toBeGreaterThan(0);
  });
});
