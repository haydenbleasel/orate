import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak } from '../src';
import { Neuphonic } from '../src/neuphonic';

describe('Neuphonic Tests', () => {
  const neuphonic = new Neuphonic();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: neuphonic.tts('James'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './__tests__/output/neuphonic.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
