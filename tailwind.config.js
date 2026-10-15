/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dent: {
          50: '#F0F9F8',
          100: '#D5F1EE',
          200: '#ACE3DD',
          300: '#75CEC5',
          400: '#3BB0A5',
          500: '#0F766E',
          600: '#0B5E58',
          700: '#0B4E4A',
          800: '#0B3E3B',
          900: '#082E2C',
          950: '#041B1A',
        },
        gold: {
          50: '#FBF8F3',
          100: '#F5EFE3',
          200: '#EBDDC5',
          300: '#DEC39F',
          400: '#CFA775',
          500: '#C59A5A',
          600: '#B08047',
          700: '#8E6238',
          800: '#734E32',
          900: '#5F412C',
        },
        pearl: '#FAFDFD',
        slateBg: '#F4F7F6',
        inkDark: '#0B1716',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Montserrat', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(11, 30, 28, 0.08)',
        'glass-hover': '0 20px 40px 0 rgba(11, 30, 28, 0.14)',
        '3d-gold': '0 10px 30px -5px rgba(197, 154, 90, 0.3)',
        '3d-teal': '0 14px 40px -10px rgba(15, 118, 110, 0.35)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'rotate-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};
