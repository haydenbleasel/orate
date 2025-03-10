import ky from 'ky';

type SpeechToTextRequest = {
  file: File | URL;
  response_format?: 'json' | 'text' | 'srt' | 'verbose_json' | 'vtt';
  speaker_labels?: boolean;
  prompt?: string;
  language?:
    | 'english'
    | 'chinese'
    | 'german'
    | 'spanish'
    | 'russian'
    | 'korean'
    | 'french'
    | 'japanese'
    | 'portuguese'
    | 'turkish'
    | 'polish'
    | 'catalan'
    | 'dutch'
    | 'arabic'
    | 'swedish'
    | 'italian'
    | 'indonesian'
    | 'hindi'
    | 'finnish'
    | 'vietnamese'
    | 'hebrew'
    | 'ukrainian'
    | 'greek'
    | 'malay'
    | 'czech'
    | 'romanian'
    | 'danish'
    | 'hungarian'
    | 'tamil'
    | 'norwegian'
    | 'thai'
    | 'urdu'
    | 'croatian'
    | 'bulgarian'
    | 'lithuanian'
    | 'latin'
    | 'maori'
    | 'malayalam'
    | 'welsh'
    | 'slovak'
    | 'telugu'
    | 'persian'
    | 'latvian'
    | 'bengali'
    | 'serbian'
    | 'azerbaijani'
    | 'slovenian'
    | 'kannada'
    | 'estonian'
    | 'macedonian'
    | 'breton'
    | 'basque'
    | 'icelandic'
    | 'armenian'
    | 'nepali'
    | 'mongolian'
    | 'bosnian'
    | 'kazakh'
    | 'albanian'
    | 'swahili'
    | 'galician'
    | 'marathi'
    | 'punjabi'
    | 'sinhala'
    | 'khmer'
    | 'shona'
    | 'yoruba'
    | 'somali'
    | 'afrikaans'
    | 'occitan'
    | 'georgian'
    | 'belarusian'
    | 'tajik'
    | 'sindhi'
    | 'gujarati'
    | 'amharic'
    | 'yiddish'
    | 'lao'
    | 'uzbek'
    | 'faroese'
    | 'haitian creole'
    | 'pashto'
    | 'turkmen'
    | 'nynorsk'
    | 'maltese'
    | 'sanskrit'
    | 'luxembourgish'
    | 'myanmar'
    | 'tibetan'
    | 'tagalog'
    | 'malagasy'
    | 'assamese'
    | 'tatar'
    | 'hawaiian'
    | 'lingala'
    | 'hausa'
    | 'bashkir'
    | 'javanese'
    | 'sundanese'
    | 'cantonese'
    | 'burmese'
    | 'valencian'
    | 'flemish'
    | 'haitian'
    | 'letzeburgesch'
    | 'pushto'
    | 'panjabi'
    | 'moldavian'
    | 'moldovan'
    | 'sinhalese'
    | 'castilian'
    | 'mandarin';
  callback_url?: URL;
  translate?: boolean;
};

type SpeechToTextResponse = {
  text: string;
};

type TextToSpeechRequest = {
  input: string;
  response_format?: 'mp3' | 'opus' | 'aac' | 'flac' | 'pcm' | 'ogg' | 'wav';
  speed?: number;
  word_timestamps?: boolean;
} & (
  | {
      language: 'en-us';
      voice:
        | 'heart'
        | 'bella'
        | 'michael'
        | 'alloy'
        | 'aoede'
        | 'kore'
        | 'jessica'
        | 'nicole'
        | 'nova'
        | 'river'
        | 'sarah'
        | 'sky'
        | 'echo'
        | 'eric'
        | 'fenrir'
        | 'liam'
        | 'onyx'
        | 'puck'
        | 'adam'
        | 'santa';
    }
  | {
      language: 'en-gb';
      voice:
        | 'alice'
        | 'emma'
        | 'isabella'
        | 'lily'
        | 'daniel'
        | 'fable'
        | 'george'
        | 'lewis';
    }
  | {
      language: 'ja';
      voice: 'alpha' | 'gongitsune' | 'nezumi' | 'tebukuro' | 'kumo';
    }
  | {
      language: 'zh';
      voice:
        | 'xiaobei'
        | 'xiaoni'
        | 'xiaoxiao'
        | 'xiaoyi'
        | 'yunjian'
        | 'yunxi'
        | 'yunxia'
        | 'yunyang';
    }
  | {
      language: 'es';
      voice: 'dora' | 'alex' | 'santa';
    }
  | {
      language: 'fr';
      voice: 'siwis';
    }
  | {
      language: 'hi';
      voice: 'alpha' | 'beta' | 'omega' | 'psi';
    }
  | {
      language: 'it';
      voice: 'sara' | 'nicola';
    }
  | {
      language: 'pt-br';
      voice: 'dora' | 'alex' | 'santa';
    }
);

export class LemonFox {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.LEMONFOX_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('LEMONFOX_API_KEY is not set');
    }
  }

  private getApiKey() {
    return this.apiKey;
  }

  /**
   * Creates a text-to-speech synthesis function using LemonFox
   * @param {string} voice - The voice to use for synthesis. Defaults to 'sarah'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts<L extends TextToSpeechRequest['language']>(
    language: L,
    voice: Extract<TextToSpeechRequest, { language: L }>['voice'],
    options: Omit<TextToSpeechRequest, 'input' | 'language' | 'voice'>
  ) {
    return async (prompt: string) => {
      const json = {
        input: prompt,
        language,
        voice,
        response_format: 'wav',
        ...options,
      } as const;

      const response = await ky.post(
        'https://api.lemonfox.ai/v1/audio/speech',
        {
          json,
          headers: {
            Authorization: `Bearer ${this.getApiKey()}`,
          },
        }
      );

      const buffer = await response.arrayBuffer();
      return new File([buffer], 'speech.wav', {
        type: 'audio/wav',
      });
    };
  }

  /**
   * Creates a speech-to-text transcription function using LemonFox
   * @param {Omit<SpeechToTextRequest, 'file' | 'response_format'>} options - The options for the transcription.
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt(options: Omit<SpeechToTextRequest, 'file' | 'response_format'>) {
    return async (audio: File) => {
      const body = new FormData();

      body.append('file', audio);
      body.append('response_format', 'json');

      for (const key in options) {
        if (options[key as keyof typeof options] !== undefined) {
          body.append(key, options[key as keyof typeof options] as never);
        }
      }

      const response = await ky
        .post<SpeechToTextResponse>(
          'https://api.lemonfox.ai/v1/audio/transcriptions',
          {
            body,
            headers: {
              Authorization: `Bearer ${this.getApiKey()}`,
            },
          }
        )
        .json<SpeechToTextResponse>();

      return response.text;
    };
  }
}
