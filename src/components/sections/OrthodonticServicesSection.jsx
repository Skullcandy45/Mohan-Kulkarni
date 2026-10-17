import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { HomeTextFade, HomeScrollReveal } from '../motion/HomeScrollReveal';
import TypeInBold from '../motion/TypeInBold';
import LotteryMetric from '../motion/LotteryMetric';

const TOOTH_IMG = '/images/tooth-giant-cutout.png';

const DEFAULT_CARDS = [
  {
    id: 'diag',
    title: 'Digital Diagnosis',
    description: 'Advanced 3D scanning and digital planning for precise orthodontic assessment.',
    price: 'From ₹499',
    featured: false,
  },
  {
    id: 'align',
    title: 'Clear Aligners',
    description: 'Nearly invisible aligners designed for comfort and predictable tooth movement.',
    price: 'From ₹49,999',
    featured: true,
    image: 'https://images.unsplash.com/photo-1606811971330-762147412772?auto=format&fit=crop&w=800&q=80',
    tags: ['PRECISION', 'REMOVABLE', 'COMFORT FIT'],
  },
  {
    id: 'custom',
    title: 'Custom Treatment',
    description: 'Personalized orthodontic plans tailored to your smile goals and lifestyle.',
    price: 'From ₹799',
    featured: false,
  },
  {
    id: 'long',
    title: 'Long-Term Support',
    description: 'Retainers and follow-up care to maintain your results for years to come.',
    price: 'From ₹999',
    featured: false,
  },
];

function ServiceCard({ card, onLearn }) {
  if (card.featured) {
    return (
      <article className="relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px] min-h-[420px] rounded-[28px] overflow-hidden bg-[#EBF3FA] border border-[#EBF3FA] snap-start">
        <img src={card.image} alt="" className="absolute inset-0 w-full h-full object-cover object-[center_35%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
        <div className="relative h-full flex flex-col justify-between p-5 sm:p-6">
          <h3 className="font-display font-bold text-xl text-white tracking-tight">{card.title}</h3>
          <div className="flex flex-wrap gap-2">
            {(card.tags || []).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/95 text-primary border border-white"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px] min-h-[420px] rounded-[28px] bg-[#F4F8FC] border border-[#E8EEF4] p-6 sm:p-7 flex flex-col snap-start">
      <h3 className="font-display font-bold text-lg sm:text-xl text-ink tracking-tight leading-snug pr-2">
        {card.title}
      </h3>
      <div className="my-5 h-px bg-[#DCE6F0]" />
      <p className="text-sm text-muted leading-relaxed flex-1">{card.description}</p>
      <p className="mt-4 text-sm font-semibold text-ink">{card.price}</p>
      <button
        type="button"
        onClick={() => onLearn(card)}
        className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary group"
      >
        Learn More
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </article>
  );
}

export default function OrthodonticServicesSection({ services = [] }) {
  const navigate = useNavigate();
  const o = siteConfig.content?.home?.dentora?.orthodontic || {};
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cards = o.cards?.length ? o.cards : DEFAULT_CARDS;

  const stats = o.stats || [
    { value: '98%', label: 'Treatment accuracy', thumb: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80' },
    { value: '1,200+', label: 'Smiles restored', thumb: 'https://images.unsplash.com/photo-1606811971330-762147412772?auto=format&fit=crop&w=400&q=80' },
  ];

  const rightStats = o.rightStats || [
    { value: '15+', label: 'Years of orthodontic care', thumb: '/images/about-clinic.png' },
    { value: '500+', label: 'Clear aligner cases', thumb: '/images/aligners-tooth-3d.png' },
  ];

  const heroRightLines = (o.heroRight || ['Orthodontic', 'Treatment']).filter((line) => line !== '+');

  const updateScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
    window.setTimeout(updateScrollButtons, 400);
  };

  const onLearn = (card) => {
    navigate(`/appointment?service=${encodeURIComponent(card.title)}`);
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, []);

  return (
    <section id="services" className="bg-white overflow-hidden">
      {/* —— Editorial hero —— */}
      <div className="shell py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-12">
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            <HomeTextFade
              delay={0.02}
              className="lg:col-span-4 max-w-[240px] text-[11px] font-mono uppercase tracking-[0.12em] text-muted leading-relaxed"
            >
              {o.cornerTL ||
                'Innovative orthodontic development through digital planning and precision-driven treatment.'}
            </HomeTextFade>
            <div className="lg:col-span-4" aria-hidden />
            <HomeTextFade
              delay={0.06}
              className="lg:col-span-4 lg:col-start-9 max-w-[240px] lg:ml-auto text-[11px] font-mono uppercase tracking-[0.12em] text-muted leading-relaxed text-right"
            >
              {o.cornerTR ||
                'A modern approach that improves comfort, precision, and real-life results.'}
            </HomeTextFade>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 xl:gap-8 items-center lg:items-stretch">
            {/* Left: stats + display type (stacked, no overlap) */}
            <div className="lg:col-span-3 flex flex-col gap-8 lg:gap-10 order-2 lg:order-1">
              <div className="hidden md:flex flex-col gap-10">
                {stats.map((s, i) => (
                  <HomeTextFade key={s.label} delay={0.08 + i * 0.1}>
                    <div className="max-w-[200px]">
                      <LotteryMetric value={s.value} label={s.label} />
                      {s.thumb && (
                        <div className="mt-4 w-full max-w-[180px] aspect-[4/3] rounded-2xl overflow-hidden border border-line-fine shadow-sm">
                          <img src={s.thumb} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </HomeTextFade>
                ))}
              </div>

              <HomeTextFade delay={0.05} className="text-center lg:text-left">
                <p className="font-display font-bold text-[clamp(1.75rem,5vw,3.25rem)] xl:text-[clamp(2rem,3.2vw,3.75rem)] leading-[0.95] tracking-tight text-ink uppercase">
                  {(o.heroLeft || ['Advanced', 'Clear', 'Aligner']).map((line) => (
                    <span key={line} className="block">
                      <TypeInBold text={line} charMs={32} />
                    </span>
                  ))}
                </p>
              </HomeTextFade>

              <HomeTextFade
                delay={0.14}
                className="hidden lg:block max-w-[220px] text-[11px] font-mono uppercase tracking-[0.1em] text-muted leading-relaxed mt-auto"
              >
                {o.cornerBL ||
                  'Digital technologies and modern orthodontic methods ensure comfort throughout treatment.'}
              </HomeTextFade>
            </div>

            {/* Center: giant tooth */}
            <HomeScrollReveal
              variant="scale"
              duration={0.85}
              amount={0.15}
              className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2 py-4 lg:py-8"
            >
              <img
                src={TOOTH_IMG}
                alt=""
                className="w-full max-w-[min(88vw,420px)] sm:max-w-[460px] lg:max-w-[min(42vw,520px)] xl:max-w-[580px] h-auto object-contain drop-shadow-[0_40px_60px_rgba(15,82,186,0.2)]"
                onError={(e) => {
                  e.currentTarget.src = '/tooth-source.png';
                }}
              />
            </HomeScrollReveal>

            {/* Right: headline + mirror stats rail */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right gap-8 lg:gap-10 order-3">
              <HomeTextFade delay={0.12} className="lg:mt-8 xl:mt-12">
                <p className="font-display font-medium text-[clamp(1.35rem,3.5vw,2.5rem)] xl:text-[clamp(1.5rem,2.5vw,2.75rem)] leading-[1.05] tracking-tight text-primary/75 uppercase">
                  {heroRightLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </HomeTextFade>

              <div className="hidden md:flex flex-col gap-10 w-full max-w-[200px] lg:ml-auto">
                {rightStats.map((s, i) => (
                  <HomeTextFade key={s.label} delay={0.14 + i * 0.1}>
                    <div className="text-center lg:text-right">
                      <LotteryMetric value={s.value} label={s.label} />
                      {s.thumb && (
                        <div className="mt-4 w-full max-w-[180px] ml-auto mr-auto lg:mr-0 lg:ml-auto aspect-[4/3] rounded-2xl overflow-hidden border border-line-fine shadow-sm">
                          <img src={s.thumb} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </HomeTextFade>
                ))}
              </div>

              <HomeTextFade
                delay={0.2}
                className="hidden lg:block max-w-[220px] text-[11px] font-mono uppercase tracking-[0.14em] text-muted text-right"
              >
                {o.cornerBR || 'Digital Orthodontics'}
              </HomeTextFade>
            </div>
          </div>

          <div className="md:hidden grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <HomeTextFade key={s.label} delay={0.1 + i * 0.08}>
                <LotteryMetric
                  value={s.value}
                  label={s.label}
                  valueClassName="font-display font-bold text-3xl text-primary tabular-nums leading-none"
                />
              </HomeTextFade>
            ))}
          </div>
        </div>
      </div>

      {/* —— Services carousel —— */}
      <div className="shell pb-14 sm:pb-20 border-t border-line-fine pt-10 sm:pt-14">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-8 sm:mb-10">
          <HomeTextFade delay={0.04} className="lg:col-span-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
              <TypeInBold text={o.carouselTitle || 'Orthodontic Services'} charMs={24} />
            </h2>
          </HomeTextFade>
          <HomeTextFade delay={0.08} className="lg:col-span-5">
            <p className="text-sm sm:text-[15px] text-muted leading-relaxed max-w-md">
              {o.carouselDescription ||
                services[4]?.description ||
                'Comprehensive orthodontic solutions designed to improve alignment, function, and confidence — with transparent plans at every step.'}
            </p>
          </HomeTextFade>
          <HomeTextFade delay={0.1} className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-[#EBF3FA] text-ink font-semibold text-sm border border-primary/10 hover:border-primary/25 transition-colors group"
            >
              Consultation
              <span className="w-9 h-9 rounded-full bg-primary text-white grid place-items-center group-hover:scale-105 transition-transform">
                <ArrowRight size={16} />
              </span>
            </Link>
          </HomeTextFade>
        </div>

        <div
          ref={scrollerRef}
          onScroll={updateScrollButtons}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 -mx-1 px-1"
        >
          {cards.map((card) => (
            <ServiceCard key={card.id} card={card} onLearn={onLearn} />
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            className="w-11 h-11 rounded-full border border-line bg-white grid place-items-center text-ink disabled:opacity-35 hover:border-primary/30 transition-colors"
            aria-label="Previous services"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            className="w-11 h-11 rounded-full border border-line bg-white grid place-items-center text-ink disabled:opacity-35 hover:border-primary/30 transition-colors"
            aria-label="Next services"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
