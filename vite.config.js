import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/rememberit-wdd330/',
  root: 'src/',
  build: {
    outDir: '../dist',
    emptyOutDir: true, // 🔥 AGREGA ESTO
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
});