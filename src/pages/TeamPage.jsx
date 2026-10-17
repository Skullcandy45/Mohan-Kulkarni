import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpRight, X, ChevronDown } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';
import { useSettings } from '../contexts/SettingsContext';
import { api } from '../lib/api';
import TeamMemberCard from '../components/TeamMemberCard';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function TeamPage() {
  const { settings } = useSettings();
  const [team, setTeam] = useState(siteConfig.team || []);
  const page = siteConfig.content?.teamPage || {};
  const home = siteConfig.content?.home || {};
  const roles = ['All', ...new Set(team.map((m) => m.role || m.specialty || 'Team member'))];
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = useMemo(() => {
    return team.filter((m) => {
      const role = m.role || m.specialty || '';
      const matchSearch =
        m.name?.toLowerCase().includes(search.toLowerCase()) ||
        role.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'All' || role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [team, search, roleFilter]);

  const waLink = buildWhatsAppLink('Hi — I would like to speak with someone on your team.', settings);

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
      <section className="relative pt-4 lg:pt-8 pb-12 lg:pb-16">
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none opacity-60" />
        <div className="shell relative">
          <div className="max-w-3xl">
            <span className="glass-chip">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              {home.teamBadge || 'Our team'}
            </span>
            <h1 className="mt-6 display-h1 text-balance">
              {home.teamTitle || 'Meet the people'}{' '}
              <span className="gradient-text">{home.teamHighlight || 'behind the work.'}</span>
            </h1>
            <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">
              {home.teamDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-[60px] sm:top-[64px] z-30 bg-surface/95 backdrop-blur-xl border-y border-line-fine shadow-sm">
        <div className="shell py-3 sm:py-4 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-2" />
            <input
              type="search"
              placeholder={page.searchPlaceholder || 'Search by name or role…'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field pl-11 py-3"
              aria-label="Search team"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-2 hover:text-ink"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Mobile — dropdown scales cleanly with many roles */}
          <div className="sm:hidden w-full">
            <label htmlFor="team-role-filter" className="sr-only">
              {page.filterLabel || 'Filter by role'}
            </label>
            <div className="relative">
              <Filter size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-2 pointer-events-none" aria-hidden />
              <select
                id="team-role-filter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="field w-full pl-10 pr-10 py-3 appearance-none capitalize"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>{r === 'All' ? 'All roles' : r}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-2 pointer-events-none" aria-hidden />
            </div>
          </div>

          {/* Tablet+ — single-row horizontal scroll, no awkward wrap */}
          <div className="hidden sm:flex items-center gap-2 min-w-0 flex-1 sm:flex-none sm:max-w-[min(100%,520px)] overflow-x-auto scrollbar-none mask-fade-x pb-0.5 -mx-1 px-1">
            <Filter size={14} className="text-muted-2 shrink-0 sticky left-0" aria-hidden />
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={`chip whitespace-nowrap shrink-0 transition-all normal-case tracking-normal ${ 
                  roleFilter === r
                    ? 'bg-primary text-cream border-primary'
                    : 'bg-surface text-ink border-line hover:border-primary/30'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-2">
              Showing {filtered.length} {filtered.length === 1 ? 'person' : 'people'}
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-primary-dark inline-flex items-center gap-1.5"
            >
              Contact the team <ArrowUpRight size={14} />
            </a>
          </div>

          {filtered.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <Search size={32} className="mx-auto mb-6 opacity-20" aria-hidden />
              <h3 className="font-display text-2xl font-semibold text-ink mb-2">
                {page.emptyTitle || 'No team members found'}
              </h3>
              <p className="text-muted text-base mb-6">
                {page.emptyMessage || 'Try a different role or clear filters.'}
              </p>
              <button
                type="button"
                onClick={() => { setSearch(''); setRoleFilter('All'); }}
                className="btn-primary"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filtered.map((m, i) => (
                <TeamMemberCard key={m.id} member={m} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pb-20">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-ink to-primary-dim p-8 sm:p-12 lg:p-14"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
            <div className="absolute -top-16 -right-20 w-[400px] h-[400px] bg-primary/25 rounded-full blur-[120px]" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="eyebrow text-cream/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  {page.joinBadge || 'Careers'}
                </span>
                <h2 className="mt-4 font-display font-bold text-cream text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.02]">
                  {page.joinTitle || 'Join our team'}
                </h2>
                <p className="mt-4 text-cream/70 text-base sm:text-lg max-w-md leading-relaxed">
                  {page.joinSubtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-5 py-3.5 text-sm">
                  <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
                </a>
                <Link to="/contact" className="btn-white px-5 py-3.5 text-sm gap-2 group">
                  {page.joinCtaPortfolio || 'Send your profile'}
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
