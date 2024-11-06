import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  resolve: {
    alias: {
      '@src': '/src',
      '@root': '/',
    },
  },
  plugins: [
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
