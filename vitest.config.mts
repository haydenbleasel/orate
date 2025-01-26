import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    testTimeout: 20000,
    env: {
      ...loadEnv('test', process.cwd(), ''),
    },
  },
});
