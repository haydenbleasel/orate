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

  body.append('audio', file);

  const response = await ky
    .post('https://api.gladia.io/v2/upload', {
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

const transcribe = async (audioUrl: string) => {
  const response = await ky
    .post('https://api.gladia.io/v2/pre-recorded', {
      json: {
        audio_url: audioUrl,
      },
      headers: {
        'x-gladia-key': getApiKey(),
      },
    })
    .json<TranscribeResponse>();

  return response.result_url;
};

type GetTranscriptionResponse = {
  result: {
    transcription: {
      full_transcript: string;
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

  return response.result.transcription.full_transcript;
};

/**
 * Gladia speech-to-text functionality
 */
export const gladia = {
  /**
   * Creates a speech-to-text transcription function using Gladia
   * @param {File} audio - The audio data to transcribe
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: () => {
    return async (audio: File) => {
      const audioUrl = await uploadFile(audio);
      const transcriptionUrl = await transcribe(audioUrl);
      const text = await getTranscription(transcriptionUrl);

      return text;
    };
  },
};
