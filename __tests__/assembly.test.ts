import { describe, expect, it } from 'vitest';
import { transcribe } from '../dist';
import { assembly } from '../dist/assembly';

describe('Speech API Tests', () => {
  it('should test AssemblyAI speech-to-text', async () => {
    const assemblyText = await transcribe({
      model: assembly.stt('nano'),
      audio: new ArrayBuffer(0), // Placeholder audio buffer
    });
    expect(typeof assemblyText).toBe('string');
    expect(assemblyText.length).toBeGreaterThan(0);
  });
});
