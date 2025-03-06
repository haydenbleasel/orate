import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../src';
import { AzureOpenAI } from '../src/azure.openai';

describe('Azure OpenAI Tests', () => {
  const openaiAzure = new AzureOpenAI();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: openaiAzure.tts('tts-hd', 'alloy'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './website/public/examples/tts/azure.openai.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const text = await transcribe({
      model: openaiAzure.stt('whisper'),
      audio,
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });
});
