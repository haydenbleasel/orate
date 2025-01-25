import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../dist';
import { openai } from '../dist/openai';

const prompt = "What is love? Baby don't hurt me.";

describe('Speech API Tests', () => {
  it('should test OpenAI text-to-speech and speech-to-text', async () => {
    const openAiSpeech = await speak({
      model: openai.tts('tts-1', 'alloy'),
      prompt,
    });

    await writeFile('./test/openai-speech.wav', Buffer.from(openAiSpeech));
    expect(openAiSpeech).toBeInstanceOf(ArrayBuffer);
    expect(openAiSpeech.byteLength).toBeGreaterThan(0);

    const openAiText = await transcribe({
      model: openai.stt('whisper-1'),
      audio: openAiSpeech,
    });
    expect(typeof openAiText).toBe('string');
    expect(openAiText.length).toBeGreaterThan(0);
  });
});
