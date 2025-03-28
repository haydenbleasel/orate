import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { change, speak } from '../src';
import { LMNT } from '../src/lmnt';

describe('LMNT Tests', () => {
  const lmnt = new LMNT();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: lmnt.tts('blizzard', 'zeke'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './__tests__/output/lmnt.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to speech', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const speech = await change({
      model: lmnt.sts(),
      audio,
    });

    await writeFile(
      './__tests__/output/lmnt-speech-changed.mp3',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
