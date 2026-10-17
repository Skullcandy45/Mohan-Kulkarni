import React from 'react';

import { Link } from 'react-router-dom';

import { ArrowUpRight } from 'lucide-react';

import { siteConfig } from '../../config/siteConfig';

import TestimonialCard from '../TestimonialCard';

import SectionHeader from '../SectionHeader';

import SectionShell from './SectionShell';

import StarRating from '../motion/StarRating';

import { SectionStagger, SectionStaggerItem } from '../motion/SectionStagger';



/** Static bento grid — distinct from service_2 carousel layout */

export default function TestimonialsSection({ testimonials = [] }) {

  const home = siteConfig.content.home;

  const items = testimonials.filter((t) => t.published !== false);

  if (!items.length) return null;

  const [lead, ...rest] = items;
  const side = rest.slice(0, 2);
  const more = rest.slice(2);



  return (

    <SectionShell id="reviews" variant="alt">

      <SectionHeader

        badge={home.testimonialsBadge}

        title={home.testimonialsTitle}

        highlight={home.testimonialsHighlight}

        description={home.testimonialsDescription}

        action={(

          <div className="flex items-center gap-3">

            <div className="hidden sm:flex items-center gap-2 text-xs text-muted">

              <StarRating count={5} size={12} />

              <span className="font-semibold text-ink">{home.heroTrustRating}</span>

            </div>

            <Link to="/testimonials" className="btn-ghost text-sm group">

              All reviews <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />

            </Link>

          </div>

        )}

      />



      <SectionStagger className="grid lg:grid-cols-12 gap-4 auto-rows-fr" gap={0.07}>

        <SectionStaggerItem variant="fadeUp" className="lg:col-span-7 lg:row-span-2">

          <TestimonialCard testimonial={lead} index={0} variant="lead" active />

        </SectionStaggerItem>

        {side.map((t, i) => (

          <SectionStaggerItem key={t.id} variant="fadeUp" className="lg:col-span-5">

            <TestimonialCard

              testimonial={t}

              index={i + 1}

              variant={i === 0 ? 'compact' : 'ink'}

            />

          </SectionStaggerItem>

        ))}

      </SectionStagger>

      {more.length > 0 && (
        <SectionStagger className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4" gap={0.07}>
          {more.map((t, i) => (
            <SectionStaggerItem key={t.id} variant="fadeUp">
              <TestimonialCard testimonial={t} index={i + 3} variant={i % 2 === 0 ? 'compact' : 'ink'} />
            </SectionStaggerItem>
          ))}
        </SectionStagger>
      )}

    </SectionShell>

  );

}


