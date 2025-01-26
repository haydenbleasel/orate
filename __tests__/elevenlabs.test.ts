import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak } from '../src';
import { elevenlabs } from '../src/elevenlabs';

describe('ElevenLabs Tests', () => {
  it('should convert text to speech', async () => {
    const speech = await speak({
      model: elevenlabs.tts('multilingual_v2', 'aria'),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/elevenlabs-speech.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
