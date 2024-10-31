/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Permite servir archivos desde el nivel de node_modules y slick-carousel
      allow: [
        'node_modules/slick-carousel',
        path.resolve(__dirname, 'node_modules/slick-carousel/slick/fonts'),
      ],
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/test.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
