import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { transcribe } from '../src';
import { gladia } from '../src/gladia';

describe('Gladia Tests', () => {
  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const text = await transcribe({
      model: gladia.stt('enhanced'),
      audio,
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });
});
