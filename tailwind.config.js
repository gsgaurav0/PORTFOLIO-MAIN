/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fdfbf7',
        'pastel-yellow': '#fff4c3', // Soft background
        'deep-green': '#1a4d2e',    // Primary contrast
        'retro-orange': '#ff9f1c',  // Accent 1
        'retro-yellow': '#ffbf69',  // Accent 2
        'retro-teal': '#2ec4b6',    // Accent 3
        'retro-dark': '#1f2937',    // Text/Dark
      },
      fontFamily: {
        display: ['"Press Start 2P"', 'cursive'], // We need to import this
        body: ['"Outfit"', 'sans-serif'],        // And this
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(0,0,0,1)',
        'retro-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'retro-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
