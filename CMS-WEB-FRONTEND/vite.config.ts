import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  //base: 'https://lezcanodev.github.io/CMS-WEB-FRONT-PROD/',
  base: 'http://localhost:3000/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 5173, // This is the port which we will use in docker
    // add the next lines if you're using windows and hot reload doesn't work
     watch: {
       usePolling: true
     }
  }
})
