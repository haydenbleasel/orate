import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribeWithUrl } from '../src';
import { jigsawstack } from '../src/jigsawstack';

describe('JigsawStack Tests', () => {
  it('should convert text to speech', async () => {
    const speech = await speak({
      model: jigsawstack.tts("en-US-female-10"),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/jigsawstack-speech.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const text = await transcribeWithUrl({
      model: jigsawstack.stt(),
      url:"https://uuvhpoxkzjnrvvajhnyb.supabase.co/storage/v1/object/sign/default/preview/stt-examples/stt_very_short_audio_sample_2.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L3ByZXZpZXcvc3R0LWV4YW1wbGVzL3N0dF92ZXJ5X3Nob3J0X2F1ZGlvX3NhbXBsZV8yLm1wMyIsImlhdCI6MTczMjIwMzIwNywiZXhwIjozMTU1MzAwNjY3MjA3fQ._R0cLbrIx_FUR3CMRYaUMj616diA_1fjWUcVq2vAONg&t=2024-11-21T15%3A33%3A27.154Z",
    });
    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });
});
