import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak } from '../src';
import { Play } from '../src/play';

describe('Play.ai Tests', () => {
  const play = new Play();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: play.tts('Play3.0-mini', 'Angelo'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './website/public/examples/tts/play.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
