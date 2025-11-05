import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
        '**/dist-react/**',
        '**/dist-electron/**',
      ],
    },
  },
  resolve: {
    alias: {
      'ui-kit': path.resolve(__dirname, 'src/ui-kit'),
      '#': path.resolve(__dirname, 'src/ui'),
    },
  },
});

