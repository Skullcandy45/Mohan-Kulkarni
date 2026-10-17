/** Centralized Framer Motion variants — one source of truth */

export const ease = {
  editorial: [0.22, 1, 0.36, 1],
  smooth: [0.16, 1, 0.3, 1],
  out: [0.33, 1, 0.68, 1],
  spring: { type: 'spring', stiffness: 420, damping: 32 },
  springSoft: { type: 'spring', stiffness: 280, damping: 28 },
};

export const viewport = {
  default: { once: true, margin: '-60px' },
  early: { once: true, margin: '-80px' },
  tight: { once: true, margin: '-30px' },
};

export const duration = {
  fast: 0.28,
  base: 0.45,
  slow: 0.65,
  hero: 0.85,
};

/* ── Reveal primitives ── */
export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.editorial } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -18 },
  visible: { opacity: 1, y: 0 },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

export const slideRight = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

export const clipUp = {
  hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
};

export const blurIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.smooth } },
};

/* ── Stagger item reveals (children only — safe for sections) ── */
export const revealItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.smooth },
  },
};

export const revealItemLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
};

export const revealItemRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
};

export const revealItemScale = {
  hidden: { opacity: 0, scale: 0.9, y: 16, rotate: -1 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: { type: 'spring', stiffness: 320, damping: 24 },
  },
};

/** Lite reveal — no blur (mobile / performance) */
export const revealItemLite = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.smooth },
  },
};

export const revealItemClip = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.55, ease: ease.editorial },
  },
};

/** Per-section motion presets — unique behavior, not generic fade-up */
export const sectionMotion = {
  proof: 'slideRight',
  services: 'scale',
  why: 'slideLeft',
  process: 'clip',
  team: 'scale',
  testimonials: 'clip',
  faq: 'slideLeft',
  cta: 'scale',
};

/* ── Stagger containers ── */
export const stagger = (gap = 0.09, delayChildren = 0.06) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: gap, delayChildren },
  },
});

export const staggerFast = stagger(0.05, 0.02);

/* ── Section-specific entrances (unique per section) ── */
export const sectionEntrance = {
  hero: fadeDown,
  proof: slideRight,
  services: fadeUp,
  why: blurIn,
  process: slideLeft,
  team: scaleIn,
  testimonials: clipUp,
  faq: fadeUp,
  cta: scaleIn,
  fadeUp,
  fadeDown,
  slideLeft,
  slideRight,
  scaleIn,
  clipUp,
  blurIn,
  default: fadeUp,
};

/* ── Card interactions ── */
export const cardHover = {
  rest: { y: 0, scale: 1, rotateX: 0, rotateY: 0 },
  hover: {
    y: -6,
    scale: 1.015,
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  },
};

export const cardInkHover = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: { duration: 0.35, ease: ease.editorial },
  },
};

export const logoHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.03,
    transition: { duration: 0.3, ease: ease.smooth },
  },
};

export const rowHover = {
  rest: { x: 0, backgroundColor: 'rgba(0,0,0,0)' },
  hover: {
    x: 4,
    backgroundColor: 'rgba(243, 240, 235, 0.6)',
    transition: { duration: 0.25, ease: ease.smooth },
  },
};

export const iconPop = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.12, rotate: -6, transition: { duration: 0.25, ease: ease.smooth } },
};

/* ── Button micro-interactions ── */
export const buttonTap = { scale: 0.98 };
export const buttonHover = { scale: 1.03, transition: { type: 'spring', stiffness: 500, damping: 24 } };
export const arrowNudge = {
  rest: { x: 0 },
  hover: { x: 5, transition: { type: 'spring', stiffness: 500, damping: 28 } },
};

export const heroLine = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: ease.editorial },
  }),
};

export const pageEnter = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.smooth },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: ease.out },
  },
};

/* ── Timeline / process ── */
export const timelineStep = {
  inactive: { opacity: 0.82 },
  active: { opacity: 1 },
};

export const connectorGrow = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

/* ── Testimonial carousel ── */
export const testimonialSlide = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }),
};

export const faqContent = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: ease.smooth } },
};

export const faqItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: ease.smooth } },
};

export const springPop = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  },
};

/**
 * Build motion props with reduced-motion guard
 */
export function motionProps(reduced, variant, opts = {}) {
  if (reduced) return { initial: false, animate: undefined, whileInView: undefined };
  const {
    delay = 0,
    duration: dur = duration.base,
    viewport: vp = viewport.default,
    once = true,
  } = opts;
  return {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { ...vp, once },
    variants: variant,
    transition: { duration: dur, delay, ease: ease.editorial },
  };
}

export function animateProps(reduced, variant, opts = {}) {
  if (reduced) return { initial: false, animate: 'visible' };
  const { delay = 0, duration: dur = duration.base } = opts;
  return {
    initial: 'hidden',
    animate: 'visible',
    variants: variant,
    transition: { duration: dur, delay, ease: ease.editorial },
  };
}
