/// <reference types="vitest/config" />

import path from 'path'
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/test.setup.ts'],
  },
  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'),
    }
  }
})