import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
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
        collapsible: false,
      }}
    >
      {children}
    </DocsLayout>
  </HomeLayout>
);

export default Layout;
