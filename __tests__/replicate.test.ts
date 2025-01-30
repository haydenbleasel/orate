import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { isolate, speak, transcribe } from '../src';
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
        async (response) => {
          const stream = response as ReadableStream;
          const reader = stream.getReader();
          const chunks: Uint8Array[] = [];

          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            chunks.push(value);
          }

          const blob = new Blob(chunks, { type: 'audio/mpeg' });

          return new File([blob], 'speech.mp3', {
            type: 'audio/mpeg',
          });
        }
      ),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './website/public/examples/tts/replicate.wav',
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
            speaker:
              'https://replicate.delivery/pbxt/Jt79w0xsT64R1JsiJ0LQRL8UcWspg5J4RFrU6YwEKpOT1ukS/male.wav',
          },
        }),
        async (response) => {
          const stream = response as ReadableStream;
          const reader = stream.getReader();
          const chunks: Uint8Array[] = [];

          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            chunks.push(value);
          }

          const blob = new Blob(chunks, { type: 'audio/mpeg' });

          return new File([blob], 'speech.mp3', {
            type: 'audio/mpeg',
          });
        }
      ),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './__tests__/output/xtts-v2-speech.wav',
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
        (response) => {
          const { segments } = response as {
            segments: {
              text: string;
            }[];
          };

          return segments.map((segment) => segment.text).join(' ');
        }
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
        (response) => {
          const { text } = response as { text: string };

          return text;
        }
      ),
      audio: new File([], 'test.mp3', { type: 'audio/mp3' }),
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });

  it('should isolate speech with cjwbw/audiosep', async () => {
    const file = await readFile('./__tests__/noise.mp3');
    const audio = new File([file], 'noise.mp3', { type: 'audio/mp3' });

    const speech = await isolate({
      model: replicate.isl(
        'cjwbw/audiosep:f07004438b8f3e6c5b720ba889389007cbf8dbbc9caa124afc24d9bbd2d307b8',
        () => ({
          input: {
            audio_file: new URL(
              '/noise.mp3',
              'https://www.orate.dev'
            ).toString(),
            text: 'speech',
          },
        }),
        async (response) => {
          const stream = response as ReadableStream;
          const reader = stream.getReader();
          const chunks: Uint8Array[] = [];

          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            chunks.push(value);
          }

          const blob = new Blob(chunks, { type: 'audio/mp3' });

          return new File([blob], 'isolated.mp3', {
            type: 'audio/mpeg',
          });
        }
      ),
      audio,
    });

    await writeFile(
      './__tests__/output/audiosep-speech-isolated.mp3',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
