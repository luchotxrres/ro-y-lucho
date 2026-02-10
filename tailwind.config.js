/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Lato', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      colors: {
        wedding: {
          primary: "#6B1F2B",    // Bordó profundo
          secondary: "#8C2F3C",  // Bordó suave
          accent: "#C9A24D",     // Dorado suave
          bg: "#F6F3EE",         // Marfil cálido
          text: "#2E2E2E",       // Gris oscuro cálido
          neutral: "#D8D6D1",    // Gris suave / Líneas
          white: "#FFFFFF"       // Blanco puro
        }
      }
    },
  },
  plugins: [],
}