/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ato: {
          green: '#00D94A',
          'green-dark': '#00A838',
          black: '#0F0F0F',
          white: '#F8F8F6',
          off: '#F0F0EE',
          yellow: '#FFE500',
          orange: '#FF6B1A',
          blue: '#3B6CF0',
          purple: '#5C3BF0',
          red: '#E03030',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        display: 'clamp(58px, 10vw, 155px)',
      },
      spacing: {
        section: '80px',
      },
      borderWidth: {
        brutal: '2.5px',
      },
      boxShadow: {
        brutal: '5px 5px 0 #0F0F0F',
        'brutal-sm': '3px 3px 0 #0F0F0F',
        'brutal-lg': '8px 8px 0 #0F0F0F',
      },
      animation: {
        'scroll-marquee': 'scroll 20s linear infinite',
        'ring-spin': 'ring-spin 24s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'ring-spin': {
          'to': { transform: 'rotateY(-360deg)' }
        }
      },
    },
  },
}
