import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export const HOME_SCROLL_MARGIN = '-4% 0px -4% 0px';

const VARIANTS = {
  up: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeSoft: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  },
};

/**
 * Scroll reveal for home sections — animates once by default for smoother scrolling.
 */
export function HomeScrollReveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  duration = 0.55,
  amount = 0.12,
  once = true,
  as = 'div',
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount, margin: HOME_SCROLL_MARGIN });
  const Comp = motion[as] || motion.div;
  const v = VARIANTS[variant] || VARIANTS.up;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Comp
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

export function HomeScrollStagger({
  children,
  className = '',
  stagger = 0.07,
  delayChildren = 0.03,
  amount = 0.12,
  once = true,
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount, margin: HOME_SCROLL_MARGIN });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HomeScrollStaggerItem({ children, className = '' }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Smooth fade for typography blocks in editorial sections */
export function HomeTextFade({ children, className = '', delay = 0 }) {
  return (
    <HomeScrollReveal variant="fadeSoft" duration={0.5} delay={delay} amount={0.15} once className={className}>
      {children}
    </HomeScrollReveal>
  );
}
