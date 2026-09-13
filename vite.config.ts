import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['pdfjs-dist', 'pdf-lib', 'jszip', 'file-saver']
  },
  server: {
    host: true,
    port: 3000,
    open: false
  },
  build: {
    chunkSizeWarningLimit: 1200,
    modulePreload: {
      resolveDependencies: (filename, deps) => {
        // Do NOT preload heavy PDF processing engines on initial load
        return deps.filter(dep => !dep.includes('vendor-pdflib') && !dep.includes('vendor-pdfjs'));
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-pdfjs': ['pdfjs-dist'],
          'vendor-pdflib': ['pdf-lib'],
          'vendor-utils': ['jszip', 'file-saver'],
        }
      }
    }
  }
});
