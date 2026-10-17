import React from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { ArrowUpRight, Calendar, MessageSquare, Wrench, CheckCircle2 } from 'lucide-react';

import { siteConfig } from '../../config/siteConfig';

import SectionHeader from '../SectionHeader';

import SectionShell from './SectionShell';

import MotionButton, { MotionArrow } from '../motion/MotionButton';

import { ease } from '../../lib/motion';



const stepIcons = [Calendar, MessageSquare, Wrench, CheckCircle2];



/** Step cards with connector — distinct from service_2 interactive tab timeline */

export default function ProcessSection() {

  const reduced = useReducedMotion();

  const home = siteConfig.content.home;

  const steps = siteConfig.process || [];



  return (

    <SectionShell variant="default">

      <SectionHeader

        badge={home.processBadge}

        title={home.processTitle}

        highlight={home.processHighlight}

        description={home.processSubtitle}

      />



      <div className="relative hidden lg:block">

        <div className="process-connector" aria-hidden />

        <div className="relative z-[1] grid grid-cols-4 gap-4">

          {steps.map((step, i) => {

            const Icon = stepIcons[i] || Calendar;

            return (

              <motion.div

                key={step.step}

                initial={reduced ? false : { opacity: 0, y: 16 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{ delay: i * 0.08, duration: 0.45, ease: ease.editorial }}

                whileHover={reduced ? undefined : { y: -4 }}

                className="card-premium p-5 text-center"

              >

                <div className="w-11 h-11 mx-auto rounded-full bg-primary text-cream grid place-items-center mb-4 relative z-[2]">

                  <Icon size={18} />

                </div>

                <span className="label-meta text-primary">{String(step.step).padStart(2, '0')}</span>

                <h3 className="font-display text-lg text-ink mt-2 mb-2">{step.title}</h3>

                <p className="text-sm text-muted leading-snug">{step.desc}</p>

              </motion.div>

            );

          })}

        </div>

      </div>



      <div className="lg:hidden grid gap-3">

        {steps.map((step, i) => {

          const Icon = stepIcons[i] || Calendar;

          return (

            <motion.div

              key={step.step}

              initial={reduced ? false : { opacity: 0, x: -12 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true }}

              transition={{ delay: i * 0.06, duration: 0.38 }}

              className="card-premium p-4 flex gap-4 items-start"

            >

              <div className="w-10 h-10 shrink-0 rounded-full bg-primary-soft text-primary grid place-items-center">

                <Icon size={16} />

              </div>

              <div className="min-w-0">

                <span className="label-meta text-primary">{String(step.step).padStart(2, '0')}</span>

                <h3 className="font-display text-lg text-ink mt-0.5">{step.title}</h3>

                <p className="text-sm text-muted mt-1">{step.desc}</p>

              </div>

            </motion.div>

          );

        })}

      </div>



      <div className="mt-8 flex justify-center sm:justify-start">

        <MotionButton to="/appointment" className="btn-primary group w-full sm:w-auto justify-center">

          Schedule a consultation

          <MotionArrow><ArrowUpRight size={16} /></MotionArrow>

        </MotionButton>

      </div>

    </SectionShell>

  );

}


