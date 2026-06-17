/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brown-dark':  '#3B2415',
        'brown-mid':   '#6E4B2A',
        'beige-light': '#FFFFFF',
        'beige-warm':  '#9C5B34',
        cream:         '#FFFFFF',
        gold:          '#9C5B34',
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
