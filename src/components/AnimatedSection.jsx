import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe, sectionEntrance, motionProps } from '../lib/motion';

/** Legacy wrapper — delegates to centralized motion system */
export default function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }) {
  const reduced = useMotionSafe();
  const variantKey =
    direction === 'left' ? 'slideLeft'
    : direction === 'right' ? 'slideRight'
    : direction === 'scale' ? 'scaleIn'
    : 'fadeUp';
  const variant = sectionEntrance[variantKey];
  const props = motionProps(reduced, variant, { delay });

  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}
