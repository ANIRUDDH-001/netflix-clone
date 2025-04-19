/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          black: '#141414',
          red: '#E50914',
          gray: '#808080',
          'gray-light': '#E5E5E5',
          'gray-dark': '#6D6D6D',
        },
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, rgba(20, 20, 20, 0) 0, rgba(20, 20, 20, .15) 15%, rgba(20, 20, 20, .35) 29%, rgba(20, 20, 20, .58) 44%, #141414 68%, #141414 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} 