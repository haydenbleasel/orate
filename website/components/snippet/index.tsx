import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { codeToHtml } from 'shiki';
import Typescript from './typescript.svg';

type SnippetProps = {
  snippets: {
    provider: string;
    name: string;
    code: string;
  }[];
};

export const Snippet = async ({ snippets }: SnippetProps) => {
  const newSnippets = snippets.map(async ({ code, ...props }) => ({
    ...props,
    code: await codeToHtml(code, {
      lang: 'typescript',
      theme: 'vitesse-black',
      transformers: [
        {
          pre(node) {
            node.properties.style = '';
          },
        },
      ],
    }),
  }));

  const tabs = await Promise.all(newSnippets);

  return (
    <Tabs
      defaultValue={tabs[0].name}
      className="grid divide-y overflow-hidden rounded-lg border"
    >
      <div className="flex items-center gap-2 px-6 py-2">
        <Image
          src={Typescript}
          alt="Typescript"
          width={16}
          height={16}
          className="shrink-0 opacity-20 brightness-0 dark:invert"
        />
        <TabsList className="bg-transparent">
          {tabs.map(({ name }) => (
            <TabsTrigger
              key={name}
              value={name}
              className="data-[state=active]:bg-secondary"
            >
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map(({ name, code }) => (
        <TabsContent key={name} value={name} className="m-0 overflow-hidden">
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: "This is a snippet"
            dangerouslySetInnerHTML={{ __html: code }}
            className="overflow-x-auto p-6"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
