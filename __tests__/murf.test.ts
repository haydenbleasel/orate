import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak } from '../src';
import { murf } from '../src/murf';

describe('Murf Tests', () => {
  it('should convert text to speech', async () => {
    const speech = await speak({
      model: murf.tts(),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './__tests__/output/murf-speech.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
