import { codeToHtml } from 'shiki';
import { SnippetTabs } from './tabs';

type SnippetProps = {
  snippets: {
    provider: string;
    name: string;
    code: string;
  }[];
};

export const Snippet = async ({ snippets }: SnippetProps) => {
  const newSnippets = snippets.map(async (props) => ({
    ...props,
    html: await codeToHtml(props.code, {
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

  return <SnippetTabs tabs={tabs} />;
};
