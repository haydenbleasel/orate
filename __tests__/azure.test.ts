import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../dist';
import { azure } from '../dist/azure';

describe('Azure Tests', () => {
  it('should convert text to speech', async () => {
    const azureSpeech = await speak({
      model: azure.tts('en-US-AvaMultilingualNeural'),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/azure-speech.wav',
      Buffer.from(azureSpeech)
    );

    expect(azureSpeech).toBeInstanceOf(ArrayBuffer);
    expect(azureSpeech.byteLength).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const audio = await readFile('./__tests__/test.mp3');

    const azureText = await transcribe({
      model: azure.stt(),
      audio,
    });

    expect(typeof azureText).toBe('string');
    expect(azureText.length).toBeGreaterThan(0);
  });
});
