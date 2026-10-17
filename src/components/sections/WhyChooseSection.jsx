import React from 'react';

import { Link } from 'react-router-dom';

import { motion, useReducedMotion } from 'framer-motion';

import { ShieldCheck, Clock, Cpu, HeartHandshake, ArrowUpRight } from 'lucide-react';

import { siteConfig, buildWhatsAppLink } from '../../config/siteConfig';

import { useSettings } from '../../contexts/SettingsContext';

import SectionHeader from '../SectionHeader';

import SectionShell from './SectionShell';

import WhatsAppIcon from '../WhatsAppIcon';

import { SectionStagger, SectionStaggerItem } from '../motion/SectionStagger';

import { ease } from '../../lib/motion';



const whyIconMap = {

  'shield-check': ShieldCheck,

  clock: Clock,

  cpu: Cpu,

  'heart-handshake': HeartHandshake,

};



/** Light 2×2 card grid — distinct from service_2 dark ink panel */

export default function WhyChooseSection() {

  const { settings } = useSettings();

  const reduced = useReducedMotion();

  const home = siteConfig.content.home;

  const items = siteConfig.whyChooseUs;

  const waLink = buildWhatsAppLink('', settings);

  const stats = siteConfig.stats?.[1];



  return (

    <SectionShell variant="accent">

      <div className="section-panel-warm p-5 sm:p-7 lg:p-8 rounded-[var(--radius-lg)]">

        <SectionStagger className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          <SectionStaggerItem variant="fadeUp" className="lg:col-span-4">

            <SectionHeader

              badge={home.whyBadge}

              title={home.whyTitle}

              highlight={home.whyHighlight}

              description={home.whySubtitle}

              compact

              noMargin

            />

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-6">

              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm w-full sm:w-auto justify-center min-h-[44px]">

                <WhatsAppIcon className="w-4 h-4" /> Speak with us

              </a>

              <Link to="/about" className="btn-outline text-sm w-full sm:w-auto justify-center min-h-[44px]">

                Our story <ArrowUpRight size={14} />

              </Link>

            </div>

            {stats && (

              <div className="mt-8 p-5 rounded-[var(--radius-md)] bg-surface border border-line-fine">

                <div className="font-display text-3xl text-primary tabular-nums">{stats.value}</div>

                <div className="text-sm text-muted mt-1">{stats.label}</div>

              </div>

            )}

          </SectionStaggerItem>



          <SectionStaggerItem variant="fadeUp" className="lg:col-span-8">

            <div className="grid sm:grid-cols-2 gap-4">

              {items.map((item, i) => {

                const Icon = whyIconMap[item.icon] || ShieldCheck;

                return (

                  <motion.div

                    key={i}

                    initial={reduced ? false : { opacity: 0, y: 14 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    viewport={{ once: true }}

                    transition={{ delay: i * 0.07, duration: 0.4, ease: ease.editorial }}

                    className="card-premium p-5 sm:p-6"

                  >

                    <div className="w-11 h-11 rounded-[var(--radius-md)] bg-primary-soft text-primary grid place-items-center mb-4">

                      <Icon size={20} />

                    </div>

                    <h3 className="font-display text-xl text-ink mb-2">{item.title}</h3>

                    <p className="text-sm sm:text-[15px] leading-relaxed text-text-light">{item.description}</p>

                  </motion.div>

                );

              })}

            </div>

          </SectionStaggerItem>

        </SectionStagger>

      </div>

    </SectionShell>

  );

}


