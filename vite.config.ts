import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
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
    pluginRewriteAll(),
  ],
});
