/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f1',
          100: '#e1f3df',
          200: '#c4e7c1',
          300: '#97d492',
          400: '#64ba5e',
          500: '#3e9d38',
          600: '#2e7f29',
          700: '#266523',
          800: '#22511f',
          900: '#1d431c',
          950: '#0c240b',
        },
        earth: {
          50: '#fbf7ee',
          100: '#f5ecd6',
          200: '#ecd9ad',
          300: '#dfbe7c',
          400: '#d4a350',
          500: '#c58731',
          600: '#a96a26',
          700: '#874f22',
          800: '#6e4021',
          900: '#5c351f',
        }
      }
    },
  },
  plugins: [],
}