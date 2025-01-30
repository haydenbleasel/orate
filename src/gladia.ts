import ky from 'ky';

const getApiKey = () => {
  const apiKey = process.env.GLADIA_API_KEY;

  if (!apiKey) {
    throw new Error('GLADIA_API_KEY is not set');
  }

  return apiKey;
};

type UploadResponse = {
  audio_url: string;
};

const uploadFile = async (file: File) => {
  const body = new FormData();
  const url = new URL('/v2/upload', 'https://api.gladia.io');

  body.append('audio', file);

  const response = await ky
    .post(url, {
      body,
      headers: {
        'x-gladia-key': getApiKey(),
      },
    })
    .json<UploadResponse>();

  return response.audio_url;
};

type TranscribeResponse = {
  result_url: string;
};

const transcribe = async (
  audioUrl: string,
  model: string,
  options?: object
) => {
  const url = new URL('/v2/pre-recorded', 'https://api.gladia.io');

  const response = await ky
    .post(url, {
      json: {
        ...options,
        audio_url: audioUrl,
        translation_config: {
          ...(options
            ? (options as { translation_config: object }).translation_config
            : {}),
          model,
        },
      },
      headers: {
        'x-gladia-key': getApiKey(),
      },
    })
    .json<TranscribeResponse>();

  return response.result_url;
};

type GetTranscriptionResponse = {
  status: 'queued' | 'processing' | 'done' | 'error';
  result?: {
    transcription?: {
      full_transcript?: string;
    };
  };
};

const getTranscription = async (transcriptionUrl: string) => {
  const response = await ky
    .get(transcriptionUrl, {
      headers: {
        'x-gladia-key': getApiKey(),
      },
    })
    .json<GetTranscriptionResponse>();

  if (response.status === 'error') {
    throw new Error(`Error: ${response.status}`);
  }

  if (response.status === 'done') {
    if (!response.result?.transcription?.full_transcript) {
      throw new Error('No transcription');
    }

    return response.result.transcription.full_transcript;
  }
};

export const gladia = {
  /**
   * Creates a speech-to-text transcription function using Gladia
   * @param {'base' | 'enhanced'} model - The model to use for transcription. Defaults to 'base'
   * @param {object} options - Additional options for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (model: 'base' | 'enhanced' = 'base', options?: object) => {
    return async (audio: File) => {
      const audioUrl = await uploadFile(audio);
      const transcriptionUrl = await transcribe(audioUrl, model, options);

      while (true) {
        const text = await getTranscription(transcriptionUrl);

        if (text) {
          return text;
        }

        // If queued or processing, wait 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
  },
};
