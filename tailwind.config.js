/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // African-inspired color palette
        safari: {
          50: '#fdf8f0',
          100: '#faebd7',
          200: '#f4d4a7',
          300: '#edb76f',
          400: '#e69c3a',
          500: '#d4841c',
          600: '#b86914',
          700: '#9a5012',
          800: '#7c4015',
          900: '#653515',
        },
        sunset: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        earth: {
          50: '#f8f6f0',
          100: '#ede8d8',
          200: '#ddd2b3',
          300: '#c8b686',
          400: '#b59a5e',
          500: '#a68547',
          600: '#8f6d3c',
          700: '#765633',
          800: '#62472f',
          900: '#533d2c',
        },
        baobab: {
          50: '#f6f6f4',
          100: '#e7e7e2',
          200: '#d1d1c7',
          300: '#b4b4a4',
          400: '#98987f',
          500: '#7f7f65',
          600: '#65654f',
          700: '#525242',
          800: '#454538',
          900: '#3c3c31',
        }
      },
      fontFamily: {
        display: ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        trip: ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.25rem' }],
        sm: ['0.875rem', { lineHeight: '1.4rem' }],
        base: ['1rem', { lineHeight: '1.6rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.85rem' }],
        '2xl': ['1.5rem', { lineHeight: '2.1rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.3rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.05' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
      },
      letterSpacing: {
        tight: '-0.01em',
        normal: '0',
        wide: '0.02em',
      },
      lineHeight: {
        snug: '1.3',
        relaxed: '1.6',
        loose: '1.85',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      typography: (theme) => ({
        baobab: {
          css: {
            '--tw-prose-body': theme('colors.baobab.800'),
            '--tw-prose-headings': theme('colors.baobab.900'),
            '--tw-prose-links': theme('colors.sunset.600'),
            '--tw-prose-links-hover': theme('colors.safari.600'),
            '--tw-prose-bold': theme('colors.baobab.900'),
            '--tw-prose-counters': theme('colors.baobab.700'),
            '--tw-prose-bullets': theme('colors.safari.500'),
            '--tw-prose-hr': theme('colors.baobab.300'),
            '--tw-prose-quotes': theme('colors.baobab.900'),
            '--tw-prose-code': theme('colors.sunset.600'),
            '--tw-prose-pre-bg': theme('colors.baobab.900'),
            '--tw-prose-pre-code': theme('colors.safari.100'),
            '--tw-prose-th-borders': theme('colors.baobab.300'),
            '--tw-prose-td-borders': theme('colors.baobab.200'),
          }
        },
        dark: {
          css: {
            '--tw-prose-body': theme('colors.baobab.100'),
            '--tw-prose-headings': theme('colors.safari.50'),
            '--tw-prose-links': theme('colors.sunset.400'),
            '--tw-prose-links-hover': theme('colors.safari.200'),
            '--tw-prose-bold': theme('colors.safari.50'),
            '--tw-prose-counters': theme('colors.baobab.300'),
            '--tw-prose-bullets': theme('colors.safari.400'),
            '--tw-prose-hr': theme('colors.baobab.600'),
            '--tw-prose-quotes': theme('colors.safari.100'),
            '--tw-prose-code': theme('colors.sunset.300'),
            '--tw-prose-pre-bg': theme('colors.baobab.800'),
            '--tw-prose-pre-code': theme('colors.safari.100'),
            '--tw-prose-th-borders': theme('colors.baobab.600'),
            '--tw-prose-td-borders': theme('colors.baobab.700'),
          }
        }
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}