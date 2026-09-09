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
  }
});
