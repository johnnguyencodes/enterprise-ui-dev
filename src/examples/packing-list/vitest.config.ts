import path from 'node:path';
import { defaultExclude, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      $components: path.resolve(__dirname, '../../components'),
      $lib: path.resolve(__dirname, '../../lib'),
    },
  },
  test: {
    globals: true,
    setupFiles: './test/setup.ts',
    exclude: [...defaultExclude, '**/*.svelte**'],
  },
});
