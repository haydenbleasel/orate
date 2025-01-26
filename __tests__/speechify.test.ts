import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak } from '../src';
import { speechify } from '../src/speechify';

describe('Speechify Tests', () => {
  it('should convert text to speech', async () => {
    const speech = await speak({
      model: speechify.tts('simba-turbo', 'george'),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/speechify-speech.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
