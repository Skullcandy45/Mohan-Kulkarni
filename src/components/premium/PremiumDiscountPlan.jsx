import React from 'react';
import { Smile } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export default function PremiumDiscountPlan() {
  const p = siteConfig.content.home.premium || {};
  const d = p.discountPlan || {};

  const title =
    d.title ||
    "Your Family's Dental Health Matters: Discover Our Budget-Friendly Discount Plan.";
  const subtitle =
    d.subtitle ||
    'Unlock optimal dental wellness for your loved ones: embrace our budget-friendly discount plan for comprehensive care and radiant smiles.';
  const highlight = d.highlight || '80%';
  const cardText =
    d.cardText ||
    'Exclusive member savings: save 30% to 80% on dental procedures, including oral exams, cleanings, and X-rays.';

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" aria-labelledby="premium-discount-plan-heading">
      <div className="shell grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">
        <div className="max-w-xl">
          <h2
            id="premium-discount-plan-heading"
            className="premium-heading-gold font-bold text-ink leading-[1.12] tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-5 sm:mt-6 text-sm sm:text-base text-ink/60 leading-relaxed font-sans">{subtitle}</p>
        </div>

        <div className="premium-gold-ring relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#E8F2FC] via-[#F0F7FD] to-[#E3EEF8] p-8 sm:p-10 lg:p-12 min-h-[280px] sm:min-h-[320px] flex flex-col premium-gold-border">
          <div className="flex items-start justify-between gap-6">
            <p className="premium-heading-gold text-[clamp(4rem,13vw,6.25rem)] font-bold text-ink leading-none tracking-tight tabular-nums">
              {highlight}
            </p>
            <Smile
              className="shrink-0 text-ink stroke-[1.25] w-[clamp(4.5rem,14vw,7rem)] h-[clamp(4.5rem,14vw,7rem)] -mt-1 sm:-mt-2"
              aria-hidden
            />
          </div>
          <p className="mt-auto pt-8 sm:pt-10 text-sm sm:text-base font-medium text-ink leading-snug max-w-md">
            {cardText}
          </p>
        </div>
      </div>
    </section>
  );
}
