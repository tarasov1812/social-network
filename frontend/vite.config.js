/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: 'http://twittertestf.s3-website.eu-north-1.amazonaws.com',
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
        ws: true,
      },
      '/loginpage': {
        target: 'http://16.171.44.142:8088',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
