import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useSettings } from '../../contexts/SettingsContext';
import { parseJsonArray } from '../../lib/contentFromSettings';
import SectionHeader from '../SectionHeader';
import FaqAccordion from '../FaqAccordion';
import SectionShell from './SectionShell';
import { easeEditorial } from '../../lib/motionPresets';

export default function FaqSection() {
  const { settings } = useSettings();
  const reduced = useReducedMotion();
  const home = siteConfig.content.home;
  const servicesContent = siteConfig.content?.servicesPage || {};
  const faq = parseJsonArray(
    settings?.services_faq_json,
    home.homeFaq?.length ? home.homeFaq : servicesContent.faq || [],
  );
  const [openIdx, setOpenIdx] = useState(0);

  const homeFaq = faq.slice(0, 3);
  if (!homeFaq.length) return null;

  return (
    <SectionShell variant="accent" tight motion="faq">
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            badge={home.faqBadge}
            title={home.faqTitle}
            highlight={home.faqHighlight}
            description={home.faqSubtitle}
            noMargin
          />
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: easeEditorial }}
            className="mt-6 p-4 border-l-2 border-primary bg-surface rounded-r-[var(--radius-sm)]"
          >
            <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
              Questions? We reply within hours.
            </p>
            <Link to="/contact" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
              Contact us <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="lg:col-span-8"
          initial={reduced ? false : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <FaqAccordion items={homeFaq} openIdx={openIdx} setOpenIdx={setOpenIdx} />
        </motion.div>
      </div>
    </SectionShell>
  );
}
