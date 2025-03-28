import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { change, isolate, speak, transcribe } from '../src';
import { ElevenLabs } from '../src/elevenlabs';

describe('ElevenLabs Tests', () => {
  const elevenlabs = new ElevenLabs();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: elevenlabs.tts('eleven_multilingual_v2', 'bill'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './__tests__/output/elevenlabs.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to text', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const text = await transcribe({
      model: elevenlabs.stt('scribe_v1'),
      audio,
    });

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });

  it('should convert text to speech with a custom voice', async () => {
    const speech = await speak({
      model: elevenlabs.tts(
        'eleven_multilingual_sts_v2',
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

  it('should stream speech', async () => {
    const stream = await speak({
      model: elevenlabs.tts(),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
      stream: true,
    });

    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const combinedBuffer = Buffer.concat(chunks);
    await writeFile(
      './__tests__/output/elevenlabs-speech-stream.mp3',
      combinedBuffer
    );

    expect(chunks.length).toBeGreaterThan(0);
    expect(combinedBuffer.length).toBeGreaterThan(0);
  });

  it('should stream speech with custom voice', async () => {
    const stream = await speak({
      model: elevenlabs.tts(),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
      stream: true,
    });

    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const combinedBuffer = Buffer.concat(chunks);
    await writeFile(
      './__tests__/output/elevenlabs-speech-custom-stream.mp3',
      combinedBuffer
    );

    expect(chunks.length).toBeGreaterThan(0);
    expect(combinedBuffer.length).toBeGreaterThan(0);
  });

  it('should stream speech to speech conversion', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const stream = await change({
      model: elevenlabs.sts(),
      audio,
      stream: true,
    });

    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const combinedBuffer = Buffer.concat(chunks);
    await writeFile(
      './__tests__/output/elevenlabs-speech-changed-stream.mp3',
      combinedBuffer
    );

    expect(chunks.length).toBeGreaterThan(0);
    expect(combinedBuffer.length).toBeGreaterThan(0);
  });

  it('should stream isolated speech', async () => {
    const file = await readFile('./__tests__/noise.mp3');
    const audio = new File([file], 'noise.mp3', { type: 'audio/mp3' });

    const stream = await isolate({
      model: elevenlabs.isl(),
      audio,
      stream: true,
    });

    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const combinedBuffer = Buffer.concat(chunks);
    await writeFile(
      './__tests__/output/elevenlabs-speech-isolated-stream.mp3',
      combinedBuffer
    );

    expect(chunks.length).toBeGreaterThan(0);
    expect(combinedBuffer.length).toBeGreaterThan(0);
  });
});
