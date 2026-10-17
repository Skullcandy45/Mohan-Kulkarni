import React from 'react';
import { siteConfig } from '../../config/siteConfig';

export default function ProcessRibbonSection() {
  const home = siteConfig.content.home;
  const steps =
    home.dentora?.processRibbon ||
    siteConfig.process?.map((p) => p.title) ||
    [];

  if (!steps.length) return null;

  return (
    <section className="border-y border-line-fine bg-white/80 backdrop-blur-sm">
      <div className="shell py-5 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x divide-line-fine">
          {steps.map((step, i) => {
            const label = typeof step === 'string' ? step : step.title;
            return (
              <div
                key={label}
                className="flex flex-col items-center lg:items-start text-center lg:text-left px-2 lg:px-8 first:lg:pl-0"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">
                  Step {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-bold text-ink text-sm sm:text-base tracking-tight">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
