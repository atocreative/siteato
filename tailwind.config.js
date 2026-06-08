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
          green: '#39FF14',
          'green-dark': '#2BD60E',
          glow: '#0C3A14',
          black: '#0D0D0D',
          white: '#F4EFE4',
          off: '#ECEAE5',
          yellow: '#FFE500',
          orange: '#FF6B1A',
          blue: '#3B6CF0',
          purple: '#5C3BF0',
          red: '#E03030',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Archivo Black', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
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
        brutal: '5px 5px 0 #0D0D0D',
        'brutal-sm': '3px 3px 0 #0D0D0D',
        'brutal-lg': '8px 8px 0 #0D0D0D',
      },
      animation: {
        'scroll-marquee': 'scroll 20s linear infinite',
        'scroll-marquee-fast': 'scroll 22s linear infinite',
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
