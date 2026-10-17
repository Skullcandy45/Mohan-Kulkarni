import React, { useMemo, useRef } from 'react';
import { siteConfig } from '../../config/siteConfig';
import PremiumRadialButton from './PremiumRadialButton';

const DEFAULT_PILLS = ['Examination', 'Cleaning', 'Implants', 'Whitening', 'Treatment', 'Orthodontics'];

export default function PremiumHero() {
  const home = siteConfig.content.home;
  const p = home.premium || {};
  const pills = p.servicePills || DEFAULT_PILLS;
  const videoRef = useRef(null);

  const videoSrc = useMemo(() => {
    const base = p.heroVideo || '/Videos/dentist clinic video.mp4';
    const encoded = encodeURI(base);
    return `${encoded}#t=0.001`;
  }, [p.heroVideo]);

  const primeFirstFrame = () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      if (el.currentTime < 0.001) el.currentTime = 0.001;
    } catch {
      /* ignore seek errors during load */
    }
  };

  return (
    <section className="relative">
      <div className="relative min-h-[min(92vh,880px)] flex flex-col overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover brightness-125 contrast-[1.05] saturate-110"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          onLoadedMetadata={primeFirstFrame}
          onLoadedData={primeFirstFrame}
        />

        <div className="absolute inset-0 z-[1] bg-[#1a2e2e]/15" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#1a2e2e]/35 via-transparent to-[#1a2e2e]/8" />

        <div className="relative z-10 flex-1 shell flex items-center justify-center pb-12 lg:pb-16 pt-[5.5rem] sm:pt-28 lg:pt-32">
          <div className="premium-glass-gold w-full max-w-3xl mx-auto text-center rounded-[1.75rem] sm:rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 bg-white/10 backdrop-blur-xl shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)]">
            <h1 className="font-bold tracking-tight uppercase text-white drop-shadow-sm">
              {p.heroTitle || 'Modern dentistry with care for you.'}
            </h1>
            <p className="mt-5 text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto font-sans normal-case">
              {p.heroSubtitle || home.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {pills.map((label) => (
                <PremiumRadialButton key={label} to="/services" label={label} variant="glass" size="sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
