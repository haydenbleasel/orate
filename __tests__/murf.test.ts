import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak } from '../src';
import { Murf } from '../src/murf';

describe('Murf Tests', () => {
  const murf = new Murf();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: murf.tts('GEN2', 'en-US-terrell'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './website/public/examples/tts/murf.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
