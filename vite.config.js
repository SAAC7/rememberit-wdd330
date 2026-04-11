import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/rememberit-wdd330/',
  root: 'src/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        detail: resolve(__dirname, 'src/detail.html'),
        watchlist: resolve(__dirname, 'src/watchlist.html'),
      },
    },
  },
});