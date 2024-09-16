/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        customColorWithOpacity: 'rgba(52, 202, 165, 0.1)',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        slideInLeft: 'slideInLeft 2s ease-in-out',
        bounce: 'bounce 1s ',
      },
      textColor: {
        'black-70': 'rgba(0, 0, 0, 0.7)',
        'black-25': 'rgba(0, 0, 0, 0.25)',
        'light-green':'',
        'avatar-color':'rgb(5,20,17)',
      },
    },
  },
  plugins: [],
}
