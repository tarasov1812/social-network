/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './public',
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
      '/posts': 'http://localhost:3000',
      '/posts.json': 'http://localhost:3000',
      '/feed': 'http://localhost:3000',
      '/changePassword': 'http://localhost:3000',
      '/changeProfileDate': 'http://localhost:3000',
      '/user-posts': 'http://localhost:3000',
      '/postUserAndSubs': 'http://localhost:3000',
      '/unsubscribe': 'http://localhost:3000',
      '/subscribe': 'http://localhost:3000',
      '/get-user-with-id': 'http://localhost:3000',
      '/changeEmail': 'http://localhost:3000',
    },
  },
});
