import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // En GitHub Pages el sitio vive en /portal-el-doral/; en Netlify o Vercel, en la raíz
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
});
