import React from 'react';

import { motion } from 'framer-motion';

import { Phone, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';

import { siteConfig, buildWhatsAppLink } from '../../config/siteConfig';

import { useSettings } from '../../contexts/SettingsContext';

import { parseJsonArray } from '../../lib/contentFromSettings';

import WhatsAppIcon from '../WhatsAppIcon';

import SectionShell from './SectionShell';

import MotionButton, { MotionArrow } from '../motion/MotionButton';

import { useMotionSafe, motionProps, fadeUp, stagger } from '../../lib/motion';

import { SectionStagger, SectionStaggerItem } from '../motion/SectionStagger';



/** Full-width gradient CTA band — distinct from service_2 split card */

export default function CtaSection() {

  const reduced = useMotionSafe();

  const { settings } = useSettings();

  const home = siteConfig.content.home;

  const metrics = parseJsonArray(settings?.home_cta_metrics_json, home.ctaMiniMetrics || []);

  const miniNote = settings?.home_cta_mini_note?.trim() || home.ctaMiniNote || '';

  const phone = settings.contact_phone || siteConfig.site.contact?.phone;

  const waLink = buildWhatsAppLink('', settings);



  return (

    <SectionShell tight className="!border-b-0">

      <motion.div

        {...motionProps(reduced, fadeUp)}

        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line-fine"

        style={{
          background: 'linear-gradient(145deg, var(--color-primary-dim) 0%, var(--color-primary) 100%)',
        }}

      >

        <div className="absolute inset-0 bg-grid-soft opacity-[0.07] pointer-events-none" aria-hidden />

        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/12 blur-3xl pointer-events-none" aria-hidden />



        <div className="relative grid lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-12 text-cream">

          <div className="lg:col-span-7">

            <span className="chip-on-dark">{home.ctaBadge}</span>

            <h2 className="display-h2 text-cream mt-4 text-balance">

              {home.ctaTitle}{' '}

              <span className="text-primary-light">{home.ctaHighlight}</span>
            </h2>

            <p className="lead-on-dark mt-4 max-w-lg">{home.ctaSubtitle}</p>



            <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-2.5">

              <MotionButton to="/appointment" className="btn-white group font-semibold w-full sm:w-auto justify-center">

                <Calendar size={15} /> Book a consultation

                <MotionArrow><ArrowUpRight size={15} /></MotionArrow>

              </MotionButton>

              <MotionButton href={waLink} className="btn-whatsapp w-full sm:w-auto justify-center" target="_blank" rel="noopener noreferrer">

                <WhatsAppIcon className="w-4 h-4" /> WhatsApp

              </MotionButton>

              {phone && (

                <a href={`tel:${phone}`} className="btn-ghost text-cream/85 hover:bg-white/10 w-full sm:w-auto justify-center">

                  <Phone size={14} /> {phone}

                </a>

              )}

            </div>



            {home.ctaChecklist?.length > 0 && (

              <ul className="mt-8 grid sm:grid-cols-2 gap-2">

                {home.ctaChecklist.map((item) => (

                  <li key={item} className="flex items-center gap-2 text-sm text-on-dark-muted">

                    <CheckCircle2 size={14} className="text-primary-light shrink-0" />

                    {item}

                  </li>

                ))}

              </ul>

            )}

          </div>



          <motion.div
            className="lg:col-span-5 section-panel p-5 sm:p-6 bg-surface/95 text-ink self-center min-w-0 overflow-hidden"
            initial={reduced ? false : 'hidden'}

            whileInView={reduced ? undefined : 'visible'}

            viewport={{ once: true }}

            variants={stagger(0.08, 0.1)}

          >

            <SectionStagger className="grid grid-cols-2 gap-x-3 gap-y-4 min-w-0" gap={0.08}>
              {metrics.filter((m) => m?.label || m?.value).map((item, i) => (
                <SectionStaggerItem key={i} variant="scale" className="min-w-0">
                  <div className="border-b border-line-fine pb-3 min-w-0">
                    <div className="label-meta truncate">{item.label}</div>
                    <div className="font-display text-base sm:text-lg xl:text-xl text-primary mt-1 leading-snug break-words">
                      {item.value}
                    </div>
                  </div>
                </SectionStaggerItem>
              ))}
            </SectionStagger>

            {miniNote && (

              <p className="mt-4 text-xs text-muted flex items-start gap-2">

                <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />

                {miniNote}

              </p>

            )}

          </motion.div>

        </div>

      </motion.div>

    </SectionShell>

  );

}


