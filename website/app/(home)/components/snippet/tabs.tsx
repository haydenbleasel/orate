'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type ReactNode, useState } from 'react';
import { CopyButton } from '../copy-button';

type SnippetTabsProps = {
  tabs: {
    name: string;
    code: string;
    html: string;
    children?: ReactNode;
  }[];
};

export const SnippetTabs = ({ tabs }: SnippetTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const activeTab = tabs.find((tab) => tab.name === selectedTab);

  return (
    <Tabs
      value={selectedTab}
      onValueChange={setSelectedTab}
      className="grid divide-y overflow-hidden rounded-lg border bg-background"
    >
      <div className="grid grid-cols-[1fr_44px] divide-x overflow-hidden">
        <TabsList className="overflow-x-auto! h-auto w-full flex-1 justify-start bg-transparent p-2">
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
          <div className="flex aspect-square w-11 shrink-0 items-center justify-center">
            <CopyButton name={activeTab.name} code={activeTab.code} />
          </div>
        )}
      </div>
      {tabs.map(({ name, html, children }) => (
        <TabsContent key={name} value={name} className="m-0 overflow-hidden">
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: "This is a snippet"
            dangerouslySetInnerHTML={{ __html: html }}
            className="max-h-[300px] overflow-auto p-6 text-sm"
          />
          {children && <div className="border-t p-2">{children}</div>}
        </TabsContent>
      ))}
    </Tabs>
  );
};
