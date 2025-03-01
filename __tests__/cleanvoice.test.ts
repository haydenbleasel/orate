import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { isolate, transcribe } from '../src';
import { cleanvoice } from '../src/cleanvoice';

describe('CleanVoice Tests', () => {
  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const text = await transcribe({
      model: cleanvoice.stt(),
      audio,
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });

  it('should isolate speech', async () => {
    const file = await readFile('./__tests__/noise.mp3');
    const audio = new File([file], 'noise.mp3', { type: 'audio/mp3' });

    const speech = await isolate({
      model: cleanvoice.isl(),
      audio,
    });

    await writeFile(
      './__tests__/output/cleanvoice-speech-isolated.mp3',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
