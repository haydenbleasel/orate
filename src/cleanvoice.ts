import ky from 'ky';

const getApiKey = () => {
  const apiKey = process.env.CLEANVOICE_API_KEY;

  if (!apiKey) {
    throw new Error('CLEANVOICE_API_KEY is not set');
  }

  return apiKey;
};

const getPresignedUrl = async (file: File) => {
  const url = new URL('/v2/upload', 'https://api.cleanvoice.ai');

  url.searchParams.set('filename', file.name);

  const response = await ky
    .post(url, {
      headers: {
        'X-API-Key': getApiKey(),
      },
    })
    .json<{ signedUrl: string }>();

  return response.signedUrl;
};

const uploadFile = async (presignedUrl: string, file: File) => {
  const response = await ky.put(presignedUrl, {
    body: file,
    headers: {
      'X-API-Key': getApiKey(),
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to upload file');
  }
};

type EditOptions = {
  video?: boolean;
  send_email?: boolean;
  long_silences?: boolean;
  stutters?: boolean;
  fillers?: boolean;
  mouth_sounds?: boolean;
  hesitations?: boolean;
  muted?: boolean;
  remove_noise?: boolean;
  keep_music?: boolean;
  breath?: boolean;
  normalize?: boolean;
  autoeq?: boolean;
  sound_studio?: boolean;
  mute_lufs?: number;
  target_lufs?: number;
  export_format?: 'auto' | 'mp3' | 'wav' | 'flac' | 'm4a';
  transcription?: boolean;
  summarize?: boolean;
  social_content?: boolean;
  export_timestamps?: boolean;
  signed_url?: string;
  merge?: boolean;
};

const edit = async (
  audioUrl: string,
  options?: Omit<EditOptions, 'transcription'>
) => {
  const url = new URL('/v2/edits', 'https://api.cleanvoice.ai');

  const response = await ky
    .post(url, {
      json: {
        input: {
          files: [audioUrl],
          config: {
            ...options,
            transcription: true,
          },
        },
      },
      headers: {
        'X-API-Key': getApiKey(),
      },
    })
    .json<{ id: string }>();

  return response.id;
};

type GetEditResponse = {
  status: 'PENDING' | 'STARTED' | 'SUCCESS' | 'RETRY' | 'FAILURE';
  result: {
    video: boolean;
    filename: string;
    statistics: {
      BREATH: number;
      DEADAIR: number;
      STUTTERING: number;
      MOUTH_SOUND: number;
      FILLER_SOUND: number;
    };
    download_url: string;
    summarization: {
      title: string;
      summary: string;
      chapters: {
        start: number;
        title: string;
      }[];
      summaries: string[];
      key_learnings: string;
      summary_of_summary: string;
      episode_description: string;
    };
    transcription: {
      paragraphs: {
        end: number;
        text: string;
        start: number;
      }[];
      transcription: {
        words: {
          id: number;
          end: number;
          text: string;
          start: number;
        }[];
        paragraphs: {
          id: number;
          end: number;
          start: number;
          speaker: string;
        }[];
      };
    };
    social_content: unknown[];
    merged_audio_url: unknown[];
    timestamps_markers_urls: unknown[];
  };
  task_id: string;
};

const getEdit = async (id: string) => {
  const response = await ky
    .get(`https://api.cleanvoice.ai/v2/edits/${id}`, {
      headers: {
        'X-API-Key': getApiKey(),
      },
    })
    .json<GetEditResponse>();

  if (response.status === 'FAILURE') {
    throw new Error(`Error: ${response.status}`);
  }

  if (response.status === 'SUCCESS') {
    return response.result;
  }
};

export const cleanvoice = {
  /**
   * Creates a speech-to-text transcription function using CleanVoice
   * @param {Omit<EditOptions, 'transcription'>} properties - Additional properties for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt: (options?: Omit<EditOptions, 'transcription'>) => {
    return async (audio: File) => {
      const presignedUrl = await getPresignedUrl(audio);

      await uploadFile(presignedUrl, audio);

      const id = await edit(presignedUrl, options);

      while (true) {
        const result = await getEdit(id);

        if (result) {
          return result.transcription.paragraphs.map((p) => p.text).join(' ');
        }

        // If queued or processing, wait 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
  },

  /**
   * Creates a speech-to-text transcription function using Gladia
   * @param {object} options - Additional options for the transcription request
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  isl: (options?: EditOptions) => {
    return async (audio: File) => {
      const presignedUrl = await getPresignedUrl(audio);

      await uploadFile(presignedUrl, audio);

      const id = await edit(presignedUrl, options);

      while (true) {
        const result = await getEdit(id);

        if (result) {
          const response = await ky.get(result.download_url, {
            headers: {
              'X-API-Key': getApiKey(),
            },
          });

          const buffer = await response.arrayBuffer();
          const file = new File([buffer], 'isolated-speech.mp3', {
            type: 'audio/mpeg',
          });

          return file;
        }

        // If queued or processing, wait 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
  },
};
