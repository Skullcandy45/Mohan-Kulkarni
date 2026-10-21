import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, Award, Calendar,
  Sparkles,
} from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';
import { api } from '../lib/api';
import { useSettings } from '../contexts/SettingsContext';
import { parseJsonArray, iconFromKey } from '../lib/contentFromSettings';
import SectionHeader from '../components/SectionHeader';
import TeamMemberCard from '../components/TeamMemberCard';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { PageHero, PageHeroItem } from '../components/motion/PageHeroMotion';

export default function AboutPage() {
  const { settings } = useSettings();
  const { site, stats, content } = siteConfig;
  const [team, setTeam] = useState(siteConfig.team || []);
  const aboutContent = content?.about || {};
  const values = parseJsonArray(settings?.about_values_json, aboutContent.values || []);
  const timeline = parseJsonArray(settings?.about_timeline_json, aboutContent.timeline || []);
  const waLink = buildWhatsAppLink('', settings);

  useEffect(() => {
    let active = true;
    api.doctors.getAll({ published: true }).then((res) => {
      if (!active) return;
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setTeam(res.data);
      }
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  return (
    <div className="premium-page-content overflow-x-clip">
      {/* HERO — magazine spread */}
      <section className="relative pt-4 lg:pt-8 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-soft opacity-[0.4] pointer-events-none mask-fade-b" />
        <div className="absolute -top-20 -right-32 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="shell relative grid lg:grid-cols-12 gap-12 items-end">
          <PageHero className="lg:col-span-7">
            <PageHeroItem>
            <span className="chip">
              <Sparkles size={11} /> {aboutContent.title}
            </span>
            </PageHeroItem>
            <PageHeroItem>
            <h1 className="mt-6 display-h1 text-balance">
              {aboutContent.heroTitle || 'Trusted locally,'}{' '}
              <span className="gradient-text">{aboutContent.heroHighlight || 'built on expertise.'}</span>
            </h1>
            </PageHeroItem>
            <PageHeroItem>
            <p className="mt-7 text-lg sm:text-xl text-muted max-w-xl leading-relaxed">
              {aboutContent.subtitle}
            </p>
            </PageHeroItem>
            <PageHeroItem>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-6 py-4 text-[15px]">
                <WhatsAppIcon className="w-5 h-5" /> Chat on WhatsApp
              </a>
              <Link to="/services" className="btn-outline px-6 py-4 text-[15px] gap-2 group">
                See what we do
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            </PageHeroItem>
          </PageHero>

          <PageHero className="lg:col-span-5 grid grid-cols-2 gap-3 lg:gap-4">
            <PageHeroItem className="rounded-3xl overflow-hidden aspect-[3/4] col-span-1 row-span-2 border border-line">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&h=800&q=80" alt="Dr. Mohan Kulkarni Dental Clinic" className="w-full h-full object-cover" />
            </PageHeroItem>
            <PageHeroItem className="rounded-3xl overflow-hidden aspect-square border border-line">
              <img src="https://images.unsplash.com/photo-1588776814546-1ffbb1ba8b6e?auto=format&fit=crop&w=500&h=500&q=80" alt="Modern dental treatment" className="w-full h-full object-cover" />
            </PageHeroItem>
            <PageHeroItem className="rounded-3xl bg-ink p-5 text-cream relative overflow-hidden flex flex-col justify-between aspect-square">
              <Award size={20} className="text-primary" />
              <div>
                <div className="font-display text-3xl font-medium leading-none">{stats[0]?.value}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-cream/60 mt-2">{stats[0]?.label}</div>
              </div>
            </PageHeroItem>
          </PageHero>
        </div>
      </section>

      {/* MISSION + STORY (split editorial) */}
      <section className="bg-bg-subtle border-y border-line">
        <div className="shell section grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-current" /> Our mission
            </span>
            <h2 className="mt-4 display-h2 text-balance">
              {aboutContent.missionTitle.split(' ')[0]}{' '}
              <em className="italic font-display text-primary">{aboutContent.missionTitle.split(' ').slice(1).join(' ')}</em>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed">
              {aboutContent.missionText}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {stats.slice(0, 4).map((stat, i) => (
                <div key={i} className="card p-4">
                  <div className="font-display text-2xl text-ink font-medium leading-none">{stat.value}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {timeline.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-7 sm:p-8 group hover:shadow-hover transition-all"
              >
                <div className="flex items-start gap-5 sm:gap-6">
                  <div className="shrink-0">
                    <div className="font-display font-medium text-3xl sm:text-4xl text-primary leading-none tracking-tight">
                      {entry.year}
                    </div>
                  </div>
                  <div className="flex-1 border-l border-line pl-5 sm:pl-6">
                    <h3 className="font-display font-medium text-2xl text-ink mb-2 tracking-tight">
                      {entry.title}
                    </h3>
                    <p className="text-muted leading-relaxed text-base">{entry.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES — bento */}
      <section className="section">
        <div className="shell">
          <SectionHeader
            badge="What we believe"
            title="Four values,"
            highlight="we live by."
            description="Principles that guide every consultation, every service, and every follow-up."
            centered
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => {
              const Icon = iconFromKey(v.icon);
              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="card p-7 hover:shadow-hover hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-soft border border-primary/15 grid place-items-center text-primary mb-5">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-medium text-xl text-ink leading-tight tracking-tight mb-3">
                  {v.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="bg-bg-subtle border-y border-line">
        <div className="shell section">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12 sm:mb-14">
            <div className="max-w-xl">
              <SectionHeader
                badge="The team"
                title={aboutContent.teamPreviewTitle || 'Our specialists'}
                highlight={aboutContent.teamPreviewHighlight || 'ready to help.'}
                description={aboutContent.teamPreviewDescription}
                noMargin
              />
            </div>
            <Link to="/team" className="btn-outline group">
              Meet the team
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {team.slice(0, 4).map((m, i) => <TeamMemberCard key={m.id} member={m} index={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-ink p-8 sm:p-12 lg:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute -top-20 -right-20 w-[420px] h-[420px] bg-primary/25 rounded-full blur-[120px]" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="eyebrow text-cream/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Book today
                </span>
                <h2 className="mt-5 font-display font-medium text-cream text-4xl sm:text-5xl tracking-tight leading-[0.98]">
                  {aboutContent.ctaTitle || 'Ready to get started?'}
                </h2>
                <p className="mt-5 text-cream/70 text-lg max-w-md leading-relaxed">
                  {aboutContent.ctaSubtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-6 py-4 text-[15px]">
                  <WhatsAppIcon className="w-5 h-5" /> Chat on WhatsApp
                </a>
                <Link to="/appointment" className="btn-white px-6 py-4 text-[15px] gap-2 group">
                  <Calendar size={16} /> Book a Call
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
