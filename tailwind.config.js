/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--color-background)',
          surface: 'var(--color-surface)',
          subtle: 'var(--color-subtle)',
          ink: 'var(--color-ink)',
        },
        primary: {
          DEFAULT: 'rgb(from var(--color-primary) r g b / <alpha-value>)',
          dim: 'var(--color-primary-dim)',
          soft: 'var(--color-primary-soft)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          soft: 'var(--color-accent-soft)',
        },
        highlight: {
          DEFAULT: 'var(--color-highlight)',
          soft: 'var(--color-highlight-soft)',
        },
        warm: {
          DEFAULT: 'var(--color-warm)',
          soft: 'var(--color-warm-soft)',
          wash: 'var(--color-warm-wash)',
        },
        ink: 'rgb(from var(--color-ink) r g b / <alpha-value>)',
        graphite: 'rgb(from var(--color-ink) r g b / <alpha-value>)',
        mist: 'var(--color-subtle)',
        line: 'var(--color-border)',
        muted: 'var(--color-text-light)',
        'muted-2': 'var(--color-muted-2)',
        cream: 'rgb(from var(--color-cream) r g b / <alpha-value>)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        'background-light': 'var(--color-subtle)',
        text: 'var(--color-text)',
        'text-light': 'var(--color-text-light)',
        border: 'var(--color-border)',
        success: '#16A34A',
        error: '#DC2626',
        whatsapp: '#25D366',
        'whatsapp-dark': '#128C7E',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        mega: '-0.04em',
      },
      boxShadow: {
        elegant:
          '0 8px 24px -8px color-mix(in srgb, var(--color-ink) 8%, transparent), 0 2px 6px -2px color-mix(in srgb, var(--color-ink) 5%, transparent)',
        hover:
          '0 24px 60px -20px color-mix(in srgb, var(--color-ink) 18%, transparent), 0 8px 20px -8px color-mix(in srgb, var(--color-ink) 10%, transparent)',
        sticker: '0 18px 40px -16px color-mix(in srgb, var(--color-ink) 25%, transparent)',
        emerald: '0 14px 36px -14px color-mix(in srgb, var(--color-primary) 45%, transparent)',
        glass: '0 8px 32px -8px color-mix(in srgb, var(--color-ink) 12%, transparent)',
        glow: '0 0 60px -12px color-mix(in srgb, var(--color-primary) 35%, transparent)',
        wa: '0 14px 36px -14px rgba(37, 211, 102, 0.55)',
        ring: 'inset 0 0 0 1px color-mix(in srgb, var(--color-ink) 6%, transparent)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
        sheen: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { opacity: '0.4' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.4' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        sheen: 'sheen 2.2s linear infinite',
        'float-y': 'float-y 5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
};
