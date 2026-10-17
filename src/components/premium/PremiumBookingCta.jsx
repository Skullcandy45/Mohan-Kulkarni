import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import PremiumRadialButton from './PremiumRadialButton';

export default function PremiumBookingCta() {
  const p = siteConfig.content.home.premium || {};

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F4F6F5]">
      <div className="shell">
        <div className="premium-panel-gold premium-golden-glow rounded-[2rem] sm:rounded-[2.5rem] bg-[#ECEFEE] overflow-hidden grid lg:grid-cols-2 gap-0">
          <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
            <h2 className="premium-heading-gold font-bold text-ink uppercase tracking-tight leading-tight">
              {p.bookingTitle || 'Book an appointment today'}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink/65 leading-relaxed font-sans max-w-md">
              {p.bookingSubtitle ||
                'Choose a time online or call the clinic. We will confirm your visit within one business day.'}
            </p>
            <PremiumRadialButton
              to="/appointment"
              label="Book an appointment"
              variant="primary"
              size="lg"
              className="mt-8"
            />
          </div>
          <div className="relative min-h-[260px] lg:min-h-full ring-1 ring-inset ring-amber-200/40">
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-tr from-amber-100/25 via-transparent to-transparent" aria-hidden />
            <img
              src={p.clinicImage || p.heroImage || siteConfig.content.home.heroImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
