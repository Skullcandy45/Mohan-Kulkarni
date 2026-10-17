import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import {
  HomeScrollStagger,
  HomeScrollStaggerItem,
  HomeTextFade,
} from '../motion/HomeScrollReveal';
import TypeInBold from '../motion/TypeInBold';
import LotteryMetric from '../motion/LotteryMetric';

export default function AboutStatementSection() {
  const d = siteConfig.content.home.dentora || {};
  const stats = d.aboutStats || siteConfig.stats.slice(0, 3);
  const photos = d.aboutPhotos || [
    siteConfig.team?.[0]?.image,
    'https://images.unsplash.com/photo-1559839734-2b716b178d97?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1606811971330-762147412772?auto=format&fit=crop&w=600&q=80',
  ].filter(Boolean);

  const statement = d.aboutStatement ||
    'We deliver personalized dental treatments with modern technology and gentle care for every stage of your smile.';

  return (
    <section className="section bg-[#F8FAFC]">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <HomeScrollStagger className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <HomeScrollStaggerItem className="rounded-3xl overflow-hidden aspect-square border border-white shadow-md image-frame">
              <img src={photos[0]} alt="" className="w-full h-full object-cover" />
            </HomeScrollStaggerItem>
            <HomeScrollStaggerItem className="rounded-3xl overflow-hidden aspect-square border border-white shadow-md image-frame mt-8">
              <img src={photos[1] || photos[0]} alt="" className="w-full h-full object-cover" />
            </HomeScrollStaggerItem>
            <HomeScrollStaggerItem className="col-span-2 rounded-3xl overflow-hidden aspect-[2/1] border border-white shadow-md image-frame">
              <img src={photos[2] || photos[0]} alt="" className="w-full h-full object-cover" />
            </HomeScrollStaggerItem>
          </HomeScrollStagger>

          <div className="lg:col-span-7">
            <HomeTextFade delay={0.05}>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[2rem] leading-snug text-ink text-balance">
                <TypeInBold text={statement} as="span" charMs={18} />
              </h2>
            </HomeTextFade>

            <HomeScrollStagger className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-t border-line-fine pt-8">
              {stats.map((s) => (
                <HomeScrollStaggerItem key={s.label}>
                  <LotteryMetric
                    value={s.value}
                    label={s.label}
                    valueClassName="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-ink tabular-nums leading-none"
                    labelClassName="mt-2 text-xs sm:text-sm text-muted leading-snug"
                  />
                </HomeScrollStaggerItem>
              ))}
            </HomeScrollStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
