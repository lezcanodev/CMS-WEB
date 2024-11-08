/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        'node_modules/slick-carousel',
        path.resolve(__dirname, 'node_modules/slick-carousel/slick/fonts'),
      ],
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/test.setup.ts'],
    coverage: {
      provider: 'istanbul', // Usa 'istanbul' si c8 da problemas
      reporter: ['text', 'lcov'], // Genera los reportes en formato lcov
      reportsDirectory: './coverage', // Directorio donde se almacenarán los reportes
      all: true, // Incluye todos los archivos, incluso los que no han sido importados en los tests
      exclude: ['tests/**', 'node_modules/**'], // Excluye el directorio de pruebas y node_modules
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
