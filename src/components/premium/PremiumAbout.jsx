import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Stethoscope } from 'lucide-react';
import PremiumRadialButton from './PremiumRadialButton';
import { useInView, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../../config/siteConfig';

const FALLBACK_IMAGE = '/images/dr-mohan-kulkarni-hero.jpg';

function pickFeaturedDoctor(team, premium) {
  const cfg = premium.aboutDoctor || {};
  const fromTeam = team.filter((m) => m.published !== false)[0];

  return {
    name: cfg.name || fromTeam?.name || 'Dr. Mohan Kulkarni',
    designation: cfg.designation || fromTeam?.role || fromTeam?.designation || '',
    expertise:
      cfg.expertise ||
      fromTeam?.expertise ||
      fromTeam?.specialty ||
      fromTeam?.specialization ||
      '',
    experience: cfg.experience || fromTeam?.experience || fromTeam?.years_experience || '',
    image: cfg.image || fromTeam?.image || fromTeam?.image_url || FALLBACK_IMAGE,
    bio: cfg.bio || fromTeam?.bio || '',
  };
}

function DetailRow({ icon: Icon, label, value, flashDelay = 0 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.45, margin: '-10% 0px' });
  const wasInView = useRef(false);
  const [sweepKey, setSweepKey] = useState(0);

  useEffect(() => {
    if (reduced || !value) return undefined;

    if (!inView) {
      wasInView.current = false;
      setSweepKey(0);
      return undefined;
    }

    if (wasInView.current) {
      return undefined;
    }

    wasInView.current = true;
    const start = window.setTimeout(() => setSweepKey((k) => k + 1), flashDelay);

    return () => window.clearTimeout(start);
  }, [inView, reduced, flashDelay, value]);

  if (!value) return null;

  return (
    <div
      ref={ref}
      className="premium-doctor-detail-card premium-gold-border flex gap-4 rounded-2xl border border-ink/8 bg-[#F8FAFA] p-4 sm:p-5"
    >
      {sweepKey > 0 ? (
        <div key={sweepKey} className="premium-doctor-detail-sweep" aria-hidden />
      ) : null}
      <span className="relative z-[2] flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon size={20} aria-hidden />
      </span>
      <div className="relative z-[2] min-w-0 pt-0.5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">{label}</p>
        <p className="mt-1 text-sm sm:text-base font-medium text-ink leading-snug">{value}</p>
      </div>
    </div>
  );
}

export default function PremiumAbout({ team = [] }) {
  const p = siteConfig.content.home.premium || {};
  const doctor = pickFeaturedDoctor(team, p);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" aria-labelledby="premium-about-doctor-heading">
      <div className="shell grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="premium-gold-ring relative rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] max-h-[560px]">
          <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent pointer-events-none" />
        </div>

        <div>
          <p className="premium-eyebrow-gold">
            {p.aboutDoctorEyebrow || 'About doctor'}
          </p>
          <h2
            id="premium-about-doctor-heading"
            className="premium-heading-gold mt-4 font-bold text-ink uppercase tracking-tight leading-tight"
          >
            {doctor.name}
          </h2>
          {doctor.bio ? (
            <p className="mt-5 text-sm sm:text-base text-ink/65 leading-relaxed font-sans">{doctor.bio}</p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3">
            <DetailRow icon={Stethoscope} label="Designation" value={doctor.designation} flashDelay={0} />
            <DetailRow icon={GraduationCap} label="Expertise" value={doctor.expertise} flashDelay={350} />
            <DetailRow icon={Briefcase} label="Work experience" value={doctor.experience} flashDelay={700} />
          </div>

          <PremiumRadialButton
            to="/team"
            label="Meet our team"
            variant="outline"
            size="nav"
            addIcon
            iconSymbol="↗"
            className="mt-8"
          />
        </div>
      </div>
    </section>
  );
}
