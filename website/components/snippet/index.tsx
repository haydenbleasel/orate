import { CopyButton } from '@/components/copy-button';
import Image from 'next/image';
import { codeToHtml } from 'shiki';
import Typescript from './typescript.svg';

type SnippetProps = {
  code: string;
};

export const Snippet = async ({ code }: SnippetProps) => {
  const html = await codeToHtml(code, {
    lang: 'typescript',
    theme: 'vitesse-black',
    transformers: [
      {
        pre(node) {
          node.properties.style = '';
        },
      },
    ],
  });

  return (
    <div className="grid divide-y rounded-lg border">
      <div className="flex items-center gap-2 px-6 py-4">
        <Image
          src={Typescript}
          alt="Typescript"
          width={16}
          height={16}
          className="shrink-0 opacity-20 brightness-0 dark:invert"
        />
        <p className="flex-1 font-mono text-muted-foreground text-sm">
          orate.ts
        </p>
        <CopyButton code={code} />
      </div>
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: "This is a snippet"
        dangerouslySetInnerHTML={{ __html: html }}
        className="overflow-x-auto p-6"
      />
    </div>
  );
};
