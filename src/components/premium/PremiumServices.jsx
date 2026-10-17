import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { EDITORIAL_HOME_SERVICES } from '../../config/editorialHomeServices';
import EditorialServiceImage, {
  FLIP_CARD_IMAGE_SIZES,
} from '../editorial/EditorialServiceImage';
import PremiumRadialButton from './PremiumRadialButton';

function ServiceFlipCard({ svc }) {
  return (
    <article
      tabIndex={0}
      className="premium-golden-glow premium-gold-border group aspect-square w-full cursor-pointer outline-none [perspective:1400px] focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F5] rounded-[1.75rem]"
    >
      <div className="relative h-full w-full rounded-[1.75rem] transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/45 bg-white/15 shadow-glass [backface-visibility:hidden]">
          <EditorialServiceImage
            src={svc.image}
            alt=""
            sizes={FLIP_CARD_IMAGE_SIZES}
            pictureClassName="premium-flip-card-media absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-primary/30 pointer-events-none" />
          <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/35 bg-white/20 px-4 py-3.5 backdrop-blur-xl sm:inset-x-4 sm:bottom-4 sm:px-5 sm:py-4 pointer-events-none">
            <h3 className="text-lg font-bold leading-snug text-white drop-shadow-sm sm:text-xl">
              {svc.title}
            </h3>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/40 p-6 text-center shadow-glass backdrop-blur-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-7">
          <h3 className="text-lg font-bold text-ink sm:text-xl">{svc.title}</h3>
          <p className="mt-3 max-h-[9rem] overflow-hidden text-sm leading-relaxed text-ink/70 font-sans">
            {svc.text}
          </p>
          <PremiumRadialButton
            to="/services"
            label="Explore more"
            variant="primary"
            size="sm"
            addIcon
            iconSymbol="↗"
            stopPropagation
            className="mt-6"
          />
        </div>
      </div>
    </article>
  );
}

export default function PremiumServices({ testimonials = [] }) {
  const p = siteConfig.content.home.premium || {};
  const avatars = testimonials.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F4F6F5]">
      <div className="shell">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12 lg:mb-14">
          <div>
            <h2 className="premium-heading-gold font-bold text-ink uppercase tracking-tight leading-tight max-w-md">
              {p.servicesHeading || 'Discover our dental services'}
            </h2>
            {avatars.length > 0 ? (
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {avatars.map((t, i) => (
                    <span
                      key={t.id || i}
                      className="w-9 h-9 rounded-full border-2 border-[#F4F6F5] bg-primary/20 grid place-items-center text-[10px] font-bold text-primary"
                    >
                      {(t.name || 'P')[0]}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-ink/60 font-sans">{p.reviewCountLabel || '750+ reviews'}</p>
              </div>
            ) : null}
          </div>
          <p className="text-sm sm:text-base text-ink/65 leading-relaxed font-sans lg:pt-2">
            {p.servicesAside || siteConfig.content.home.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {EDITORIAL_HOME_SERVICES.map((svc) => (
            <ServiceFlipCard key={svc.title} svc={svc} />
          ))}
        </div>
      </div>
    </section>
  );
}
