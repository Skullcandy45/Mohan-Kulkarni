import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Smooth type-in for bold display text; resets when scrolled out of view.
 */
export default function TypeInBold({
  text,
  className = '',
  charMs = 28,
  as: Tag = 'span',
  amount = 0.35,
  once = true,
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount, margin: '-4% 0px' });
  const [count, setCount] = useState(0);
  const run = useRef(0);

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return undefined;
    }
    if (!inView) {
      if (!once) setCount(0);
      return undefined;
    }
    const id = ++run.current;
    setCount(0);
    let i = 0;
    const tick = () => {
      if (run.current !== id) return;
      i += 1;
      setCount(i);
      if (i < text.length) window.setTimeout(tick, charMs);
    };
    const t = window.setTimeout(tick, charMs);
    return () => {
      run.current += 1;
      window.clearTimeout(t);
    };
  }, [inView, text, charMs, reduced, once]);

  const visible = reduced ? text : text.slice(0, count);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {visible}
      {!reduced && inView && count < text.length && (
        <span className="inline-block w-[2px] h-[0.85em] bg-primary/80 ml-0.5 align-middle animate-pulse" aria-hidden />
      )}
    </Tag>
  );
}
