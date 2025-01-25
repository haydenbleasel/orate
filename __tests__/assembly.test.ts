import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { transcribe } from '../src';
import { assembly } from '../src/assembly';

describe('AssemblyAI Tests', () => {
  it('should convert speech to text', async () => {
    const audio = await readFile('./__tests__/test.mp3');
    const file = new File([audio], 'test.mp3', { type: 'audio/mp3' });

    const assemblyText = await transcribe({
      model: assembly.stt(),
      audio: file,
    });

    expect(typeof assemblyText).toBe('string');
    expect(assemblyText.length).toBeGreaterThan(0);
  });
});
