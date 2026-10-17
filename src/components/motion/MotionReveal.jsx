import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe, motionProps, stagger, sectionEntrance } from '../../lib/motion';

/**
 * Scroll reveal wrapper — unique variant per section type.
 * variant: hero | proof | services | why | process | team | testimonials | faq | cta | fadeUp | slideLeft | ...
 */
export default function MotionReveal({
  children,
  variant = 'fadeUp',
  className = '',
  delay = 0,
  as = 'div',
  staggerChildren = false,
  staggerGap = 0.07,
}) {
  const reduced = useMotionSafe();
  const Comp = motion[as] || motion.div;
  const resolved = sectionEntrance[variant] || sectionEntrance.default;

  if (staggerChildren) {
    return (
      <Comp
        className={className}
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger(staggerGap)}
      >
        {children}
      </Comp>
    );
  }

  const props = motionProps(reduced, resolved, { delay });
  return (
    <Comp className={className} {...props}>
      {children}
    </Comp>
  );
}

/** Child item inside a stagger container */
export function MotionRevealItem({ children, className = '', variant = 'fadeUp', delay = 0 }) {
  const reduced = useMotionSafe();
  const resolved = sectionEntrance[variant] || sectionEntrance.fadeUp;
  const props = motionProps(reduced, resolved, { delay });
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}
