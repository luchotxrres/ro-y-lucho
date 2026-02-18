
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 'base: "./"' asegura que todos los assets se carguen de forma relativa al index.html
  base: './',
  define: {
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    // Generar sourcemaps puede ayudar a debugear si hay errores en producción
    sourcemap: false,
    // Asegurar que los assets se copien correctamente
    assetsDir: 'assets',
  }
});
