import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: 'src',
  base: './',
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: '_vite_entry.html',
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/_vite_entry.html'),
      },
    },
  },
});
