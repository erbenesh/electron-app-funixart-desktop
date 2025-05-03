import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const PORT = 8081;

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-react',
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.resolve(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), 'src/$1'),
      },
    ],
  },
  // server: { port: PORT, host: true },
  // preview: { port: PORT, host: true },
})

