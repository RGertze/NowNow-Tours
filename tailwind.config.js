/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: 'hsl(60, 9%, 98%)',
          100: 'hsl(60, 9%, 96%)',
          200: 'hsl(20, 6%, 90%)',
          300: 'hsl(24, 6%, 83%)',
          400: 'hsl(24, 5%, 64%)',
          500: 'hsl(25, 5%, 45%)',
          600: 'hsl(33, 5%, 32%)',
          700: 'hsl(30, 6%, 25%)',
          800: 'hsl(12, 6%, 15%)',
          900: 'hsl(24, 10%, 10%)',
        },
        sky: {
          50: 'hsl(204, 100%, 97%)',
          100: 'hsl(204, 93%, 93%)',
          200: 'hsl(201, 94%, 86%)',
          300: 'hsl(199, 95%, 74%)',
          400: 'hsl(198, 93%, 60%)',
          500: 'hsl(199, 89%, 48%)',
          600: 'hsl(200, 98%, 39%)',
          700: 'hsl(201, 96%, 32%)',
          800: 'hsl(201, 90%, 27%)',
          900: 'hsl(202, 80%, 24%)',
        },
        orange: {
          50: 'hsl(33, 100%, 96%)',
          100: 'hsl(34, 100%, 92%)',
          200: 'hsl(32, 97%, 83%)',
          300: 'hsl(31, 97%, 72%)',
          400: 'hsl(27, 96%, 61%)',
          500: 'hsl(25, 95%, 53%)',
          600: 'hsl(21, 90%, 48%)',
          700: 'hsl(17, 88%, 40%)',
          800: 'hsl(15, 79%, 34%)',
          900: 'hsl(15, 75%, 28%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.03em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.04em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(249, 115, 22, 0.15)',
        'glow-blue': '0 0 20px rgba(3, 105, 161, 0.15)',
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'shine': 'shine 2s ease-in-out infinite',
        'ken-burns': 'ken-burns 12s ease-out infinite',
        'progress': 'progress 0.3s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'shine': {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        'progress': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}