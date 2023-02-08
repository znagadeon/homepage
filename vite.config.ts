import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@root': __dirname,
    },
  },

  plugins: [
    vue(),
    react(),
    pluginRewriteAll(),
  ],
});
