/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',          // si tu index.html usa clases Tailwind
    './src/**/*.{js,jsx,ts,tsx,html}', // todos los componentes y JSX/TSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
