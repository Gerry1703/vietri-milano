/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brown-dark':  '#3E2A1E',
        'brown-mid':   '#7E5B4E',
        'beige-light': '#F2E2C4',
        'beige-warm':  '#D6C3A4',
        cream:         '#F2E2C4',
        gold:          '#B59C78',
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
