import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function FloatingToothVisual({ className = '' }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none absolute z-[5] ${className}`}
      initial={reduced ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      aria-hidden
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -12, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-28 h-28 sm:w-32 sm:h-32"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-primary/20 backdrop-blur-xl border border-white/30 shadow-glass" />
        <svg viewBox="0 0 120 120" className="absolute inset-2 drop-shadow-lg">
          <defs>
            <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="45%" stopColor="#EBF3FA" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
            <filter id="toothGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            filter="url(#toothGlow)"
            d="M60 18 C48 18 40 28 38 40 C36 52 32 62 32 72 C32 82 36 88 42 90 C44 84 46 78 48 72 C50 78 52 84 54 90 C60 88 64 82 64 72 C64 62 60 52 58 40 C56 28 48 18 60 18 Z"
            fill="url(#toothGrad)"
            stroke="#2B6CB0"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
          <ellipse cx="52" cy="38" rx="6" ry="10" fill="white" opacity="0.45" />
        </svg>
        <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-ink/90 text-cream border border-white/15 shadow-md">
          3D Scan
        </div>
      </motion.div>
    </motion.div>
  );
}
