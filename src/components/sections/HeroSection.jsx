import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone, Zap } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../../config/siteConfig';
import { useSettings } from '../../contexts/SettingsContext';
import WhatsAppIcon from '../WhatsAppIcon';
import MotionButton, { MotionArrow } from '../motion/MotionButton';
import CountUp from '../motion/CountUp';
import StarRating from '../motion/StarRating';
import { ease, duration, slideRight, animateProps, heroLine } from '../../lib/motion';

export default function HeroSection({ heroSlides = [], team = [] }) {
  const { settings } = useSettings();
  const reduced = useReducedMotion();
  const home = siteConfig.content.home;
  const stats = siteConfig.stats;
  const [slideIdx, setSlideIdx] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 28]);

  const seedSlides = (siteConfig.heroSections || []).filter((s) => s.published !== false);
  const fallbackSlide = {
    title: home.heroTitle,
    subtitle: home.heroSubtitle,
    cta_text: home.heroCtaText,
    cta_link: '/appointment',
    background_image_url: seedSlides[0]?.background_image_url || home.heroImage,
  };
  const slides = heroSlides.length > 0 ? heroSlides : seedSlides.length > 0 ? seedSlides : [fallbackSlide];

  useEffect(() => { setSlideIdx(0); }, [heroSlides]);
  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[Math.min(slideIdx, slides.length - 1)] || slides[0];
  const waLink = buildWhatsAppLink('', settings);
  const phone = settings.contact_phone || siteConfig.site.contact?.phone;
  const titleLines = (slide.title || home.heroTitle || '').split('\n').filter(Boolean);
  const rawMarquee = settings?.home_marquee_text?.trim?.();
  const marquee = rawMarquee
    ? rawMarquee.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
    : (home.marqueeItems || []);
  const marqueeLoop = marquee.length > 0 ? [...marquee, ...marquee] : [];
  const badgeProps = animateProps(reduced, slideRight, { delay: 0.05, duration: duration.base });

  return (
    <header ref={heroRef} className="relative overflow-hidden border-b border-line-fine">
      <div className="absolute inset-0 hero-mesh pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-grid-soft opacity-[0.35] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent-wash) 50%, transparent) 0%, transparent 55%)',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-noise opacity-[0.18] pointer-events-none mix-blend-multiply" aria-hidden />

      {!reduced && (
        <motion.div
          className="absolute top-[18%] right-[8%] w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none hidden lg:block"
          animate={{ opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      )}

      <div className="shell relative pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pt-10 lg:pb-14">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: duration.hero, ease: ease.editorial }}
            className="lg:col-span-5 order-2 lg:order-1 w-full min-w-0"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative w-full max-w-md mx-auto lg:max-w-none"
            >
              <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] gradient-ring shadow-lg image-frame">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.background_image_url || slideIdx}
                    className="absolute inset-0"
                    initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                    animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
                    exit={reduced ? undefined : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                    transition={{ duration: 0.7, ease: ease.editorial }}
                  >
                    <img
                      src={slide.background_image_url || home.heroImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/5 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />

                <div className="absolute inset-0 z-10 p-4 sm:p-5 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-start justify-between gap-2">
                    {home.heroFloatingBadge && (
                      <motion.span
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.45 }}
                        className="hero-inset-accent shrink-0"
                      >
                        ★ {home.heroFloatingBadge}
                      </motion.span>
                    )}
                    {stats[1] && (
                      <motion.div
                        initial={reduced ? false : { opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                        className="hero-inset-glass ml-auto hidden sm:block"
                      >
                        <div className="label-meta mb-0.5">{stats[1].label}</div>
                        <div className="font-display text-xl text-ink tabular-nums leading-none">{stats[1].value}</div>
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {slides.length > 1 && (
                      <div className="flex justify-center gap-1.5 pointer-events-auto">
                        {slides.map((_, i) => (
                          <motion.button
                            key={i}
                            type="button"
                            aria-label={`Slide ${i + 1}`}
                            onClick={() => setSlideIdx(i)}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                              width: i === slideIdx ? 24 : 8,
                              backgroundColor: i === slideIdx ? 'var(--color-primary-light)' : 'rgba(255,255,255,0.45)',
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            className="h-1 rounded-full hover:!bg-white/70"
                          />
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap items-end justify-between gap-2">
                      {home.heroImageBadge && (
                        <span className="chip-on-dark text-[10px]">{home.heroImageBadge}</span>
                      )}
                      {home.heroLiveChip && (
                        <span className="chip-live text-[10px] ml-auto">
                          <span className="pulse-dot" aria-hidden />
                          {home.heroLiveChip}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {!reduced && stats[3] && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.5 }}
                    className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 hero-inset-ink shadow-lg max-w-[calc(100%-1.5rem)] hidden sm:block"
                  >
                    <div className="label-on-dark mb-0.5 truncate">{stats[3].label}</div>
                    <div className="font-display text-lg sm:text-xl text-cream tabular-nums">{stats[3].value}</div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center min-w-0">
            <motion.div {...badgeProps} className="mb-4 sm:mb-5">
              <span className="hero-badge-pill">
                <span className="pulse-dot" aria-hidden />
                {home.heroBadge}
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.h1
                key={slide.id || slideIdx}
                className="display-h1 text-balance max-w-xl"
              >
                {titleLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    <motion.span
                      custom={i}
                      variants={reduced ? undefined : heroLine}
                      initial={reduced ? false : 'hidden'}
                      animate={reduced ? undefined : 'visible'}
                      className={
                        i === titleLines.length - 1 && titleLines.length > 1
                          ? 'text-brand inline-block'
                          : 'inline-block'
                      }
                    >
                      {line}
                    </motion.span>
                  </React.Fragment>
                ))}
              </motion.h1>
            </AnimatePresence>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45, ease: ease.editorial }}
              className="lead mt-4 sm:mt-5 max-w-lg"
            >
              {slide.subtitle || home.heroSubtitle}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.4 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-2.5 w-full max-w-lg"
            >
              <MotionButton
                href={waLink}
                className="btn-whatsapp shadow-wa w-full sm:w-auto justify-center min-h-[44px]"
                magnetic
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                WhatsApp
              </MotionButton>
              <MotionButton
                to={slide.cta_link || '/appointment'}
                className="btn-cta group shadow-md w-full sm:w-auto justify-center min-h-[44px]"
                magnetic
              >
                {slide.cta_text || home.heroCtaText}
                <MotionArrow><ArrowRight size={16} /></MotionArrow>
              </MotionButton>
            </motion.div>

            {phone && (
              <motion.a
                href={`tel:${phone}`}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
                whileHover={{ x: 4 }}
                className="mt-3 inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors w-fit"
              >
                <Phone size={14} className="shrink-0" />
                {phone}
              </motion.a>
            )}

            {home.heroWhatsAppHint && (
              <motion.p
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-2 text-xs font-mono uppercase tracking-[0.1em] text-muted flex items-center gap-1.5"
              >
                <Zap size={11} className="text-primary shrink-0" aria-hidden />
                {home.heroWhatsAppHint}
              </motion.p>
            )}

            <motion.div
              initial={reduced ? false : 'hidden'}
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } } }}
              className="mt-8 pt-6 border-t border-line-fine hero-stats-ribbon"
            >
              {stats.slice(0, 4).map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.2 } }}
                  className="hero-stat-pill"
                >
                  <CountUp value={s.value} label={s.label} delay={0.35 + i * 0.06} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.45 }}
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              <div className="flex -space-x-1.5 shrink-0">
                {(team.length ? team : siteConfig.team || []).slice(0, 5).map((m, i) => (
                  <motion.img
                    key={m.id}
                    src={m.image || m.image_url}
                    alt=""
                    initial={reduced ? false : { opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.06, type: 'spring', stiffness: 400, damping: 22 }}
                    whileHover={reduced ? undefined : { y: -3, zIndex: 10 }}
                    className="w-8 h-8 rounded-full ring-2 ring-surface object-cover bg-surface-alt shadow-sm"
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted min-w-0">
                <StarRating count={5} size={10} delay={0.65} />
                <span className="font-semibold text-ink whitespace-nowrap">{home.heroTrustRating}</span>
                <span className="text-muted hidden sm:inline">· {home.heroTrustSubtext}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {marqueeLoop.length > 0 && (
        <div className="hero-marquee-band" aria-label="Service highlights">
          <div className="shell py-3 sm:py-3.5 overflow-hidden mask-fade-x">
            <div className="marquee-track gap-8 sm:gap-12 whitespace-nowrap">
              {marqueeLoop.map((t, i) => (
                <span key={`${t}-${i}`} className="hero-marquee-item inline-flex items-center gap-8 sm:gap-12 px-2 shrink-0">
                  {t}
                  <span className="text-primary/60 text-[10px] sm:text-xs" aria-hidden>◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
