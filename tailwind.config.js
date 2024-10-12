/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-170%)' },
        },
      },
      animation: {
        'scroll-fast': 'scroll 5s linear infinite',
        'scroll-medium': 'scroll 15s linear infinite',
        'scroll-slow': 'scroll 25s linear infinite',
      },
      fontFamily: {
        'league-spartan': ['"League Spartan"', 'sans-serif'],
        'lora': ['Lora', 'serif'],
        'mada': ['Mada', 'sans-serif'],
      },
      colors: {
        mainBlue: '#2954CD',
        blueText: '#2C3959',
        blueBg : '#F4F7FE',
        greyText: '#9197B3',
      },
      spacing: {
        '14': '3.5rem',
        '18': '4.5rem',  
        'customTop': '14.75rem'  
      }
    },
  },
  plugins: [],
}