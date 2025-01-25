import { baseOptions } from '@/app/layout.config';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <HomeLayout className="pt-0" {...baseOptions}>
    {children}
  </HomeLayout>
);

export default Layout;
