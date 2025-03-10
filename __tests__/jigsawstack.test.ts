import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../src';
import { JigsawStack } from '../src/jigsawstack';

describe('JigsawStack Tests', () => {
  const jigsawstack = new JigsawStack();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: jigsawstack.tts('en-US-female-10'),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './website/public/examples/tts/jigsawstack.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const text = await transcribe({
      model: jigsawstack.stt(),
      audio,
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });
});
