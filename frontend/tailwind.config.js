/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: '#F8D030',
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        poison: '#A040A0',
        flying: '#A890F0',
        bug: '#A8B820',
        normal: '#A8A878',
        ground: '#E0C068',
        fairy: '#EE99AC',
        fighting: '#C03028',
        psychic: '#F85888',
        rock: '#B8A038',
        steel: '#B8B8D0',
        ice: '#98D8D8',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

