import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowUpRight, Sparkles, Calendar, X } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';
import { useSettings } from '../contexts/SettingsContext';
import { api } from '../lib/api';
import TestimonialCard from '../components/TestimonialCard';
import WhatsAppIcon from '../components/WhatsAppIcon';
import StarRating from '../components/motion/StarRating';

function ReviewModal({ testimonial, onClose }) {
  if (!testimonial) return null;

  const avatar =
    testimonial.image
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=4A3565&color=fff`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="w-full max-w-xl bg-surface rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 p-6 sm:p-8 border-b border-line">
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={avatar}
                alt={testimonial.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/10 shrink-0"
              />
              <div className="min-w-0">
                <h2 id="review-modal-title" className="font-display text-xl font-medium text-ink truncate">
                  {testimonial.name}
                </h2>
                <p className="text-sm text-muted mt-0.5">{testimonial.role}</p>
                {testimonial.project && (
                  <p className="text-xs text-muted-2 mt-1">{testimonial.project}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-line grid place-items-center text-muted hover:text-ink hover:bg-surface-alt transition-colors shrink-0"
              aria-label="Close review"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-6 sm:p-8">
            <StarRating count={testimonial.rating || 5} size={14} />
            <blockquote className="mt-5 text-ink text-lg leading-relaxed">
              “{testimonial.review}”
            </blockquote>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function TestimonialsPage() {
  const { settings } = useSettings();
  const { content } = siteConfig;
  const [testimonials, setTestimonials] = useState(siteConfig.testimonials || []);
  const [selected, setSelected] = useState(null);
  const home = content?.home || {};
  const featured = testimonials[0] || { name: 'Client', role: 'Client', review: 'Great work.', rating: 5, image: '', project: '' };
  const rest = testimonials.slice(1);
  const avg = useMemo(() => {
    if (!testimonials.length) return '5.0';
    return (testimonials.reduce((s, t) => s + (t.rating || 5), 0) / testimonials.length).toFixed(1);
  }, [testimonials]);
  const waLink = buildWhatsAppLink('', settings);

  useEffect(() => {
    let active = true;
    api.testimonials.getAll({ published: true }).then((res) => {
      if (!active) return;
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setTestimonials(res.data);
      }
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selected) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  return (
    <div className="premium-page-content overflow-x-clip">
      {selected && <ReviewModal testimonial={selected} onClose={() => setSelected(null)} />}

      <section className="relative pt-4 lg:pt-8 pb-16">
        <div className="absolute inset-0 bg-grid-soft opacity-[0.4] pointer-events-none mask-fade-b" />
        <div className="shell relative">
          <div className="max-w-3xl">
            <span className="chip">
              <Sparkles size={11} className="text-primary" /> {home.testimonialsBadge}
            </span>
            <h1 className="mt-6 display-h1 text-balance">
              {home.testimonialsTitle} <em className="not-italic italic font-display text-primary">{home.testimonialsHighlight}</em>
            </h1>
            <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">
              {home.testimonialsDescription}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-line border border-line rounded-3xl bg-surface overflow-hidden">
            {[
              { label: 'Average rating', value: `${avg}/5`, sub: 'Across all reviews' },
              { label: 'Verified reviews', value: `${testimonials.length}+`, sub: 'From real clients' },
              { label: 'Repeat clients', value: '92%', sub: 'Year-on-year' },
              { label: 'On-time rate', value: '94%', sub: 'Last 12 months' },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-6 sm:p-8"
              >
                <div className="font-display font-medium text-3xl sm:text-4xl text-ink leading-none tracking-mega">
                  {m.value}
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.18em] text-muted font-mono">{m.label}</div>
                <div className="mt-1 text-sm text-muted-2">{m.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="shell">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-ink p-8 sm:p-12 lg:p-16 relative overflow-hidden cursor-pointer"
            onClick={() => setSelected(featured)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelected(featured);
              }
            }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
            <div className="absolute -top-20 right-0 w-[420px] h-[420px] bg-primary/22 rounded-full blur-[140px]" />
            <div className="relative grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-9">
                <Quote size={48} className="text-primary/70 mb-6" />
                <blockquote className="font-display font-light italic text-cream text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight max-w-4xl">
                  “{featured.review}”
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/15"
                  />
                  <div>
                    <div className="font-display text-cream text-xl font-medium tracking-tight">{featured.name}</div>
                    <div className="text-cream/60 text-[13px] mt-0.5">{featured.role}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    {Array.from({ length: featured.rating || 5 }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </figcaption>
              </div>
              <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-8">
                <div className="text-xs font-mono uppercase tracking-widest text-cream/50 mb-2">Project</div>
                <div className="font-display text-cream text-xl font-medium leading-tight tracking-tight mb-6">
                  {featured.project || 'Brand + product'}
                </div>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full text-sm py-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <WhatsAppIcon className="w-4 h-4" /> Start your project
                </a>
              </div>
            </div>
          </motion.figure>
        </div>
      </section>

      <section className="pb-20">
        <div className="shell">
          <p className="text-sm text-muted mb-6">Tap a review to read the full story.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {rest.map((t, i) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                index={i}
                variant={i % 2 === 1 ? 'ink' : 'compact'}
                onSelect={() => setSelected(t)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 sm:p-12 relative overflow-hidden bg-bg-subtle border-line"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="eyebrow"><span className="w-1.5 h-1.5 rounded-full bg-current" /> Want a similar outcome?</span>
                <h3 className="mt-4 font-display font-medium text-3xl sm:text-4xl text-ink tracking-mega leading-[1]">
                  Tell us where you're <em className="not-italic italic text-primary">stuck.</em>
                </h3>
                <p className="mt-4 text-muted text-base leading-relaxed max-w-md">
                  We reply within a day with a clear next step — no forms, no funnels.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-5 py-3.5 text-sm">
                  <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
                </a>
                <Link to="/appointment" className="btn-primary px-5 py-3.5 text-sm gap-2 group">
                  <Calendar size={14} /> Book Appointment
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
