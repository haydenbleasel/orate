import { codeToHtml } from 'shiki';

const code = `import { speak, transcribe } from 'orate';
import { elevenlabs } from 'orate/elevenlabs';
import { assembly } from 'orate/assembly';

const speech = await speak({
  model: elevenlabs.tts('multilingual_v2', 'aria'),
  prompt: 'Friends, Romans, countrymen, lend me your ears!'
});

const text = await transcribe({
  model: assembly.stt('best'),
  audio,
});`;

export const HeroSnippet = async () => {
  const html = await codeToHtml(code, {
    lang: 'typescript',
    theme: 'vitesse-black',
  });

  return (
    <div
      className="[&_.shiki]:size-full [&_.shiki]:p-8"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
