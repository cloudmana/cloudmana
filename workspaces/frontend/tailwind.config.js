const plugin = require('tailwindcss/plugin')
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1440px',
    },
    extend: {
      spacing: {
        25: '6.25rem',
      },
      padding: {
        sm: '.875rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '3.75rem',
      },
      fontFamily: {
        sans: ['"Roboto"', 'sans-serif'],
      },
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      colors: {
        primary: {
          DEFAULT: '#CE0B39',
          // 50: '#FDD3E2',
          // 100: '#FBBBD2',
          // 200: '#F98AB2',
          // 300: '#F65A92',
          // 400: '#F32A73',
          500: '#E94550',
          600: '#CE0B39',
          // 700: '#7D0732',
          // 800: '#4D041E',
          // 900: '#1C020B',
        },
        yellow: {
          DEFAULT: '#F8B900',
        },
        secondary: {
          DEFAULT: '#1F3658',
        },
      },
      inset: {
        '-100': '-100%',
        '-225-px': '-225px',
        '-160-px': '-160px',
        '-150-px': '-150px',
        '-94-px': '-94px',
        '-50-px': '-50px',
        '-29-px': '-29px',
        '-20-px': '-20px',
        '25-px': '25px',
        '40-px': '40px',
        '95-px': '95px',
        '145-px': '145px',
        '195-px': '195px',
        '210-px': '210px',
        '260-px': '260px',
      },
      height: {
        '95-px': '95px',
        '70-px': '70px',
        '350-px': '350px',
        '500-px': '500px',
        '600-px': '600px',
        '21-px': '21px',
        '22-px': '22px',
      },
      maxHeight: {
        '860-px': '860px',
      },
      maxWidth: {
        '100-px': '100px',
        '120-px': '120px',
        '150-px': '150px',
        '180-px': '180px',
        '200-px': '200px',
        '210-px': '210px',
        '580-px': '580px',
      },
      minWidth: {
        '140-px': '140px',
        48: '12rem',
      },
      backgroundSize: {
        full: '100%',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0px 10px 42px rgba(101, 101, 101, 0.1)',
        md: '0px 10px 42px rgba(101, 101, 101, 0.1)',
        lg: '0px 10px 60px rgba(101, 101, 101, 0.2)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        light: '0px 0px 10px rgba(255, 255, 255, 0.8)',
        lightXl: '0px 0px 25px rgba(255, 255, 255, 0.8)',
        custom: '0px 18px 28px rgba(1, 12, 27, 0.1)',
        none: 'none',
        banner: '6px 8px 7px rgba(164, 66, 31, 0.2)',
        bannerPurple: '0px 0px 10px 2px rgba(151, 71, 255, 0.3)',
        'filter-hover': '5px 5px 5px 0px rgba(0, 0, 0, 0.2)',
      },
      backgroundColor: {
        selected: '#C9D7F3',
        orange: 'rgba(206, 11, 57, 0.3)',
      },
      keyframes: {
        loader: {
          '15%': {
            transform: 'translateX(0)',
          },
          '45%': {
            transform: 'translateX(230px)',
          },
          '65%': {
            transform: 'translateX(230px)',
          },
          '95%': {
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        loader: 'loader 1500ms ease-in-out infinite',
      },
      width: {
        120: '28rem',
      },
    },
    fill: (theme) => ({
      red: theme('colors.red.500'),
      green: '#00CE00',
      blue: theme('colors.blue.500'),
    }),
  },
  variants: [
    'responsive',
    'group-hover',
    'focus-within',
    'first',
    'last',
    'odd',
    'even',
    'hover',
    'focus',
    'active',
    'visited',
    'disabled',
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addComponents, theme }) {
      const screens = theme('screens', {})
      addComponents([
        // {
        //   '.container': { width: '100%' },
        // },
        // {
        //   [`@media (min-width: ${screens.sm})`]: {
        //     '.container': {
        //       'max-width': '540px',
        //     },
        //   },
        // },
        // {
        //   [`@media (min-width: ${screens.md})`]: {
        //     '.container': {
        //       'max-width': '720px',
        //     },
        //   },
        // },
        // {
        //   [`@media (min-width: ${screens.lg})`]: {
        //     '.container': {
        //       'max-width': '960px',
        //     },
        //   },
        // },
        // {
        //   [`@media (min-width: ${screens.xl})`]: {
        //     '.container': {
        //       'max-width': '1140px',
        //     },
        //   },
        // },
        // {
        //   [`@media (min-width: ${screens['2xl']})`]: {
        //     '.container': {
        //       'max-width': '1140px',
        //     },
        //   },
        // },
      ])
    }),
  ],
}
