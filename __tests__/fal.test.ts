import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { transcribe } from '../src';
import { Fal } from '../src/fal';

describe('fal Tests', () => {
  const fal = new Fal();

  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const text = await transcribe({
      model: fal.stt('fal-ai/whisper'),
      audio,
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });
});
