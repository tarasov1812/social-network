/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './build',
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://16.171.44.142:8088',
        changeOrigin: true,
        secure: false,
      },
      '/loginpage': {
        target: 'http://16.171.44.142:8088',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
