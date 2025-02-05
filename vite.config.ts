import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@src': '/src',
      '@root': '/',
    },
  },
  plugins: [vue(), react()],
});
