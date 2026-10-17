import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Rocket, Heart, Zap } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

const statIconMap = {
  briefcase: Briefcase,
  rocket: Rocket,
  heart: Heart,
  zap: Zap,
};

export default function StatsSection() {
  const stats = siteConfig.stats;
  const home = siteConfig.content.home;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="shell relative py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            By the numbers
          </span>
          <h2 className="mt-4 display-h2 text-balance">{home.statsTitle}</h2>
          <p className="mt-4 text-muted text-base">{home.statsSubtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = statIconMap[stat.icon] || Briefcase;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card p-6 sm:p-8 text-center group"
              >
                <div className="w-11 h-11 rounded-2xl bg-primary-soft text-primary grid place-items-center mx-auto mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon size={20} />
                </div>
                <div className="font-display font-bold text-4xl sm:text-5xl text-ink tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted font-mono">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
