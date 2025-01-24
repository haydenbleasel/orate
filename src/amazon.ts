import {
  type Engine,
  PollyClient,
  SynthesizeSpeechCommand,
  type VoiceId,
} from '@aws-sdk/client-polly';
import {
  StartTranscriptionJobCommand,
  TranscribeClient,
} from '@aws-sdk/client-transcribe';

const createTTSProvider = () => {
  const apiKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;

  if (!apiKey) {
    throw new Error('AWS_ACCESS_KEY_ID is not set');
  }

  if (!region) {
    throw new Error('AWS_REGION is not set');
  }

  return new PollyClient({ region });
};

const createSTTProvider = () => {
  const apiKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;

  if (!apiKey) {
    throw new Error('AWS_ACCESS_KEY_ID is not set');
  }

  if (!region) {
    throw new Error('AWS_REGION is not set');
  }

  return new TranscribeClient({ region });
};

export const amazon = {
  tts: (model: Engine = 'standard', voice: VoiceId = 'Kimberly') => {
    const provider = createTTSProvider();

    return async (prompt: string) => {
      const response = await provider.send(
        new SynthesizeSpeechCommand({
          OutputFormat: 'mp3',
          Text: prompt,
          VoiceId: voice,
          Engine: model,
          LanguageCode: 'en-US',
        })
      );

      const audio = await response.AudioStream?.transformToByteArray();

      if (!audio) {
        throw new Error('No audio returned.');
      }

      return audio;
    };
  },
  stt: () => {
    const provider = createSTTProvider();

    return async (audio: ArrayBuffer) => {
      const content = Buffer.from(audio).toString('base64');
      const data = await provider.send(
        new StartTranscriptionJobCommand({
          TranscriptionJobName: 'transcribe',
          LanguageCode: 'en-US',
          MediaFormat: 'wav',
          Media: {
            MediaFileUri: `s3://${content}`,
          },
        })
      );

      return data.TranscriptionJob?.Transcript?.TranscriptFileUri;
    };
  },
};
