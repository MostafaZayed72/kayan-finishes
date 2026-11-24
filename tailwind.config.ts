import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'Inter', 'sans-serif'],
        display: ['Alexandria', 'Montserrat Alternates', 'sans-serif'],
        cairo: ['IBM Plex Sans Arabic', 'sans-serif'],
        inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: '#E8631A',
          'orange-light': '#F47B34',
          'orange-dark': '#C94E0E',
          black: '#0A0A0A',
          charcoal: '#141414',
          cream: '#F7F7F7',
          white: '#FFFFFF',
        },
        orange: {
          50: '#fff6ed',
          100: '#ffebd4',
          200: '#ffd3a8',
          300: '#ffb370',
          400: '#ff8838',
          500: '#f97316',
          600: '#E8631A',
          700: '#c94e0e',
          800: '#9f3d12',
          900: '#803413',
          950: '#451807',
        },
        slate: {
          950: '#0A0A0A',
        }
      }
    },
  },
}
