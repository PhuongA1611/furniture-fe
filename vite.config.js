import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    server: {
      port: 3000,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@admin': path.resolve(__dirname, './src/admin'),
        '@config': path.resolve(__dirname, './src/config'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@SCSS': path.resolve(__dirname, './src/SCSS'),
        '@app': path.resolve(__dirname, './src/app'),
        '@api': path.resolve(__dirname, './src/api'),
      },
    },
  };
});
