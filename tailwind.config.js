/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Midnight Sapphire, Crisp Porcelain, and Medical Royal Blue (NO BROWN)
        cypress: {
          800: '#182A4D', // midnight sapphire accent
          900: '#0E1A33', // dark sovereign navy
          950: '#070F1E', // deep imperial midnight navy
        },
        alabaster: {
          50: '#F8FAFD', // crisp porcelain white
          100: '#EEF2F7', // soft pearl platinum
          200: '#DEE4ED', // refined architectural silver-blue border
        },
        bronze: {
          300: '#93C5FD', // pale ice blue
          400: '#60A5FA', // luminous sky blue
          600: '#2563EB', // vibrant royal medical blue
        },
        slate: {
          600: '#4B5565', // refined clinical charcoal slate
        },
        navy: {
          800: '#182A4D',
          900: '#0E1A33',
          950: '#070F1E',
        },
        royal: {
          300: '#93C5FD',
          400: '#60A5FA',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        porcelain: {
          50: '#F8FAFD',
          100: '#EEF2F7',
          200: '#DEE4ED',
        },
      },
      fontFamily: {
        display: ['Zodiak', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
        eyebrow: '0.14em',
      },
      lineHeight: {
        tightDisplay: '1.08',
      },
      transitionTimingFunction: {
        emil: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(7, 15, 30, 0.04), 0 1px 2px -1px rgba(7, 15, 30, 0.04)',
        'card': '0 4px 20px -2px rgba(7, 15, 30, 0.06), 0 2px 6px -1px rgba(7, 15, 30, 0.03)',
        'card-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.38)',
        'elevated': '0 20px 40px -15px rgba(7, 15, 30, 0.12)',
      },
      animation: {
        'ticker': 'ticker 35s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
