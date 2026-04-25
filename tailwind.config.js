/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brown-dark':  '#2C1A0E',
        'brown-mid':   '#4A2C1A',
        'beige-light': '#F5EFE6',
        'beige-warm':  '#E8D9C5',
        cream:         '#FDFAF6',
        gold:          '#B8975A',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        inter:     ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
        widest4: '0.45em',
      },
    },
  },
  plugins: [],
}
