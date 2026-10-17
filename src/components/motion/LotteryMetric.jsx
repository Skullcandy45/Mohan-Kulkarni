import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

function parseMetric(value) {
  const s = String(value);
  const m = s.match(/^([^0-9]*)([\d,.]+)(.*)$/);
  if (!m) return { prefix: '', num: null, suffix: s, decimals: 0 };
  const numStr = m[2].replace(/,/g, '');
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return {
    prefix: m[1],
    num: parseFloat(numStr),
    suffix: m[3],
    decimals,
  };
}

function formatNum(n, decimals) {
  if (decimals > 0) return n.toFixed(decimals);
  return Math.round(n).toLocaleString('en-IN');
}

const LOTTERY_PHASE = 0.62;

export default function LotteryMetric({
  value,
  label,
  className = '',
  valueClassName = 'font-display font-bold text-4xl lg:text-5xl text-primary tabular-nums leading-none',
  labelClassName = 'mt-2 text-xs text-muted leading-snug',
  duration = 2.1,
  delay = 0,
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3, margin: '-6% 0px' });
  const wasInView = useRef(false);
  const { prefix, num, suffix, decimals } = parseMetric(value);
  const [display, setDisplay] = useState(num == null ? value : `${prefix}${formatNum(0, decimals)}${suffix}`);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (num == null) {
      setDisplay(value);
      return undefined;
    }
    if (reduced) {
      setDisplay(inView ? `${prefix}${formatNum(num, decimals)}${suffix}` : `${prefix}${formatNum(0, decimals)}${suffix}`);
      return undefined;
    }

    if (!inView) {
      wasInView.current = false;
      setSpinning(false);
      setDisplay(`${prefix}${formatNum(0, decimals)}${suffix}`);
      return undefined;
    }

    if (wasInView.current) {
      return undefined;
    }
    wasInView.current = true;

    setSpinning(true);
    const durationMs = duration * 1000;
    const startAt = performance.now() + delay * 1000;
    let raf;

    const tick = (now) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const t = Math.min(1, (now - startAt) / durationMs);
      let shown;

      if (t < LOTTERY_PHASE) {
        const progress = t / LOTTERY_PHASE;
        const min = 0;
        const max = num * (0.25 + progress * 1.15);
        shown = min + Math.random() * Math.max(max, num * 0.2);
      } else {
        const settle = (t - LOTTERY_PHASE) / (1 - LOTTERY_PHASE);
        const ease = 1 - (1 - settle) ** 4;
        shown = num * ease;
        if (settle < 0.55 && Math.random() > 0.65) {
          shown += (Math.random() - 0.5) * num * 0.12 * (1 - settle);
        }
        if (settle >= 1) shown = num;
      }

      setDisplay(`${prefix}${formatNum(Math.max(0, shown), decimals)}${suffix}`);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(`${prefix}${formatNum(num, decimals)}${suffix}`);
        setSpinning(false);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, num, prefix, suffix, decimals, duration, delay, reduced]);

  return (
    <div ref={ref} className={className}>
      <motion.p
        className={`${valueClassName} ${spinning ? 'lottery-metric-spin' : ''}`}
        animate={spinning ? { opacity: [1, 0.92, 1] } : { opacity: 1 }}
        transition={{ duration: 0.08, repeat: spinning ? Infinity : 0 }}
      >
        {display}
      </motion.p>
      {label ? <p className={labelClassName}>{label}</p> : null}
    </div>
  );
}
