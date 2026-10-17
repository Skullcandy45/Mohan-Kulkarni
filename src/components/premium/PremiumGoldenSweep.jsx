import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/** Subtle left→right golden sweep when the card enters the viewport (repeats on scroll up/down). */
export default function PremiumGoldenSweep({
  children,
  className = '',
  sweepDelay = 0,
  allowShadowBleed = false,
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4, margin: '-8% 0px' });
  const wasInView = useRef(false);
  const [sweepKey, setSweepKey] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;

    if (!inView) {
      wasInView.current = false;
      setSweepKey(0);
      return undefined;
    }

    if (wasInView.current) {
      return undefined;
    }

    wasInView.current = true;
    const start = window.setTimeout(() => setSweepKey((k) => k + 1), sweepDelay);

    return () => window.clearTimeout(start);
  }, [inView, reduced, sweepDelay]);

  const sweep =
    sweepKey > 0 ? <div key={sweepKey} className="premium-doctor-detail-sweep" aria-hidden /> : null;

  if (allowShadowBleed) {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]">{sweep}</div>
        <div className="relative z-[2] h-full">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`premium-doctor-detail-card relative ${className}`}>
      {sweep}
      <div className="relative z-[2] h-full">{children}</div>
    </div>
  );
}
