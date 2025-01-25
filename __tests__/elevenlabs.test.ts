import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../dist';
import { assembly } from '../dist/assembly';
import { elevenlabs } from '../dist/eleven-labs';

const prompt = "What is love? Baby don't hurt me.";

describe('Speech API Tests', () => {
  it('should test ElevenLabs text-to-speech and AssemblyAI speech-to-text', async () => {
    const elevenLabsSpeech = await speak({
      model: elevenlabs.tts('multilingual_v2', 'aria'),
      prompt,
    });

    await writeFile(
      './test/eleven-labs-speech.wav',
      Buffer.from(elevenLabsSpeech)
    );
    expect(elevenLabsSpeech).toBeInstanceOf(ArrayBuffer);
    expect(elevenLabsSpeech.byteLength).toBeGreaterThan(0);

    const assemblyText = await transcribe({
      model: assembly.stt('nano'),
      audio: elevenLabsSpeech,
    });
    expect(typeof assemblyText).toBe('string');
    expect(assemblyText.length).toBeGreaterThan(0);
  });
});
