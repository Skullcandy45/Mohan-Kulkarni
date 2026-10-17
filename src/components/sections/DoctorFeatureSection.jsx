import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import {
  HomeScrollStagger,
  HomeScrollStaggerItem,
} from '../motion/HomeScrollReveal';
import TypeInBold from '../motion/TypeInBold';
import LotteryMetric from '../motion/LotteryMetric';

export default function DoctorFeatureSection() {
  const d = siteConfig.content.home.dentora || {};
  const doctor = siteConfig.team?.[0] || {};
  const operatoryImg =
    d.operatoryImage ||
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80';

  return (
    <section className="section pt-0 sm:pt-4">
      <div className="shell">
        <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-ink max-w-2xl mb-10 sm:mb-12 leading-tight">
          <TypeInBold text={d.featureTitle || 'Advanced Dental Care for a Healthier Smile.'} charMs={22} />
        </h2>

        <HomeScrollStagger className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <HomeScrollStaggerItem className="lg:col-span-5 rounded-[32px] border border-line-fine bg-white p-6 sm:p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.12)] flex flex-col">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-6 image-frame">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="text-muted text-xs ml-1">Lead Specialist</span>
            </div>
            <h3 className="mt-3 font-display font-bold text-xl sm:text-2xl text-ink">
              <TypeInBold text={doctor.name || ''} charMs={28} />
            </h3>
            <p className="text-sm text-primary font-medium mt-1">{doctor.role}</p>
            <p className="mt-4 text-muted text-sm sm:text-[15px] leading-relaxed flex-1">
              {d.doctorBlurb || doctor.bio}
            </p>
            <Link
              to="/appointment"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink group"
            >
              {d.doctorCta || 'Join hundreds of patients who trust our care'}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </HomeScrollStaggerItem>

          <HomeScrollStaggerItem className="lg:col-span-7 relative rounded-[32px] overflow-hidden min-h-[420px] lg:min-h-0 lg:aspect-[4/5] image-frame shadow-[0_24px_70px_-28px_rgba(15,23,42,0.2)]">
            <img src={operatoryImg} alt="Modern dental operatory" className="absolute inset-0 w-full h-full object-cover" />

            <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-[320px] dentora-glass-dark rounded-3xl p-5 sm:p-6 border border-white/15 shadow-xl">
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-cream/60">Recommended checkups / year</p>
                  <div className="mt-1">
                    <LotteryMetric
                      value={d.checkupsPerYear || '2 Visits'}
                      valueClassName="font-display font-bold text-2xl text-cream tabular-nums leading-none"
                      duration={1.4}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-cream/60">Average treatment time</p>
                  <div className="mt-1">
                    <LotteryMetric
                      value={d.avgTreatmentTime || '40 Mins'}
                      valueClassName="font-display font-bold text-2xl text-cream tabular-nums leading-none"
                      duration={1.4}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-cream/60 mb-2">Today&apos;s appointments</p>
                  <div className="flex items-end gap-1.5 h-16">
                    {[35, 55, 40, 70, 50, 85, 60].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md bg-primary/80 min-h-[4px]"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </HomeScrollStaggerItem>
        </HomeScrollStagger>
      </div>
    </section>
  );
}
