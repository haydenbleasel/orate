import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak } from '../src';
import { elevenlabs } from '../src/eleven-labs';

describe('ElevenLabs Tests', () => {
  it('should convert text to speech', async () => {
    const speech = await speak({
      model: elevenlabs.tts('multilingual_v2', 'aria'),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/eleven-labs-speech.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(ArrayBuffer);
    expect(speech.size).toBeGreaterThan(0);
  });
});
