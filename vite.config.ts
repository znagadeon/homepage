import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@src': '/src',
      '@root': '/',
    },
  },
  plugins: [
    react(),
    {
      name: 'md-hmr',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.md')) {
          server.ws.send({ type: 'full-reload' });
        }
      },
    },
  ],
});
