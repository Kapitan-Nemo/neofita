import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'
// /** @type {import('tailwindcss').Config} */

export default {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        black: {
          DEFAULT: '#121212',
        },
        gray: {
          DEFAULT: '#1e1e1e',
          100: '#454545',
          200: '#ABABAB',
          300: '#242424',
        },
        red: {
          DEFAULT: '#cd1c21',
        },
      },
      screens: {
        '2xl': '1400px',
      },
      fontSize: {
        h1: ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        h2: ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        h3: ['1.5rem', { lineHeight: '2rem' }], // 24px
        h4: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        h5: ['1rem', { lineHeight: '1.5rem' }], // 16px
        h6: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
      },
    },
  },
  plugins: [
    typography(),
  ],
}
