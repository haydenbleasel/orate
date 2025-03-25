import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak } from '../src';
import { Speechify } from '../src/speechify';

describe('Speechify Tests', () => {
  const speechify = new Speechify();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: speechify.tts('simba-english', 'henry'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './website/public/examples/tts/speechify.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should stream text to speech', async () => {
    const stream = await speak({
      model: speechify.tts('simba-english', 'henry'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
      stream: true,
    });

    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const combinedBuffer = Buffer.concat(chunks);
    await writeFile(
      './__tests__/output/speechify-speech-stream.wav',
      combinedBuffer
    );

    expect(chunks.length).toBeGreaterThan(0);
    expect(combinedBuffer.length).toBeGreaterThan(0);
  });
});
