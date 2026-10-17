import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe, animateProps, scaleIn } from '../../lib/motion';

/**
 * Animated stat reveal — parses leading number when possible, always animates entrance.
 */
export default function CountUp({ value, label, delay = 0, className = '' }) {
  const reduced = useMotionSafe();
  const match = String(value).match(/^([<~]?\s*[\d,.]+)/);
  const prefix = match ? String(value).slice(0, match[0].length) : '';
  const suffix = match ? String(value).slice(match[0].length) : value;
  const num = match ? parseFloat(match[1].replace(/[,<~]/g, '')) : null;

  const props = animateProps(reduced, scaleIn, { delay, duration: 0.5 });

  return (
    <motion.div className={className} {...props}>
      <div className="font-display text-xl sm:text-2xl text-ink tabular-nums">
        {num != null && !reduced ? (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {prefix}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.25, duration: 0.4 }}
            >
              {suffix || ''}
            </motion.span>
          </motion.span>
        ) : (
          value
        )}
      </div>
      {label && <div className="label-meta mt-0.5">{label}</div>}
    </motion.div>
  );
}
