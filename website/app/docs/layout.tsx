import { layout } from '@/lib/layout';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <DocsLayout {...layout}>{children}</DocsLayout>
);

export default Layout;
