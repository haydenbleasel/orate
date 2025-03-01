import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  redirects: [
    {
      source: '/docs/features',
      destination: '/docs/features/tts',
      permanent: false,
    },
    {
      source: '/docs/providers',
      destination: '/docs/providers/openai',
      permanent: false,
    },
  ],
};

export default withMDX(config);
