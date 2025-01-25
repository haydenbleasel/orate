import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../dist';
import { azure } from '../dist/azure';

const prompt = "What is love? Baby don't hurt me.";

describe('Speech API Tests', () => {
  it('should test Azure text-to-speech and speech-to-text', async () => {
    const azureSpeech = await speak({
      model: azure.tts('en-US-AvaMultilingualNeural'),
      prompt,
    });

    await writeFile('./test/azure-speech.wav', Buffer.from(azureSpeech));
    expect(azureSpeech).toBeInstanceOf(ArrayBuffer);
    expect(azureSpeech.byteLength).toBeGreaterThan(0);

    const azureText = await transcribe({
      model: azure.stt(),
      audio: azureSpeech,
    });
    expect(typeof azureText).toBe('string');
    expect(azureText.length).toBeGreaterThan(0);
  });
});
