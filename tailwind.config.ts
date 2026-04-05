import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#ff1022',
          dark: '#d00010',
        },
        dark: {
          DEFAULT: '#000000',
          er: '#050505',
        },
        card: {
          DEFAULT: '#000000',
          hover: '#111111',
        },
      },
      fontFamily: {
        Almarai: ['Almarai', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(208,0,0,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(208,0,0,0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
