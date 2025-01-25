import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout className="group docs pt-0" {...baseOptions}>
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions}
        nav={{
          enabled: false,
        }}
        disableThemeSwitch
        links={[]}
        sidebar={{
          hideSearch: true,
        }}
      >
        {children}
      </DocsLayout>
    </HomeLayout>
  );
}
