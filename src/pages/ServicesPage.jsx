import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight, Phone, Calendar,
  HelpCircle, Plus,
} from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';
import { api } from '../lib/api';
import { useSettings } from '../contexts/SettingsContext';
import { parseJsonArray } from '../lib/contentFromSettings';
import ServiceCard from '../components/ServiceCard';
import SectionHeader from '../components/SectionHeader';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { PageHero, PageHeroItem } from '../components/motion/PageHeroMotion';

function ServiceHeroKpiCard({ k }) {
  const spanClass = k.colSpan === 2 || k.fullWidth ? 'col-span-2' : '';
  const labelCls = 'text-xs font-mono uppercase tracking-widest mb-1';
  const variant = k.variant || 'card';
  if (variant === 'ink' || variant === 'dark') {
    return (
      <div className={`card-ink p-5 ${spanClass}`}>
        <div className={`${labelCls} text-cream/60`}>{k.label}</div>
        <div className="font-display text-3xl text-cream font-medium leading-none">{k.value}</div>
      </div>
    );
  }
  if (variant === 'accent' || variant === 'primary') {
    return (
      <div className={`card p-5 bg-primary text-white border-primary ${spanClass}`}>
        <div className={`${labelCls} text-white/70`}>{k.label}</div>
        <div className="font-display text-2xl text-white font-medium leading-tight">{k.value}</div>
        {k.subtitle ? (
          <div className="mt-3 text-[12px] text-white/80">{k.subtitle}</div>
        ) : null}
      </div>
    );
  }
  return (
    <div className={`card p-5 ${spanClass}`}>
      <div className={`${labelCls} text-muted`}>{k.label}</div>
      <div className="font-display text-3xl text-ink font-medium leading-none">{k.value}</div>
    </div>
  );
}

function FaqItem({ item, idx, openIdx, setOpenIdx }) {
  const open = openIdx === idx;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="border border-line rounded-[var(--radius-lg)] overflow-hidden bg-surface"
    >
      <button
        type="button"
        onClick={() => setOpenIdx(open ? -1 : idx)}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left group touch-target"
        aria-expanded={open}
      >
        <span className="font-medium text-ink text-base sm:text-lg leading-snug">{item.q}</span>
        <span className={`shrink-0 w-9 h-9 rounded-full grid place-items-center transition-all ${open ? 'bg-primary text-white rotate-45' : 'bg-bg-subtle text-ink'}`}>
          <Plus size={16} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[15px] sm:text-base leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesPage() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { process, content } = siteConfig;
  const servicesContent = content?.servicesPage || {};
  const faq = parseJsonArray(settings?.services_faq_json, servicesContent.faq || []);
  const heroKpis = parseJsonArray(settings?.services_hero_kpis_json, servicesContent.heroKpis || []);
  const [services, setServices] = useState(siteConfig.services || []);
  const [openIdx, setOpenIdx] = useState(0);
  const phone = settings.contact_phone || siteConfig.site.contact?.phone;
  const waLink = buildWhatsAppLink('', settings);
  const home = siteConfig.content?.home || {};

  useEffect(() => {
    let active = true;
    api.services.getAll({ published: true }).then((res) => {
      if (!active) return;
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setServices(res.data);
      }
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  const handleWhatsApp = useCallback((svc) => {
    const link = buildWhatsAppLink(`Hi — I'd like to enquire about ${svc.title}.`, settings);
    window.open(link, '_blank', 'noopener,noreferrer');
  }, [settings]);

  const handleBook = useCallback((svc) => {
    const q = svc?.title ? `?service=${encodeURIComponent(svc.title)}` : '';
    navigate(`/appointment${q}`);
  }, [navigate]);

  const featured = services[0];
  const rest = services.slice(1);

  return (
    <div className="premium-page-content overflow-x-clip">
      <section className="relative pt-4 pb-16 lg:pt-8 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-soft opacity-[0.45] pointer-events-none mask-fade-b" />
        <div className="absolute -top-24 -right-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="shell relative">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <PageHero className="lg:col-span-8">
              <PageHeroItem>
              <span className="chip">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden />
                {servicesContent.heroBadge || home.servicesBadge} · {services.length}
              </span>
              </PageHeroItem>
              <PageHeroItem>
              <h1 className="mt-6 display-h1 text-balance">
                {servicesContent.heroTitle || home.servicesTitle}{' '}
                <span className="text-primary">{servicesContent.heroHighlight || home.servicesHighlight}</span>
              </h1>
              </PageHeroItem>
              <PageHeroItem>
              <p className="mt-5 lead max-w-xl">
                {servicesContent.heroSubtitle || home.servicesSubtitle}
              </p>
              </PageHeroItem>
              <PageHeroItem>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-6 py-3.5 text-[15px] min-h-[44px]">
                  <WhatsAppIcon className="w-5 h-5" /> Chat on WhatsApp
                </a>
                <Link to="/appointment" className="btn-primary px-6 py-3.5 text-[15px] gap-2 group min-h-[44px]">
                  <Calendar size={16} /> Book appointment
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
              </PageHeroItem>
            </PageHero>

            {heroKpis.length > 0 && (
              <PageHero className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="grid grid-cols-2 gap-3">
                  {heroKpis.map((k, i) => (
                    <PageHeroItem key={i}>
                      <ServiceHeroKpiCard k={k} />
                    </PageHeroItem>
                  ))}
                </div>
              </PageHero>
            )}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="shell">
          <SectionHeader
            badge={home.servicesBadge}
            title="All"
            highlight="services"
            description="Book online or message us — every service includes clear pricing and duration."
          />

          {services.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-lg text-ink font-medium">No services published yet.</p>
              <p className="mt-2 text-muted">Check back soon or contact us directly.</p>
              <Link to="/contact" className="btn-primary mt-6 inline-flex">Contact us</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              {featured && (
                <div className="md:col-span-2 lg:col-span-1 lg:row-span-2">
                  <ServiceCard
                    service={featured}
                    index={0}
                    variant="feature"
                    onWhatsApp={() => handleWhatsApp(featured)}
                    onBook={() => handleBook(featured)}
                  />
                </div>
              )}
              {rest.map((s, i) => (
                <ServiceCard
                  key={s.id}
                  service={s}
                  index={featured ? i + 1 : i}
                  variant="grid"
                  onWhatsApp={() => handleWhatsApp(s)}
                  onBook={() => handleBook(s)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-bg-subtle border-y border-line">
        <div className="shell section">
          <SectionHeader
            badge={home.processBadge}
            title={home.processTitle}
            highlight={home.processHighlight}
            description={servicesContent.processDescription || home.processSubtitle}
          />

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-line" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface border border-line text-ink font-display text-2xl shadow-elegant mb-5">
                    <span>{p.step}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-ink mb-2">{p.title}</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-text-light)' }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {faq.length > 0 && (
        <section className="section">
          <div className="shell grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <span className="eyebrow">
                <HelpCircle size={12} aria-hidden /> Frequently asked
              </span>
              <h2 className="mt-4 display-h2">
                Quick answers, before <span className="text-primary">we talk.</span>
              </h2>
              <p className="mt-5 lead max-w-md">
                {servicesContent.faqSidebar}
              </p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-7 px-5 py-3 text-sm min-h-[44px]">
                <WhatsAppIcon className="w-4 h-4" /> Ask on WhatsApp
              </a>
            </div>
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              {faq.map((item, idx) => (
                <FaqItem key={idx} item={item} idx={idx} openIdx={openIdx} setOpenIdx={setOpenIdx} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-16 sm:pb-20">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-ink p-8 sm:p-10 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" aria-hidden />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="display-h3 text-cream">
                  See a service that fits? <span className="text-accent-visible">Let&apos;s talk.</span>
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-5 py-3.5 text-sm min-h-[44px]">
                  <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
                </a>
                {phone && (
                  <a href={`tel:${phone}`} className="btn-white px-5 py-3.5 text-sm min-h-[44px]">
                    <Phone size={14} /> {phone}
                  </a>
                )}
                <Link to="/appointment" className="btn-primary px-5 py-3.5 text-sm min-h-[44px]">
                  Book appointment
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
