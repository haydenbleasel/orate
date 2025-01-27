import { writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { speak, transcribe } from '../src';
import { replicate } from '../src/replicate';

describe('Replicate Tests', () => {
  it('should convert text to speech using jaaari/kokoro-82m', async () => {
    const speech = await speak({
      model: replicate.tts(
        'jaaari/kokoro-82m:dfdf537ba482b029e0a761699e6f55e9162cfd159270bfe0e44857caa5f275a6',
        (prompt) => ({
          input: {
            text: prompt,
          },
        }),
        (response) => {
          const buffer = Buffer.from(response as ArrayBuffer);
          return new File([buffer], 'speech.mp3', { type: 'audio/mpeg' });
        }
      ),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/openai-speech.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert text to speech using lucataco/xtts-v2', async () => {
    const speech = await speak({
      model: replicate.tts(
        'lucataco/xtts-v2:684bc3855b37866c0c65add2ff39c78f3dea3f4ff103a436465326e0f438d55e',
        (prompt) => ({
          input: {
            text: prompt,
          },
        }),
        (response) => {
          const buffer = Buffer.from(response as ArrayBuffer);
          return new File([buffer], 'speech.mp3', { type: 'audio/mpeg' });
        }
      ),
      prompt: 'Hello from Orate, the AI toolkit for speech.',
    });

    await writeFile(
      './__tests__/output/openai-speech.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to text using victor-upmeet/whisperx', async () => {
    const text = await transcribe({
      model: replicate.stt(
        'victor-upmeet/whisperx:84d2ad2d6194fe98a17d2b60bef1c7f910c46b2f6fd38996ca457afd9c8abfcb',
        () => ({
          input: {
            audio_file: new URL(
              '/test.mp3',
              'https://www.orate.dev'
            ).toString(),
          },
        }),
        (response) =>
          (
            response as {
              output: {
                segments: {
                  text: string;
                }[];
              };
            }
          ).output.segments
            .map((segment) => segment.text)
            .join(' ')
      ),
      audio: new File([], 'test.mp3', { type: 'audio/mp3' }),
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });

  it('should convert speech to text using vaibhavs10/incredibly-fast-whisper', async () => {
    const text = await transcribe({
      model: replicate.stt(
        'vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c',
        () => ({
          input: {
            audio: new URL('/test.mp3', 'https://www.orate.dev').toString(),
          },
        }),
        (response) =>
          (
            response as {
              output: {
                text: string;
              };
            }
          ).output.text
      ),
      audio: new File([], 'test.mp3', { type: 'audio/mp3' }),
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });
});
