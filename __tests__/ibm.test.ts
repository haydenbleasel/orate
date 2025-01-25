import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../dist';
import { ibm } from '../dist/ibm';

const prompt = "What is love? Baby don't hurt me.";

describe('Speech API Tests', () => {
  it('should test IBM text-to-speech and speech-to-text', async () => {
    const ibmSpeech = await speak({
      model: ibm.tts(),
      prompt,
    });

    await writeFile(
      './__tests__/output/ibm-speech.wav',
      Buffer.from(ibmSpeech)
    );
    expect(ibmSpeech).toBeInstanceOf(ArrayBuffer);
    expect(ibmSpeech.byteLength).toBeGreaterThan(0);

    const ibmText = await transcribe({
      model: ibm.stt(),
      audio: ibmSpeech,
    });
    expect(typeof ibmText).toBe('string');
    expect(ibmText.length).toBeGreaterThan(0);
  });
});
