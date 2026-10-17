import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe, useCardTilt, cardHover, cardInkHover } from '../../lib/motion';

/**
 * Interactive card shell — elevation, tilt, depth.
 * variant: default | ink | flat
 */
export default function MotionCard({
  children,
  className = '',
  variant = 'default',
  tilt = false,
  hover = true,
  as = 'article',
  ...rest
}) {
  const reduced = useMotionSafe();
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const tiltHook = useCardTilt(4);
  const Comp = motion[as] || motion.article;
  const hoverVariant = variant === 'ink' ? cardInkHover : cardHover;

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setTiltEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const useTilt = tilt && tiltEnabled && !tiltHook.disabled;

  const style = useTilt
    ? { rotateX: tiltHook.rotateX, rotateY: tiltHook.rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }
    : undefined;

  return (
    <Comp
      className={className}
      style={style}
      ref={useTilt ? tiltHook.ref : rest.ref}
      onMouseMove={useTilt ? tiltHook.onMove : rest.onMouseMove}
      onMouseLeave={useTilt ? tiltHook.onLeave : rest.onMouseLeave}
      initial={reduced ? false : 'rest'}
      whileHover={reduced || !hover ? undefined : 'hover'}
      variants={hover ? hoverVariant : undefined}
      {...rest}
    >
      {children}
    </Comp>
  );
}
