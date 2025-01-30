import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak } from '../src';
import { play } from '../src/play';

describe('Play.ai Tests', () => {
  it('should convert text to speech', async () => {
    const speech = await speak({
      model: play.tts(
        'Play3.0-mini',
        's3://voice-cloning-zero-shot/baf1ef41-36b6-428c-9bdf-50ba54682bd8/original/manifest.json'
      ),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './__tests__/output/play-speech.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
