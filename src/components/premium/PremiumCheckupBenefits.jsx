import React, { useRef } from 'react';
import { Gauge, Rocket, ShieldCheck, Smile, Sparkles } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../../config/siteConfig';

const ICONS = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  gauge: Gauge,
  rocket: Rocket,
  smile: Smile,
};

const CARD_DARK = '#4F7F7F';
const CARD_LIGHT = '#7A9FA0';
const ARC_DARK = '#3D6565';
const ARC_LIGHT = '#A8C4C4';
const SECTION_BG = '#F0F3F3';

const DEFAULT_ITEMS = [
  {
    title: 'Prevent cavities & gum disease',
    description:
      'Routine exams catch plaque buildup early and keep gums healthy before pain or bleeding starts.',
    icon: 'shield',
  },
  {
    title: 'Detect problems early',
    description:
      'X-rays and clinical checks reveal decay, cracks, or infection when treatment is simpler and gentler.',
    icon: 'sparkles',
  },
  {
    title: 'Professional deep cleaning',
    description:
      'Scaling and polishing remove stains and tartar that daily brushing cannot reach on its own.',
    icon: 'gauge',
  },
  {
    title: 'Save time & money',
    description:
      'Small fixes at checkups cost far less than emergency visits, root canals, or tooth replacement later.',
    icon: 'rocket',
  },
  {
    title: 'Confidence in your smile',
    description:
      'Fresh breath, brighter teeth, and personalized home-care tips help you feel good every day.',
    icon: 'smile',
  },
];

const ringEase = [0.45, 0, 0.2, 1];

function HubGraphic({ active, instant = false }) {
  const cx = 120;
  const cy = 120;
  const r = 86;
  const sw = 28;

  const arcTransition = (delay) => ({
    pathLength: { duration: instant ? 0 : 0.55, ease: ringEase, delay: instant ? 0 : delay },
    opacity: { duration: instant ? 0 : 0.2, delay: instant ? 0 : delay },
  });

  return (
    <div
      className="relative mx-auto lg:mx-0 w-full max-w-[260px] aspect-square isolate"
      style={{ backgroundColor: SECTION_BG }}
      aria-hidden
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="flex h-[54%] w-[54%] items-center justify-center bg-transparent"
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            scale: active ? 1 : 0.88,
          }}
          transition={{
            duration: instant ? 0 : 0.45,
            delay: instant ? 0 : active ? 0.2 : 0,
            ease: ringEase,
          }}
        >
          <img
            src="/tooth-cutout.png"
            alt=""
            className="max-h-full max-w-full object-contain object-center"
            draggable={false}
          />
        </motion.div>
      </div>
      <svg
        viewBox="0 0 240 240"
        className="absolute inset-0 z-[1] h-full w-full block pointer-events-none"
      >
        {/* 1 — upper left arc (clockwise from top) */}
        <motion.path
          d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx - r} ${cy}`}
          fill="none"
          stroke={ARC_DARK}
          strokeWidth={sw}
          strokeLinecap="butt"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={arcTransition(0)}
        />
        {/* 2 — lower left arc */}
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 0 ${cx} ${cy + r}`}
          fill="none"
          stroke={ARC_LIGHT}
          strokeWidth={sw}
          strokeLinecap="butt"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={arcTransition(0.45)}
        />
        {/* 3 — dashed right semicircle */}
        <motion.path
          d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r}`}
          fill="none"
          stroke="#b8860b"
          strokeWidth="2"
          strokeDasharray="7 9"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.55 : 0 }}
          transition={arcTransition(0.9)}
        />
      </svg>
    </div>
  );
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.95 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function PremiumCheckupBenefits() {
  const block = siteConfig.content.home.premium?.checkupBenefits || {};
  const title = block.title || 'Benefits of regular dental checkups';
  const subtitle =
    block.subtitle ||
    'Twice-yearly visits protect more than your teeth. They support whole-mouth health, comfort, and long-term savings.';
  const items = block.items?.length ? block.items : DEFAULT_ITEMS;

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.28, margin: '-6% 0px' });
  const reduced = useReducedMotion();
  const active = inView;
  const instant = reduced;

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: SECTION_BG }}
      aria-labelledby="premium-checkup-benefits-heading"
    >
      <div className="shell">
        <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-12 lg:gap-10 xl:gap-14 items-start">
          <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left">
            <div className="max-w-md">
              <h2
                id="premium-checkup-benefits-heading"
                className="premium-heading-gold font-bold text-ink uppercase tracking-tight leading-tight"
              >
                {title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-ink/60 leading-relaxed font-sans">{subtitle}</p>
            </div>
            <HubGraphic active={active} instant={instant} />
          </div>

          <div className="relative min-w-0">
            <motion.div
              className="pointer-events-none absolute left-[21px] top-6 bottom-6 hidden lg:block w-px origin-top border-l-2 border-dashed border-ink/20"
              aria-hidden
              initial={false}
              animate={{ scaleY: active ? 1 : 0, opacity: active ? 1 : 0 }}
              transition={{ duration: instant ? 0 : 0.65, delay: instant ? 0 : 0.85, ease: ringEase }}
            />

            <motion.ul
              className="relative z-[1] space-y-4 sm:space-y-5"
              variants={listVariants}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              transition={instant ? { duration: 0 } : undefined}
            >
              {items.map((item, i) => {
                const Icon = ICONS[item.icon] || Sparkles;
                const dark = i % 2 === 1;
                const bg = dark ? CARD_DARK : CARD_LIGHT;

                return (
                  <motion.li key={item.title} className="flex items-center gap-0 min-w-0" variants={cardVariants}>
                    <span
                      className="premium-badge-gold relative z-[2] flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white text-xs font-bold tabular-nums"
                      style={{ boxShadow: `0 0 0 4px ${SECTION_BG}, 0 0 0 5px rgb(251 191 36 / 0.45)` }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="hidden sm:block h-px w-5 shrink-0 bg-ink/30" aria-hidden />
                    <article
                      className="premium-pill-gold-edge relative z-[2] flex min-w-0 flex-1 items-center justify-between gap-3 sm:gap-4 rounded-full px-5 py-4 sm:px-7 sm:py-5 min-h-[5.25rem] shadow-[0_8px_24px_-12px_rgba(26,46,46,0.18)]"
                      style={{ backgroundColor: bg }}
                    >
                      <div className="min-w-0 text-left">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[11px] sm:text-xs text-white/90 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      </div>
                      <span className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 grid place-items-center text-white">
                        <Icon size={22} strokeWidth={1.75} aria-hidden />
                      </span>
                    </article>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
