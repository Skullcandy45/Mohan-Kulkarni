import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Users } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import TeamMemberCard from '../TeamMemberCard';
import SectionHeader from '../SectionHeader';
import SectionShell from './SectionShell';
import { ease } from '../../lib/motion';
import { SectionStagger, SectionStaggerItem } from '../motion/SectionStagger';

function JoinTeamCard({ index = 0 }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: ease.editorial }}
      className="h-full"
    >
      <Link
        to="/contact"
        className="group border border-dashed border-primary/30 bg-surface hover:border-primary/55 hover:bg-primary-soft/20 transition-all duration-300 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[var(--radius-md)] card-elevated"
      >
        <div className="flex items-start sm:items-center gap-4">
          <span className="w-10 h-10 shrink-0 rounded-[var(--radius-sm)] bg-primary-soft text-primary grid place-items-center">
            <Users size={18} />
          </span>
          <div>
            <span className="label-meta text-primary">Join us</span>
            <h3 className="font-display text-xl text-ink mt-0.5 leading-tight">
              Join our <span className="text-primary">team</span>
            </h3>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-light)' }}>
              Experienced professionals welcome.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all shrink-0">
          Open roles <ArrowUpRight size={14} />
        </span>
      </Link>
    </motion.div>
  );
}

export default function TeamSection({ team = [] }) {
  const home = siteConfig.content.home;
  const reduced = useReducedMotion();
  const displayTeam = team.slice(0, 4);
  const miniStats = (siteConfig.stats || []).slice(0, 3);

  if (!displayTeam.length) return null;

  return (
    <SectionShell id="team" variant="alt" motion="team" divider="glow">
      <div className="relative">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/6 rounded-full blur-3xl pointer-events-none hidden lg:block" aria-hidden />

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionHeader
            badge={home.teamBadge}
            title={home.teamTitle}
            highlight={home.teamHighlight}
            description={home.teamDescription}
            noMargin
          />
          <Link to="/team" className="btn-outline group shrink-0 self-start sm:self-auto">
            Meet the team
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Desktop & tablet — 4-column grid */}
        <SectionStagger className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch" gap={0.09}>
          {displayTeam.map((member, i) => (
            <SectionStaggerItem key={member.id} variant="scale">
              <TeamMemberCard member={member} index={i} variant="home" />
            </SectionStaggerItem>
          ))}
        </SectionStagger>

        {/* Join CTA — full-width band below grid */}
        <div className="hidden sm:block mt-5">
          <JoinTeamCard index={displayTeam.length} />
        </div>

        {/* Mobile — horizontal scroll with tall cards */}
        <div
          className="sm:hidden flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {displayTeam.map((member, i) => (
            <motion.div
              key={member.id}
              initial={reduced ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: ease.editorial }}
              className="snap-start shrink-0 w-[72vw] max-w-[280px]"
            >
              <TeamMemberCard member={member} index={i} variant="home" />
            </motion.div>
          ))}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.45, delay: displayTeam.length * 0.07, ease: ease.editorial }}
            className="snap-start shrink-0 w-[72vw] max-w-[280px]"
          >
            <JoinTeamCard index={displayTeam.length} />
          </motion.div>
        </div>

        {/* Trust strip — fills visual gap, adds substance */}
        {miniStats.length > 0 && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-8 pt-6 border-t border-line-fine grid grid-cols-3 gap-4"
          >
            {miniStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-display text-xl sm:text-2xl text-ink tabular-nums">{stat.value}</div>
                <div className="label-meta mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </SectionShell>
  );
}
