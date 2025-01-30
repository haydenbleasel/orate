import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { change, isolate, speak } from '../src';
import { elevenlabs } from '../src/elevenlabs';

describe('ElevenLabs Tests', () => {
  it('should convert text to speech', async () => {
    const speech = await speak({
      model: elevenlabs.tts('multilingual_v2', 'bill'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './website/public/examples/tts/elevenlabs.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert text to speech with a custom voice', async () => {
    const speech = await speak({
      model: elevenlabs.tts(
        'multilingual_v2',
        process.env.ELEVENLABS_CUSTOM_VOICE_ID
      ),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './__tests__/output/elevenlabs-speech-custom.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to speech', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const speech = await change({
      model: elevenlabs.sts(),
      audio,
    });

    await writeFile(
      './__tests__/output/elevenlabs-speech-changed.mp3',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should isolate speech', async () => {
    const file = await readFile('./__tests__/noise.mp3');
    const audio = new File([file], 'noise.mp3', { type: 'audio/mp3' });

    const speech = await isolate({
      model: elevenlabs.isl(),
      audio,
    });

    await writeFile(
      './__tests__/output/elevenlabs-speech-isolated.mp3',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });
});
