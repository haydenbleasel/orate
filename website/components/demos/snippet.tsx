'use client';

import { cn } from '@/lib/utils';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { ReactNode } from 'react';

type SnippetProps = {
  data: {
    name: string;
    code: string;
    children?: ReactNode;
  }[];
};

export const Snippet = ({ data }: SnippetProps) => (
  <Tabs items={data.map(({ name }) => name)} className="bg-transparent">
    {data.map(({ name, children, code }) => (
      <Tab
        key={name}
        value={name}
        className={cn(
          'border-t p-0',
          '[&>figure:only-child]:m-0',
          '[&>figure]:rounded-none',
          '[&>figure]:border-none'
        )}
      >
        <DynamicCodeBlock lang="ts" code={code} />
        {children && (
          <div className="border-t bg-secondary p-2">{children}</div>
        )}
      </Tab>
    ))}
  </Tabs>
);
