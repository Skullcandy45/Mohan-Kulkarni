import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMotionSafe, useMagnetic, useRipple, buttonTap, buttonHover, arrowNudge } from '../../lib/motion';

/**
 * Premium button wrapper — ripple, magnetic pull, press state, animated arrow.
 * Pass `arrow` child icon separately or as last lucide element.
 */
export default function MotionButton({
  children,
  className = 'btn-primary',
  to,
  href,
  onClick,
  magnetic = false,
  type = 'button',
  ...rest
}) {
  const reduced = useMotionSafe();
  const { ripples, trigger } = useRipple();
  const mag = useMagnetic(5);

  const handleClick = (e) => {
    if (!reduced) trigger(e);
    onClick?.(e);
  };

  const inner = (
    <>
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="btn-ripple"
          style={{ left: r.x, top: r.y }}
          aria-hidden
        />
      ))}
    </>
  );

  const motionWrap = {
    whileTap: reduced ? undefined : buttonTap,
    whileHover: reduced ? undefined : buttonHover,
    style: magnetic && !reduced ? { x: mag.x, y: mag.y } : undefined,
    onMouseMove: magnetic ? mag.onMove : undefined,
    onMouseLeave: magnetic ? mag.onLeave : undefined,
    ref: magnetic ? mag.ref : undefined,
  };

  if (to) {
    return (
      <motion.span className="inline-flex relative overflow-hidden rounded-[var(--radius-sm)]" {...motionWrap}>
        <Link to={to} className={`${className} relative z-[1]`} onClick={handleClick} {...rest}>
          {inner}
        </Link>
      </motion.span>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${className} relative overflow-hidden`}
        onClick={handleClick}
        {...motionWrap}
        {...rest}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={`${className} relative overflow-hidden`}
      onClick={handleClick}
      {...motionWrap}
      {...rest}
    >
      {inner}
    </motion.button>
  );
}

/** Animated arrow icon for buttons */
export function MotionArrow({ children, className = '' }) {
  const reduced = useMotionSafe();
  return (
    <motion.span
      className={`inline-flex ${className}`}
      variants={arrowNudge}
      initial="rest"
      whileHover={reduced ? undefined : 'hover'}
    >
      {children}
    </motion.span>
  );
}
