import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../dist';
import { ibm } from '../dist/ibm';

describe('IBM Tests', () => {
  it('should convert text to speech', async () => {
    const ibmSpeech = await speak({
      model: ibm.tts(),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/ibm-speech.wav',
      Buffer.from(ibmSpeech)
    );

    expect(ibmSpeech).toBeInstanceOf(ArrayBuffer);
    expect(ibmSpeech.byteLength).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const audio = await readFile('./__tests__/test.mp3');

    const ibmText = await transcribe({
      model: ibm.stt(),
      audio,
    });

    expect(typeof ibmText).toBe('string');
    expect(ibmText.length).toBeGreaterThan(0);
  });
});
