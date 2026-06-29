import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Dev-only proxy to the local backend; production uses VITE_API_BASE_URL.
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split big, rarely-changing vendors so browsers cache them across deploys.
        manualChunks: {
          react: ['react', 'react-dom'],
          gsap: ['gsap'],
          lenis: ['@studio-freight/lenis'],
        },
      },
    },
  },
});
