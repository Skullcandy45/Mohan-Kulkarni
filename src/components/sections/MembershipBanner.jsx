import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import SectionShell from './SectionShell';

export default function MembershipBanner() {
  const reduced = useReducedMotion();
  const banner = siteConfig.content?.home?.membershipBanner || {};

  return (
    <SectionShell variant="default" tight className="!border-b-0">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-primary via-primary-dark to-ink p-8 sm:p-10 lg:p-12 shadow-glow"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none" />
        <div className="absolute -top-24 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="chip-on-dark inline-flex gap-2 mb-4">
              <Sparkles size={12} /> {banner.badge || 'Care Plans'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-cream font-bold tracking-tight text-balance leading-tight">
              {banner.title || "Your Family's Dental Health Matters"}
            </h2>
            <p className="mt-4 text-cream/75 text-base sm:text-lg max-w-2xl leading-relaxed">
              {banner.subtitle || 'Flexible & transparent care plans designed for preventive visits, restorative work, and long-term smile maintenance.'}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {(banner.perks || ['No hidden fees', 'Family bundles', 'Priority scheduling']).map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5 text-sm text-cream/90 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                  <Heart size={12} className="text-primary-light shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch">
            <Link to="/contact" className="btn-white w-full justify-center py-3.5 rounded-2xl group">
              {banner.ctaPrimary || 'Discuss Plans'}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link to="/appointment" className="btn-primary w-full justify-center py-3.5 rounded-2xl bg-white/15 border border-white/25 hover:bg-white/25">
              {banner.ctaSecondary || 'Book Appointment'}
            </Link>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
