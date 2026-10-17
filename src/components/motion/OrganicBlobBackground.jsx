import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Subtle professional ambient — teal trust wash (service category) */
export default function OrganicBlobBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 45% at 50% -10%, color-mix(in srgb, var(--color-primary) 7%, transparent), transparent 58%),
            linear-gradient(180deg, var(--color-background) 0%, color-mix(in srgb, var(--color-primary-soft) 25%, var(--color-background)) 100%)
          `,
        }}
      />
      {!reduced && (
        <motion.div
          className="absolute top-[10%] right-[5%] w-[min(420px,42vw)] h-[min(420px,42vw)] rounded-full blur-[100px] opacity-[0.14]"
          style={{ background: 'var(--color-primary)' }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}
