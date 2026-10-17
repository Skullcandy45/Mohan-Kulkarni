import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe, motionProps, fadeUp } from '../lib/motion';

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  centered = false,
  centerOnMobile = false,
  light = false,
  noMargin = false,
  compact = false,
  action = null,
}) {
  const reduced = useMotionSafe();
  const align = centered
    ? 'text-center items-center'
    : centerOnMobile
      ? 'text-center items-center lg:text-left lg:items-start'
      : 'text-left items-start';
  const badgeAlign = centered ? 'justify-center' : centerOnMobile ? 'justify-center lg:justify-start' : '';
  const headerMotion = motionProps(reduced, fadeUp, { delay: 0.02 });

  return (
    <motion.div
      {...headerMotion}
      className={`flex flex-col ${align} ${
        noMargin ? 'mb-8'
        : compact ? 'mb-8 sm:mb-10'
        : 'mb-10 sm:mb-12 lg:mb-14'
      } ${action ? 'sm:flex-row sm:justify-between sm:items-end gap-6' : ''}`}
    >
      <div className={`${centered ? 'max-w-2xl' : 'max-w-xl'} ${centerOnMobile ? 'max-md:mx-auto w-full' : ''}`}>
        {badge && (
          <motion.div
            className={`flex items-center gap-3 mb-4 ${badgeAlign}`}
            initial={reduced ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="rule-accent shrink-0"
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ transformOrigin: 'left' }}
            />
            <span className={light ? 'eyebrow-light' : 'eyebrow'}>{badge}</span>
          </motion.div>
        )}
        <h2 className={`display-h2 text-balance ${light ? 'text-cream' : 'text-ink'}`}>
          {title}{' '}
          {highlight && (
            <motion.span
              className="gradient-text"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {highlight}
            </motion.span>
          )}
        </h2>
        {description && (
          <p className={`mt-4 ${centered || centerOnMobile ? 'mx-auto max-md:max-w-sm' : ''} ${light ? 'lead-on-dark' : 'lead'}`}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
