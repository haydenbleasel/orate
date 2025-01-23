import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  sourcemap: false,
  minify: true,
  dts: true,
  format: ['cjs', 'esm'],
});
