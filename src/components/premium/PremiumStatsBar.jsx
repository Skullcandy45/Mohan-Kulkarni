import React from 'react';
import { Heart, Smile, Star, ThumbsUp } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import LotteryMetric from '../motion/LotteryMetric';

const ICONS = [ThumbsUp, Smile, Star, Heart];

export default function PremiumStatsBar() {
  const stats = siteConfig.stats?.length
    ? siteConfig.stats
    : [
        { value: '98%', label: 'Happy patients' },
        { value: '50K+', label: 'Healthy smiles' },
        { value: '4.9', label: 'Average clinic rating' },
        { value: '15+', label: 'Years of patient care' },
      ];

  return (
    <section className="py-12 sm:py-14 bg-[#ECEFEE] border-y border-amber-200/30">
      <div className="shell grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {stats.slice(0, 4).map((s, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div
              key={s.label}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left"
            >
              <span className="premium-icon-gold w-12 h-12 rounded-full grid place-items-center shrink-0">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <LotteryMetric
                value={s.value}
                label={s.label}
                delay={i * 0.12}
                duration={2.2}
                valueClassName="premium-heading-gold text-3xl sm:text-4xl font-bold text-ink tracking-tight tabular-nums leading-none"
                labelClassName="mt-1 text-xs sm:text-sm text-ink/55 font-sans"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
