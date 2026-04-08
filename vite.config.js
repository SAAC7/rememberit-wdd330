import { resolve } from 'path';
import { defineConfig } from 'vite';
export default defineConfig({
  base: '/rememberit-wdd330/', // 🔥 IMPORTANTE
  root: 'src/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
});