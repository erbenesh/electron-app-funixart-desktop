import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'ui-kit', replacement: path.resolve(__dirname, 'src/ui-kit') },
      { find: /^#\//, replacement: path.resolve(__dirname, 'src/ui') + '/' },
      { find: '#', replacement: path.resolve(__dirname, 'src/ui') },
    ]
  },
  base: './',
  build: {
    outDir: 'dist-react',
  }
})
