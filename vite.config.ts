
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://luchotxrres.github.io/ro-y-lucho',
  define: {
    'process.env': {}
  }
});
