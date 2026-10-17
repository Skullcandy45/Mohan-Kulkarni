import { useRef, useState, useCallback, useEffect } from 'react';
import { useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/** Safe reduced-motion check */
export function useMotionSafe() {
  return useReducedMotion();
}

/** Subtle 3D tilt on hover — desktop only */
export function useCardTilt(intensity = 2) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });

  const onMove = useCallback((e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [reduced, x, y]);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, rotateX, rotateY, onMove, onLeave, disabled: reduced };
}

/** Magnetic pull toward cursor — subtle, for CTAs */
export function useMagnetic(strength = 5) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 350, damping: 28 });
  const y = useSpring(0, { stiffness: 350, damping: 28 });

  const onMove = useCallback((e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) / rect.width * strength);
    y.set((e.clientY - cy) / rect.height * strength);
  }, [reduced, x, y, strength]);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x, y, onMove, onLeave, disabled: reduced };
}

/** Ripple click position */
export function useRipple() {
  const [ripples, setRipples] = useState([]);

  const trigger = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, {
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 600);
  }, []);

  return { ripples, trigger };
}

/** Auto-advance carousel with progress */
export function useAutoAdvance(length, intervalMs = 6000, paused = false) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || paused || length <= 1) return undefined;
    const tick = 50;
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + tick / intervalMs;
        if (next >= 1) {
          setIndex((i) => (i + 1) % length);
          return 0;
        }
        return next;
      });
    }, tick);
    return () => clearInterval(timer);
  }, [length, intervalMs, paused, reduced]);

  const goTo = useCallback((i) => {
    setIndex(i);
    setProgress(0);
  }, []);

  return { index, progress, goTo, next: () => goTo((index + 1) % length), prev: () => goTo((index - 1 + length) % length) };
}

/** Cursor-tracking spotlight for cards — sets --spot-x / --spot-y */
export function useSpotlight() {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--spot-x', `${x}%`);
    ref.current.style.setProperty('--spot-y', `${y}%`);
  }, [reduced]);

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--spot-x', '50%');
    ref.current.style.setProperty('--spot-y', '50%');
  }, []);

  return { ref, onMove, onLeave, disabled: reduced };
}
