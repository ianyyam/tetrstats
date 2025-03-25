import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://ch.tetr.io',
        changeOrigin: true,
        secure: false, // use true if the target server has a valid SSL certificate
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    coverage: {
      exclude: [ 
        'dist/*', 
        'src/main.jsx',
        '*.config.js' 
      ]
    }
  },
});