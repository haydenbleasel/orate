import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { transcribe } from '../dist';
import { assembly } from '../dist/assembly';

describe('AssemblyAI Tests', () => {
  it('should convert speech to text', async () => {
    const audio = await readFile('./test.mp3');

    const assemblyText = await transcribe({
      model: assembly.stt(),
      audio,
    });

    expect(typeof assemblyText).toBe('string');
    expect(assemblyText.length).toBeGreaterThan(0);
  });
});
