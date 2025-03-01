import { Logo } from '@/app/(home)/components/logo';
import { source } from '@/lib/source';
import type { DocsLayoutProps } from 'fumadocs-ui/layouts/notebook';

export const layout: DocsLayoutProps = {
  tree: source.pageTree,
  nav: {
    mode: 'top',
    title: <Logo />,
  },
  disableThemeSwitch: true,
  links: [
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
  ],
  tabMode: 'navbar',
  sidebar: {
    collapsible: false,
  },
};
