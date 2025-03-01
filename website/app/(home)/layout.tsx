import { layout } from '@/lib/layout';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <DocsLayout
    {...layout}
    sidebar={{
      hidden: true,
      collapsible: false,
    }}
    tabMode="sidebar"
  >
    <main className="mx-auto pt-16">{children}</main>
  </DocsLayout>
);

export default Layout;
