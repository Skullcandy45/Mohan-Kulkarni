import React from 'react';

import { motion } from 'framer-motion';

import { BadgeCheck } from 'lucide-react';

import { siteConfig } from '../../config/siteConfig';

import SectionShell from './SectionShell';

import { useMotionSafe, motionProps, fadeUp, stagger } from '../../lib/motion';



/** Trust band — stats row + client logos (distinct from service_2 logo-left layout) */

export default function ProofStrip() {

  const reduced = useMotionSafe();

  const home = siteConfig.content.home;

  const logos = siteConfig.clientLogos || [];

  const stats = siteConfig.stats || [];

  const trustPoints = home.trustPoints || [];



  return (

    <SectionShell variant="alt" tight>

      <motion.div

        {...motionProps(reduced, fadeUp)}

        className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"

      >

        <div className="flex justify-center mb-3">
          <span className="eyebrow">{home.trustBadge}</span>
        </div>

        <h3 className="display-h3 text-ink mt-3 text-balance">

          {home.trustTitle}{' '}

          <span className="text-primary">{home.trustHighlight}</span>

        </h3>

      </motion.div>



      <motion.div

        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10"

        initial={reduced ? false : 'hidden'}

        whileInView={reduced ? undefined : 'visible'}

        viewport={{ once: true }}

        variants={stagger(0.06)}

      >

        {stats.slice(0, 4).map((s) => (

          <motion.div

            key={s.label}

            variants={fadeUp}

            className="card-premium p-4 sm:p-5 text-center"

          >

            <div className="font-display text-2xl sm:text-3xl text-primary tabular-nums leading-none">

              {s.value}

            </div>

            <div className="label-meta mt-2 normal-case tracking-normal">{s.label}</div>

          </motion.div>

        ))}

      </motion.div>



      {trustPoints.length > 0 && (

        <div className="flex flex-wrap justify-center gap-2 mb-8">

          {trustPoints.map((point) => (

            <span key={point} className="chip-emerald">

              <BadgeCheck size={11} aria-hidden />

              {point}

            </span>

          ))}

        </div>

      )}



      <motion.div

        className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3"

        initial={reduced ? false : 'hidden'}

        whileInView={reduced ? undefined : 'visible'}

        viewport={{ once: true }}

        variants={stagger(0.04)}

      >

        {logos.map((logo) => (

          <motion.div

            key={logo.name}

            variants={fadeUp}

            whileHover={reduced ? undefined : { y: -3 }}

            className="card-flat px-2 py-3 sm:py-4 text-center"

          >

            <div className="font-display text-base sm:text-lg text-ink">{logo.initials}</div>

            <div className="label-meta mt-1 leading-tight">{logo.name}</div>

          </motion.div>

        ))}

      </motion.div>

    </SectionShell>

  );

}


