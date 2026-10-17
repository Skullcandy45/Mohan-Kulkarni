import React from 'react';
import SectionDivider from '../motion/SectionDivider';

export default function SectionShell({
  children,
  variant = 'default',
  className = '',
  id,
  tight = false,
  bleed = false,
  divider = null,
}) {
  const bg =
    variant === 'alt' ? 'bg-surface-alt'
    : variant === 'ink' ? 'bg-ink text-cream'
    : variant === 'accent' ? 'bg-accent-wash'
    : 'bg-surface/80';

  const pad = tight ? 'section-compact' : 'section';

  return (
    <>
      {divider && <SectionDivider type={divider} to={variant} />}
      <section
        id={id}
        className={`relative ${bg} ${pad} ${bleed ? '' : 'border-b border-line-fine'} ${className} depth-layer overflow-hidden`}
      >
        <div className="absolute inset-0 bg-noise opacity-[0.12] pointer-events-none" aria-hidden />

        {variant === 'ink' && (
          <>
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-[100px] pointer-events-none animate-pulse-soft" aria-hidden />
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden />
          </>
        )}

        {variant === 'default' && (
          <>
            <div className="absolute inset-0 bg-mesh-gradient opacity-55 pointer-events-none" aria-hidden />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/6 rounded-full blur-[80px] pointer-events-none" aria-hidden />
          </>
        )}

        {variant === 'alt' && (
          <>
            <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" aria-hidden />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-soft/30 to-transparent pointer-events-none" aria-hidden />
          </>
        )}

        {variant === 'accent' && (
          <>
            <div className="absolute inset-0 bg-mesh-gradient opacity-50 pointer-events-none" aria-hidden />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-accent/10 blur-[60px] pointer-events-none" aria-hidden />
          </>
        )}

        <div className={`relative ${bleed ? '' : 'shell'}`}>{children}</div>
      </section>
    </>
  );
}
