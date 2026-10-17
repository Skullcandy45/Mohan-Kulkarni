import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, IndianRupee } from 'lucide-react';
import MotionCard from './motion/MotionCard';
import MotionButton, { MotionArrow } from './motion/MotionButton';
import { useMotionSafe, motionProps, fadeUp, useSpotlight } from '../lib/motion';
import { serviceIconFromKey } from '../lib/serviceIcons';

export default function ServiceCard({
  service,
  index = 0,
  variant = 'row',
  onWhatsApp,
  onBook,
  noReveal = false,
}) {
  const reduced = useMotionSafe();
  const spotlight = useSpotlight();
  const Icon = serviceIconFromKey(service.icon);
  const num = String(index + 1).padStart(2, '0');
  const price = service.price ? String(service.price) : '';
  const reveal = noReveal ? null : motionProps(reduced, fadeUp, { delay: index * 0.04 });

  const Outer = noReveal ? 'div' : motion.div;
  const outerProps = noReveal ? { className: 'h-full' } : { ...reveal, className: 'h-full' };

  if (variant === 'grid' || variant === 'card') {
    return (
      <Outer {...outerProps}>
        <MotionCard
          hover
          tilt
          className="group card-interactive peel-hover p-6 sm:p-7 h-full flex flex-col"
        >
          <div className="flex items-start justify-between gap-3 mb-5">
            <motion.div
              className="w-12 h-12 rounded-[var(--radius-md)] bg-primary-soft text-primary grid place-items-center shrink-0 group-hover:bg-primary group-hover:text-cream transition-colors duration-300"
              whileHover={reduced ? undefined : { scale: 1.06, rotate: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              <Icon size={22} />
            </motion.div>
            <span className="index-num text-xs">{num}</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl text-ink leading-tight mb-2">
            {service.title}
          </h3>
          <p className="text-[15px] sm:text-base leading-relaxed flex-1 mb-5" style={{ color: 'var(--color-text-light)' }}>
            {service.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {service.duration && (
              <span className="chip text-[10px] py-1">
                <Clock size={10} aria-hidden /> {service.duration}
              </span>
            )}
            {price && (
              <span className="chip-emerald text-[10px] py-1 font-semibold normal-case tracking-normal">
                {price}
              </span>
            )}
          </div>
          <div className="mt-auto pt-4 border-t border-line-fine flex flex-wrap items-center gap-2">
            <MotionButton
              type="button"
              onClick={onBook}
              className="btn-primary text-sm min-h-[42px] px-4 flex-1 sm:flex-none"
            >
              Book
              <MotionArrow><ArrowRight size={14} /></MotionArrow>
            </MotionButton>
            <MotionButton
              type="button"
              onClick={onWhatsApp}
              className="btn-outline text-sm min-h-[42px] px-4 flex-1 sm:flex-none"
            >
              Ask on WhatsApp
            </MotionButton>
          </div>
        </MotionCard>
      </Outer>
    );
  }

  if (variant === 'feature') {
    return (
      <Outer {...outerProps}>
        <div
          ref={spotlight.ref}
          onMouseMove={spotlight.onMove}
          onMouseLeave={spotlight.onLeave}
          className="h-full spotlight-card group"
        >
          <MotionCard
            variant="ink"
            tilt
            hover
            className="card-ink p-5 sm:p-6 relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute inset-0 opacity-[0.06] bg-grid-soft pointer-events-none" aria-hidden />
            <div
              className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-primary/25 blur-3xl pointer-events-none transition-opacity duration-700 opacity-40 group-hover:opacity-70"
              aria-hidden
            />
            <div className="relative flex items-start justify-between gap-3 mb-4">
              <span className="label-on-dark flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-visible/80" aria-hidden />
                Featured · {num}
              </span>
              <motion.div
                className="w-11 h-11 rounded-[var(--radius-md)] bg-white/10 border border-white/12 grid place-items-center text-cream shrink-0 backdrop-blur-sm"
                whileHover={reduced ? undefined : { scale: 1.08, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                <Icon size={20} />
              </motion.div>
            </div>
            <h3 className="relative font-display text-xl sm:text-2xl lg:text-[1.65rem] text-cream leading-tight mb-2">
              {service.title}
            </h3>
            <p className="relative text-sm leading-relaxed flex-1 line-clamp-3" style={{ color: 'var(--color-on-dark-muted)' }}>
              {service.description}
            </p>
            <div className="relative mt-5 pt-4 border-t border-white/10 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {service.duration && (
                  <span className="chip-on-dark">
                    <Clock size={10} aria-hidden /> {service.duration}
                  </span>
                )}
                {price && (
                  <span className="chip-on-dark-strong inline-flex items-center gap-0.5 normal-case tracking-normal font-semibold">
                    <IndianRupee size={10} aria-hidden />
                    {price.replace(/₹/g, '').trim()}
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                {onBook && (
                  <MotionButton type="button" onClick={onBook} className="btn-outline text-xs min-h-[40px] border-white/25 bg-white/10 text-cream hover:bg-white/15 flex-1">
                    Book appointment
                  </MotionButton>
                )}
                <MotionButton type="button" onClick={onWhatsApp} className="btn-accent text-xs min-h-[40px] flex-1 sm:flex-none sm:ml-auto">
                  Enquire <MotionArrow><ArrowRight size={14} /></MotionArrow>
                </MotionButton>
              </div>
            </div>
          </MotionCard>
        </div>
      </Outer>
    );
  }

  if (noReveal) {
    return (
      <article className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[40px_1fr_auto_auto] gap-2.5 sm:gap-4 items-center py-3 border-b border-line-fine last:border-0 hover:bg-surface-alt/60 -mx-2 px-2 sm:-mx-3 sm:px-3 rounded-[var(--radius-sm)] transition-colors duration-200">
        <span className="index-num">{num}</span>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-7 h-7 rounded-[6px] bg-primary-soft text-primary grid place-items-center shrink-0 group-hover:bg-primary group-hover:text-cream transition-colors duration-200">
              <Icon size={14} />
            </span>
            <h3 className="font-display text-base sm:text-lg text-ink leading-tight">{service.title}</h3>
          </div>
          <p className="text-sm leading-relaxed line-clamp-1" style={{ color: 'var(--color-text-light)' }}>
            {service.description}
          </p>
          <div className="mt-1.5 flex gap-3 label-meta">
            {service.duration && <span>{service.duration}</span>}
            {price && <span className="text-ink font-semibold normal-case tracking-normal">{price}</span>}
          </div>
        </div>
        <div className="hidden sm:flex flex-col gap-1.5 items-end">
          <MotionButton type="button" onClick={onBook} className="btn-ghost text-xs py-1">
            Book
          </MotionButton>
          <button type="button" onClick={onWhatsApp} className="text-xs font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1">
            Ask <ArrowRight size={12} />
          </button>
        </div>
        <MotionButton
          type="button"
          onClick={onBook}
          className="sm:hidden btn-primary py-1.5 px-2.5 text-xs self-center"
          aria-label={`Book ${service.title}`}
        >
          <ArrowRight size={14} />
        </MotionButton>
      </article>
    );
  }

  return (
    <motion.article
      {...reveal}
      whileHover={reduced ? undefined : { x: 4 }}
      className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[40px_1fr_auto_auto] gap-2.5 sm:gap-4 items-center py-3 border-b border-line-fine last:border-0 hover:bg-surface-alt/60 -mx-2 px-2 sm:-mx-3 sm:px-3 rounded-[var(--radius-sm)] transition-colors duration-200"
    >
      <span className="index-num">{num}</span>
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <motion.span
            className="w-7 h-7 rounded-[6px] bg-primary-soft text-primary grid place-items-center shrink-0 group-hover:bg-primary group-hover:text-cream transition-colors duration-200"
            whileHover={reduced ? undefined : { scale: 1.1, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <Icon size={14} />
          </motion.span>
          <h3 className="font-display text-base sm:text-lg text-ink leading-tight">{service.title}</h3>
        </div>
        <p className="text-sm leading-relaxed line-clamp-1" style={{ color: 'var(--color-text-light)' }}>
          {service.description}
        </p>
        <div className="mt-1.5 flex gap-3 label-meta">
          {service.duration && <span>{service.duration}</span>}
          {price && <span className="text-ink font-semibold normal-case tracking-normal">{price}</span>}
        </div>
      </div>
      <div className="hidden sm:flex flex-col gap-1.5 items-end">
        <MotionButton type="button" onClick={onBook} className="btn-ghost text-xs py-1">
          Book
        </MotionButton>
        <button type="button" onClick={onWhatsApp} className="text-xs font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1">
          Ask <ArrowRight size={12} />
        </button>
      </div>
      <MotionButton
        type="button"
        onClick={onBook}
        className="sm:hidden btn-primary py-1.5 px-2.5 text-xs self-center"
        aria-label={`Book ${service.title}`}
      >
        <ArrowRight size={14} />
      </MotionButton>
    </motion.article>
  );
}
