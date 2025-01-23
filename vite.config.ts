import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  resolve: {
    alias: {
      '@src': '/src',
      '@root': '/',
    },
  },
  plugins: [
    react(),
    vue(),
  ],
  ssr: {
    noExternal: ['date-fns'],
  },
  build: {
    rollupOptions: {
      output: {
        format: 'cjs',
      },
    },
  },
});
