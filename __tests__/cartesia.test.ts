import { readFile, writeFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { change, speak } from '../src';
import { Cartesia } from '../src/cartesia';

describe('Cartesia Tests', () => {
  const cartesia = new Cartesia();

  it('should convert text to speech', async () => {
    const speech = await speak({
      model: cartesia.tts('sonic-2', 'Silas'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
    });

    await writeFile(
      './website/public/examples/tts/cartesia.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should convert speech to speech', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const speech = await change({
      model: cartesia.sts('Silas'),
      audio,
    });

    await writeFile(
      './__tests__/output/cartesia-speech-changed.wav',
      Buffer.from(await speech.arrayBuffer())
    );

    expect(speech).toBeInstanceOf(File);
    expect(speech.size).toBeGreaterThan(0);
  });

  it('should stream text to speech', async () => {
    const stream = await speak({
      model: cartesia.tts('sonic-2', 'Silas'),
      prompt: 'Friends, Romans, countrymen, lend me your ears!',
      stream: true,
    });

    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const combinedBuffer = Buffer.concat(chunks);
    await writeFile(
      './__tests__/output/cartesia-speech-stream.wav',
      combinedBuffer
    );

    expect(chunks.length).toBeGreaterThan(0);
    expect(combinedBuffer.length).toBeGreaterThan(0);
  });

  it('should stream speech to speech conversion', async () => {
    const file = await readFile('./__tests__/test.mp3');
    const audio = new File([file], 'test.mp3', { type: 'audio/mp3' });

    const stream = await change({
      model: cartesia.sts('Silas'),
      audio,
      stream: true,
    });

    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const combinedBuffer = Buffer.concat(chunks);
    await writeFile(
      './__tests__/output/cartesia-speech-changed-stream.wav',
      combinedBuffer
    );

    expect(chunks.length).toBeGreaterThan(0);
    expect(combinedBuffer.length).toBeGreaterThan(0);
  });
});
