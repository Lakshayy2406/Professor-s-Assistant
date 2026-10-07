import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mermaid: ['mermaid'],
          pdfjs: ['pdfjs-dist'],
          icons: ['lucide-react']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['pdfjs-dist', 'mermaid', 'marked']
  }
});
