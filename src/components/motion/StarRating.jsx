import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useMotionSafe, stagger } from '../../lib/motion';

export default function StarRating({ count = 5, size = 11, delay = 0, className = '' }) {
  const reduced = useMotionSafe();

  return (
    <motion.div
      className={`flex gap-0.5 ${className}`}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true }}
      variants={stagger(0.06, delay)}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0, rotate: -30 },
            visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 400, damping: 18 } },
          }}
        >
          <Star size={size} className="fill-accent text-accent" />
        </motion.span>
      ))}
    </motion.div>
  );
}
