import React, { useMemo, useState } from 'react';

import { siteConfig } from '../../config/siteConfig';



const FALLBACK_AVATAR =

  'https://images.unsplash.com/photo-1494790108377-be9c29b29329?auto=format&fit=crop&w=200&q=80';



/** Premium template blues — aligned with clinic teal / soft surfaces */

const CARD_BLUES = [

  '#E3EFF8',

  '#DBEAFE',

  '#EBF4FA',

  '#D6E8F5',

  '#CFE4F2',

  '#E0F2FE',

  '#E8F0F0',

  '#D1E5F0',

  '#C5DFF0',

  '#B8D4E8',

];



function normalizeTestimonials(list) {

  const config = siteConfig.testimonials || [];

  const api = (list || []).filter((t) => t.published !== false);

  const merged =

    api.length > 0

      ? [...api, ...config.filter((c) => !api.some((a) => a.id === c.id))]

      : config;

  const source = merged.slice(0, 10);

  const defaultLocale = 'Mumbai, IN';



  return source

    .filter((t) => t.published !== false)

    .map((t, i) => ({

      id: t.id ?? i,

      name: t.name || 'Patient',

      location: t.location || t.city || defaultLocale,

      role: t.role || t.designation || '',

      review: t.review || t.text || t.content || '',

      image: t.image || t.image_url || FALLBACK_AVATAR,

      color: CARD_BLUES[i % CARD_BLUES.length],

    }))

    .filter((t) => t.review);

}



function Avatar({ src, name }) {

  const [failed, setFailed] = useState(false);

  const show = src && !failed;



  return show ? (

    <img

      src={src}

      alt=""

      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 bg-white ring-1 ring-ink/10"

      onError={() => setFailed(true)}

    />

  ) : (

    <span

      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 bg-white/80 text-primary text-sm font-semibold grid place-items-center ring-1 ring-ink/10"

      aria-hidden

    >

      {(name || 'P')[0]}

    </span>

  );

}



function TestimonialCard({ item }) {

  const subtitle = item.location || item.role;



  return (

    <article

      className="premium-gold-border flex h-full min-h-[220px] flex-col rounded-2xl sm:rounded-[1.125rem] p-6 sm:p-7 shadow-[0_8px_24px_-12px_rgba(202,160,70,0.15)]"

      style={{ backgroundColor: item.color }}

    >

      <blockquote className="flex-1 text-[0.9375rem] sm:text-base leading-relaxed text-ink/85 font-sans italic">

        &ldquo;{item.review}&rdquo;

      </blockquote>

      <footer className="mt-6 flex items-center gap-3">

        <Avatar src={item.image} name={item.name} />

        <div className="min-w-0">

          <p className="font-semibold text-sm text-ink truncate">{item.name}</p>

          {subtitle ? (

            <p className="text-xs sm:text-[0.8125rem] text-ink/55 truncate font-sans">{subtitle}</p>

          ) : null}

        </div>

      </footer>

    </article>

  );

}



/** Duplicate items so a -50% translate loops seamlessly. */

function loopItems(items) {

  if (items.length === 0) return [];

  const min = 4;

  let base = [...items];

  while (base.length < min) {

    base = [...base, ...items];

  }

  return [...base, ...base];

}



function MarqueeReviewRow({ items, direction = 'right' }) {

  if (items.length === 0) return null;



  const track = loopItems(items);

  const animClass = direction === 'right' ? 'premium-marquee-right' : 'premium-marquee-left';



  return (

    <div className="premium-marquee-viewport">

      <div className={`premium-marquee-track ${animClass}`}>

        {track.map((item, i) => (

          <div key={`${item.id}-${i}`} className="premium-marquee-item">

            <TestimonialCard item={item} />

          </div>

        ))}

      </div>

    </div>

  );

}



export default function PremiumTestimonials({ testimonials = [] }) {

  const p = siteConfig.content.home.premium || {};

  const items = useMemo(() => normalizeTestimonials(testimonials), [testimonials]);



  const midpoint = Math.ceil(items.length / 2);

  const rowOne = items.slice(0, midpoint);

  const rowTwo = items.slice(midpoint);



  if (items.length === 0) return null;



  return (

    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFBFB]" aria-labelledby="premium-testimonials-heading">

      <div className="shell">

        <header className="text-center max-w-2xl mx-auto">

          <h2

            id="premium-testimonials-heading"

            className="premium-heading-gold premium-heading-gold-center font-bold text-ink leading-tight tracking-tight"

          >

            {p.testimonialsHeading || 'What people are saying?'}

          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-ink/55 leading-relaxed font-sans">

            {p.testimonialsSubtitle ||

              "Hear what our patients say — thousands of happy smiles across Santacruz, Mumbai."}

          </p>

        </header>



        <div className="mt-10 sm:mt-12 space-y-4">

          <MarqueeReviewRow items={rowOne} direction="right" />

          <MarqueeReviewRow items={rowTwo.length > 0 ? rowTwo : rowOne} direction="left" />

        </div>

      </div>

    </section>

  );

}


