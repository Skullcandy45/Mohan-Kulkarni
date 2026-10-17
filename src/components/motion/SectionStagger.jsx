import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  useMotionSafe,
  revealItem,
  revealItemLeft,
  revealItemScale,
  revealItemRight,
  revealItemLite,
  revealItemClip,
} from '../../lib/motion';

const itemVariants = {
  fadeUp: revealItem,
  slideLeft: revealItemLeft,
  slideRight: revealItemRight,
  scale: revealItemScale,
  clip: revealItemClip,
  lite: revealItemLite,
};

function useLiteReveal() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)');
    const update = () => setLite(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return lite;
}

/** Stagger children on scroll — parent stays visible, only children animate */
export function SectionStagger({
  children,
  className = '',
  gap = 0.1,
  delay = 0.06,
  as = 'div',
}) {
  const reduced = useMotionSafe();
  const Comp = motion[as] || motion.div;

  if (reduced) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -8% 0px', amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </Comp>
  );
}

export function SectionStaggerItem({
  children,
  className = '',
  variant = 'fadeUp',
  as = 'div',
}) {
  const reduced = useMotionSafe();
  const lite = useLiteReveal();
  const Comp = motion[as] || motion.div;
  const resolved = lite
    ? revealItemLite
    : (itemVariants[variant] || revealItem);

  if (reduced) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp className={className} variants={resolved}>
      {children}
    </Comp>
  );
}
