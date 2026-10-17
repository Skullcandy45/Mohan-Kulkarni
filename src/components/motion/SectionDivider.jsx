import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe, connectorGrow, ease, duration } from '../../lib/motion';

/**
 * Section transition divider — shape / gradient bridge between surfaces.
 * type: line | wedge | fade | glow
 */
export default function SectionDivider({ type = 'line', from = 'surface', to = 'surface-alt' }) {
  const reduced = useMotionSafe();

  if (type === 'wedge') {
    return (
      <div className="relative h-6 sm:h-8 -mt-px pointer-events-none overflow-hidden" aria-hidden>
        <motion.svg
          viewBox="0 0 1200 32"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow }}
        >
          <path
            d="M0,32 L600,0 L1200,32 Z"
            className={to === 'ink' ? 'fill-ink' : to === 'accent' ? 'fill-[var(--color-accent-wash)]' : 'fill-[var(--color-surface-alt)]'}
          />
        </motion.svg>
      </div>
    );
  }

  if (type === 'glow') {
    return (
      <div className="relative h-2 pointer-events-none overflow-hidden" aria-hidden>
        <motion.div
          className="absolute inset-x-[5%] top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={reduced ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: ease.editorial }}
        />
        {!reduced && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-3 w-24 bg-accent/20 blur-md rounded-full"
            initial={{ left: '10%', opacity: 0 }}
            whileInView={{ left: ['10%', '70%', '10%'], opacity: [0, 0.8, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.3 }}
          />
        )}
      </div>
    );
  }

  return (
    <motion.div
      className="section-divider"
      data-from={from}
      data-to={to}
      aria-hidden
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true }}
      variants={connectorGrow}
      transition={{ duration: duration.slow, ease: ease.editorial }}
      style={{ transformOrigin: 'left' }}
    />
  );
}
