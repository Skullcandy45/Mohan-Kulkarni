import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, BadgeCheck } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import SectionHeader from '../SectionHeader';

export default function TrustSection() {
  const home = siteConfig.content.home;
  const logos = siteConfig.clientLogos || [];
  const stats = siteConfig.stats;
  const trustPoints = home.trustPoints || [];

  return (
    <section className="section-tight bg-surface border-y border-line/60">
      <div className="shell">
        <SectionHeader
          badge={home.trustBadge}
          title={home.trustTitle}
          highlight={home.trustHighlight}
          description={home.trustSubtitle}
          centered
        />

        {trustPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
          >
            {trustPoints.map((point, i) => (
              <motion.span
                key={point}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="chip-emerald"
              >
                <BadgeCheck size={12} className="shrink-0" />
                {point}
              </motion.span>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card p-5 flex flex-col items-center justify-center text-center group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-bg-subtle border border-line grid place-items-center font-display font-bold text-lg text-ink group-hover:bg-primary-soft group-hover:text-primary group-hover:border-primary/20 transition-all duration-300">
                {logo.initials}
              </div>
              <span className="mt-3 text-sm font-medium text-muted group-hover:text-ink transition-colors">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid sm:grid-cols-3 gap-6"
        >
          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 grid place-items-center shrink-0">
              <Star size={24} className="fill-current" />
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-ink">{home.heroTrustRating}</div>
              <div className="text-sm text-muted">Average client rating</div>
            </div>
          </div>

          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-soft text-primary grid place-items-center shrink-0">
              <Award size={24} />
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-ink">{stats[2]?.value}</div>
              <div className="text-sm text-muted">{stats[2]?.label}</div>
            </div>
          </div>

          <div className="glass-card p-6 sm:col-span-1 col-span-2">
            <div className="text-sm text-muted mb-3">What clients say most often</div>
            <p className="text-ink font-medium leading-relaxed italic">
              &ldquo;Professional, on time, and honest about pricing — exactly what I needed.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
