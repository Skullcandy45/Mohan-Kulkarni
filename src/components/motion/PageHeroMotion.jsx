import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe, ease } from '../../lib/motion';

export const pageHeroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const pageHeroItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: ease.editorial } },
};

/** Staggered entrance for secondary page heroes */
export function PageHero({ children, className = '' }) {
  const reduced = useMotionSafe();
  return (
    <motion.div
      initial={reduced ? false : 'hidden'}
      animate="visible"
      variants={pageHeroStagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageHeroItem({ children, className = '' }) {
  return (
    <motion.div variants={pageHeroItem} className={className}>
      {children}
    </motion.div>
  );
}
