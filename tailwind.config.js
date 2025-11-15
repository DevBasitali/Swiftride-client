/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This ensures that Tailwind will scan all files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C17D3C',
        secondary: '#2C2C2C',
        tertiary: '#0B132A',
      },

      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        lobster: ['Lobster', 'cursive'],

      },
    },
  },
  plugins: [],
}
