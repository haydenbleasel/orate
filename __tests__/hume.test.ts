import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak } from '../src';
import { Hume } from '../src/hume';

describe('Hume Tests', () => {
  const hume = new Hume();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: hume.tts('A Roman senator'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './__tests__/output/hume.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
