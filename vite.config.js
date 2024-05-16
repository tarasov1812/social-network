/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        login: resolve(__dirname, './login/index.html'),
      },
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
      }
    },
    host: true,
    port: 3000,
  },
});
