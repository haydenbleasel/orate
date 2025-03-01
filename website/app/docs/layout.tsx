import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';
import { Logo } from '../(home)/components/logo';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <DocsLayout
    tree={source.pageTree}
    nav={{
      mode: 'top',
      title: <Logo />,
    }}
    disableThemeSwitch
    links={[
      {
        text: 'Home',
        url: '/',
        active: 'url',
      },
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'NPM',
        url: 'https://www.npmjs.com/package/orate',
        active: 'none',
      },
      {
        text: 'GitHub',
        url: 'https://github.com/haydenbleasel/orate',
        active: 'none',
      },
    ]}
    tabMode="navbar"
    sidebar={{
      collapsible: false,
    }}
  >
    {children}
  </DocsLayout>
);

export default Layout;
