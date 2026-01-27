import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    exclude: ['@imgly/background-removal'],
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Handle potential issues with background removal library
        if (id.includes('@imgly/background-removal')) {
          return false;
        }
      }
    }
  }
});