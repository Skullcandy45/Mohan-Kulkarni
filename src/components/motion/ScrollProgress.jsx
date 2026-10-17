import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/** Gradient scroll progress — primary → accent */
export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.35,
    restDelta: 0.0005,
  });

  if (reduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[70] pointer-events-none origin-left"
      style={{ scaleX }}
      aria-hidden
    >
      <div
        className="h-full w-full"
        style={{
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
        }}
      />
    </motion.div>
  );
}
