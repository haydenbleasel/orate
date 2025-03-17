import { createClient, toWav } from '@neuphonic/neuphonic-js';
import type { TtsConfig } from '@neuphonic/neuphonic-js';

/**
 * All Neuphonic voiceIds and langCodes.
 */
const NeuphonicVoices = {
  Albert: { id: 'f8698a9e-947a-43cd-a897-57edd4070a78', langCode: 'en' },
  Annie: { id: 'e564ba7e-aa8d-46a2-96a8-8dffedade48f', langCode: 'en' },
  Emily: { id: 'fc854436-2dac-4d21-aa69-ae17b54e98eb', langCode: 'en' },
  Holly: { id: '8e9c4bc8-3979-48ab-8626-df53befc2090', langCode: 'en' },
  James: { id: '6ffede2d-d96e-4a9b-9d4d-e654b8ef4cf2', langCode: 'en' },
  Jo: { id: '06fde793-8929-45f6-8a87-643196d376e4', langCode: 'en' },
  Liz: { id: '79ffd956-872a-4b89-b25b-d99bb4335b82', langCode: 'en' },
  Marcus: { id: 'ebf2c88e-e69d-4eeb-9b9b-9f3a648787a5', langCode: 'en' },
  Miles: { id: 'b19687fd-c5c9-4bda-9d52-756c3b10c88e', langCode: 'en' },
  Richard: { id: '6c8ad62b-1356-42df-ac82-706590b7ff43', langCode: 'en' },
  Wyatt: { id: 'f2185de7-e09b-46d7-9b20-8c82ef90524f', langCode: 'en' },
  Antoine: { id: '850e9835-4bf2-46f8-9d93-ceaca48140f8', langCode: 'fr' },
  Camille: { id: '0049e0f3-5506-4f29-9c44-344ed5a9c7c2', langCode: 'fr' },
  Jeanne: { id: '5b1d4479-5b95-4a50-8029-a4bc023e1dfe', langCode: 'fr' },
  Alejandro: { id: '3c8d7261-b917-4085-90ad-e7de015b3030', langCode: 'es' },
  Alois: { id: '9b5af8fb-3720-425c-8bca-ce01a2b02b29', langCode: 'es' },
  Carmen: { id: 'ea66187e-eef6-4c83-a777-52d15cfdc8e2', langCode: 'es' },
  Federico: { id: 'df5570bf-91a9-44ee-93f2-ea51bac84ece', langCode: 'es' },
  Lucia: { id: '691278e4-ab16-4cda-991f-129f7d1ab197', langCode: 'es' },
  Martina: { id: '0fc67dbd-e31f-4172-82a7-ad9cac74dade', langCode: 'es' },
  Eva: { id: '68ef7d4b-c3db-494c-aee9-78dd19aed951', langCode: 'nl' },
  Pieter: { id: '58d9c120-4ef3-49d8-955e-d8e3b8d5147e', langCode: 'nl' },
  Sanne: { id: '18d1a0b5-32e1-46a4-8c2b-d0ca8a640f7a', langCode: 'nl' },
  Klaus: { id: '052c4c9e-c8c3-42f8-966e-e041979fd056', langCode: 'de' },
  Marie: { id: '83c83b46-cf26-4ab5-8165-b6dc37555506', langCode: 'de' },
  Mia: { id: '498ba461-e87b-4c07-b4d2-fc7797be2d26', langCode: 'de' },
  Ashok: { id: '498ba461-e87b-4c07-b4d2-fc7797be2d26', langCode: 'hi' },
  Deepika: { id: 'a2103bbb-ab1f-4b1a-b4b7-f2466ce14f11', langCode: 'hi' },
  Rohan: { id: '1a4d4ab5-2289-40f6-9c3b-95b1ddc1a930', langCode: 'hi' },
  Vihaan: { id: '2948b198-a403-4a9b-bd57-0e96396e179e', langCode: 'hi' },
} as const;

export class Neuphonic {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEUPHONIC_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('NEUPHONIC_API_KEY is not set.');
    }
  }

  private createProvider() {
    return createClient({ apiKey: this.apiKey });
  }

  /**
   * Creates a text-to-speech synthesis function using Neuphonic.
   * @param {keyof typeof NeuphonicVoices | (string & {})} voice - The voice name to use, or voice ID
   * if using a cloned voice. Defaults to `Emily`.
   * @param {Omit<TtsConfig, 'voice_id'>} options - Additional options for TTS synthesis.
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    voice: keyof typeof NeuphonicVoices | (string & {}) = 'Emily',
    options?: Omit<TtsConfig, 'voice_id'>
  ) {
    return async (prompt: string) => {
      const provider = this.createProvider();

      let voiceId = voice;
      let langCode = 'en';

      if (voice in NeuphonicVoices) {
        const selectedVoice =
          NeuphonicVoices[voice as keyof typeof NeuphonicVoices];
        voiceId = selectedVoice.id;
        langCode = selectedVoice.langCode;
      }

      const response = await (
        await provider.tts.sse({
          lang_code: langCode,
          voice_id: voiceId,
          ...options,
        })
      ).send(prompt);

      const file = new File(
        [toWav(response.audio, options?.sampling_rate)],
        'speech.wav',
        {
          type: 'audio/wav',
        }
      );

      return file;
    };
  }
}
