import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  redirects: () => [
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
    {
      source: '/docs/tts',
      destination: '/docs/features/tts',
      permanent: false,
    },
    {
      source: '/docs/stt',
      destination: '/docs/features/stt',
      permanent: false,
    },
    {
      source: '/docs/isl',
      destination: '/docs/features/isl',
      permanent: false,
    },
    {
      source: '/docs/sts',
      destination: '/docs/features/sts',
      permanent: false,
    },
    {
      source: '/docs/assembly',
      destination: '/docs/providers/assembly',
      permanent: true,
    },
    {
      source: '/docs/azure-openai',
      destination: '/docs/providers/azure-openai',
      permanent: true,
    },
    {
      source: '/docs/azure',
      destination: '/docs/providers/azure',
      permanent: true,
    },
    {
      source: '/docs/deepgram',
      destination: '/docs/providers/deepgram',
      permanent: true,
    },
    {
      source: '/docs/elevenlabs',
      destination: '/docs/providers/elevenlabs',
      permanent: true,
    },
    {
      source: '/docs/fal',
      destination: '/docs/providers/fal',
      permanent: true,
    },
    {
      source: '/docs/gladia',
      destination: '/docs/providers/gladia',
      permanent: true,
    },
    {
      source: '/docs/google',
      destination: '/docs/providers/google',
      permanent: true,
    },
    {
      source: '/docs/groq',
      destination: '/docs/providers/groq',
      permanent: true,
    },
    {
      source: '/docs/hume',
      destination: '/docs/providers/hume',
      permanent: true,
    },
    {
      source: '/docs/ibm',
      destination: '/docs/providers/ibm',
      permanent: true,
    },
    {
      source: '/docs/meta.',
      destination: '/docs/providers/meta.',
      permanent: true,
    },
    {
      source: '/docs/murf',
      destination: '/docs/providers/murf',
      permanent: true,
    },
    {
      source: '/docs/native',
      destination: '/docs/providers/native',
      permanent: true,
    },
    {
      source: '/docs/openai',
      destination: '/docs/providers/openai',
      permanent: true,
    },
    {
      source: '/docs/play',
      destination: '/docs/providers/play',
      permanent: true,
    },
    {
      source: '/docs/replicate',
      destination: '/docs/providers/replicate',
      permanent: true,
    },
    {
      source: '/docs/rev',
      destination: '/docs/providers/rev',
      permanent: true,
    },
    {
      source: '/docs/speechify',
      destination: '/docs/providers/speechify',
      permanent: true,
    },
  ],
};

export default withMDX(config);
