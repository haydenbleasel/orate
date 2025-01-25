'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { useState } from 'react';
import { CopyButton } from '../copy-button';
import Typescript from './typescript.svg';

type SnippetTabsProps = {
  tabs: {
    name: string;
    code: string;
    html: string;
  }[];
};

export const SnippetTabs = ({ tabs }: SnippetTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const activeTab = tabs.find((tab) => tab.name === selectedTab);

  return (
    <Tabs
      value={selectedTab}
      onValueChange={setSelectedTab}
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
        <TabsList className="flex-1 justify-start bg-transparent">
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
        {activeTab && (
          <CopyButton name={activeTab.name} code={activeTab.code} />
        )}
      </div>
      {tabs.map(({ name, html }) => (
        <TabsContent key={name} value={name} className="m-0 overflow-hidden">
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: "This is a snippet"
            dangerouslySetInnerHTML={{ __html: html }}
            className="overflow-x-auto p-6"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
