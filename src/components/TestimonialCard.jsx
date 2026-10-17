import React from 'react';
import { motion } from 'framer-motion';
import MotionCard from './motion/MotionCard';
import StarRating from './motion/StarRating';
import { useMotionSafe, motionProps, fadeUp, ease } from '../lib/motion';

export default function TestimonialCard({
  testimonial,
  index = 0,
  variant = 'compact',
  active = false,
  onSelect,
}) {
  const reduced = useMotionSafe();
  const resolvedVariant =
    variant === 'inverted' ? 'ink' : variant === 'default' ? 'compact' : variant;
  const stars = testimonial.rating || 5;
  const avatar =
    testimonial.image
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=4A3565&color=fff`;

  const reveal = motionProps(reduced, fadeUp, { delay: index * 0.04 });

  if (resolvedVariant === 'lead') {
    return (
      <motion.div {...reveal} className="h-full">
        <MotionCard
          variant="ink"
          hover={false}
          className="card-ink p-5 sm:p-6 h-full flex flex-col gradient-ring"
        >
          <div className="font-display text-4xl text-accent-visible/50 leading-none mb-3" aria-hidden>&ldquo;</div>
          <motion.p
            className="text-cream text-base sm:text-lg leading-relaxed flex-1"
            key={testimonial.id}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: ease.editorial }}
          >
            {testimonial.review}
          </motion.p>
          <footer className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
            <img
              src={avatar}
              alt={testimonial.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white/15"
              onError={(e) => { e.target.src = avatar; }}
            />
            <div className="flex-1 min-w-0">
              <cite className="not-italic font-medium text-sm text-cream">{testimonial.name}</cite>
              <div className="text-xs mt-0.5" style={{ color: 'var(--color-on-dark-muted)' }}>{testimonial.role}</div>
            </div>
            <StarRating count={stars} size={11} delay={0.05} />
          </footer>
        </MotionCard>
      </motion.div>
    );
  }

  const isInk = resolvedVariant === 'ink';

  return (
    <motion.div {...reveal} className="h-full">
      <MotionCard
        variant={isInk ? 'ink' : 'default'}
        className={`${isInk ? 'card-ink gradient-ring' : 'card-interactive'} p-4 sm:p-5 h-full flex flex-col ${onSelect ? 'cursor-pointer' : ''} ${
          active ? (isInk ? 'ring-1 ring-accent/40' : 'ring-1 ring-primary/30 border-primary/30') : ''
        }`}
        hover={Boolean(onSelect)}
        tilt={!isInk && Boolean(onSelect)}
        onClick={onSelect}
        role={onSelect ? 'button' : undefined}
        tabIndex={onSelect ? 0 : undefined}
        onKeyDown={
          onSelect
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect();
                }
              }
            : undefined
        }
      >
        {isInk && (
          <div className="font-display text-2xl text-accent-visible/40 leading-none mb-2" aria-hidden>&ldquo;</div>
        )}
        <p
          className={`text-sm sm:text-[15px] leading-relaxed flex-1 ${
            isInk ? 'text-cream/90' : 'text-ink'
          }`}
        >
          &ldquo;{testimonial.review}&rdquo;
        </p>
        <footer className={`mt-4 pt-3 flex items-center gap-2 ${isInk ? 'border-t border-white/10' : 'border-t border-line-fine'}`}>
          <img
            src={avatar}
            alt={testimonial.name}
            className={`w-7 h-7 rounded-full object-cover ${isInk ? 'ring-2 ring-white/15' : ''}`}
            loading="lazy"
            onError={(e) => { e.target.src = avatar; }}
          />
          <div className="flex-1 min-w-0">
            <cite className={`not-italic text-sm font-medium ${isInk ? 'text-cream' : 'text-ink'}`}>
              {testimonial.name}
            </cite>
            <div
              className="text-xs truncate"
              style={{ color: isInk ? 'var(--color-on-dark-muted)' : 'var(--color-text-light)' }}
            >
              {testimonial.role}
            </div>
          </div>
          {isInk && <StarRating count={stars} size={10} delay={0.02} />}
        </footer>
      </MotionCard>
    </motion.div>
  );
}
