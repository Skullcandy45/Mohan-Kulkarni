import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Typewriter reveal while section is in view; resets when scrolled away
 * so typing runs again on scroll up or down.
 */
export default function ScrollTypewriterText({
  text,
  className = '',
  charMs = 22,
  highlightPattern = /(modern technology|gentle care)/gi,
  highlightClassName = 'text-muted font-semibold',
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, margin: '-8% 0px' });
  const [visibleCount, setVisibleCount] = useState(0);
  const runId = useRef(0);

  useEffect(() => {
    if (reduced) {
      setVisibleCount(text.length);
      return undefined;
    }
    if (!inView) {
      setVisibleCount(0);
      return undefined;
    }

    const id = ++runId.current;
    setVisibleCount(0);
    let i = 0;
    const tick = () => {
      if (runId.current !== id) return;
      i += 1;
      setVisibleCount(i);
      if (i < text.length) {
        window.setTimeout(tick, charMs);
      }
    };
    const start = window.setTimeout(tick, charMs);
    return () => {
      runId.current += 1;
      window.clearTimeout(start);
    };
  }, [inView, text, charMs, reduced]);

  const visible = reduced ? text : text.slice(0, visibleCount);

  const isHighlight = (part) => /^(modern technology|gentle care)$/i.test(part);

  const renderWithHighlights = (slice) => {
    if (!highlightPattern) return slice;
    const parts = slice.split(highlightPattern);
    return parts.map((part, idx) =>
      isHighlight(part) ? (
        <span key={idx} className={highlightClassName}>
          {part}
        </span>
      ) : (
        <span key={idx}>{part}</span>
      ),
    );
  };

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {renderWithHighlights(visible)}
      {!reduced && inView && visibleCount < text.length && (
        <span className="inline-block w-[2px] h-[0.9em] bg-primary/70 ml-0.5 align-middle animate-pulse" aria-hidden />
      )}
    </h2>
  );
}
