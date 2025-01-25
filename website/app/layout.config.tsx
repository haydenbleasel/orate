import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from './(home)/components/logo';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    // can be JSX too!
    title: <Logo />,
  },
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
  ],
};
