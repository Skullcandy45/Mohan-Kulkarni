import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { ArrowUpRight } from 'lucide-react';

import { siteConfig, buildWhatsAppLink } from '../../config/siteConfig';

import { useSettings } from '../../contexts/SettingsContext';

import ServiceCard from '../ServiceCard';

import SectionHeader from '../SectionHeader';

import SectionShell from './SectionShell';

import { SectionStagger, SectionStaggerItem } from '../motion/SectionStagger';



/** Equal 2×2 service grid — distinct from service_2 featured+row layout */

export default function ServicesSection({ services = [] }) {

  const navigate = useNavigate();

  const { settings } = useSettings();

  const home = siteConfig.content.home;

  if (!services.length) return null;



  const display = services.slice(0, 4);



  const handleWhatsApp = (svc) => {

    window.open(buildWhatsAppLink(`Hi — I'd like to enquire about ${svc.title}.`, settings), '_blank', 'noopener,noreferrer');

  };



  return (

    <SectionShell id="services" variant="alt">

      <SectionHeader

        badge={home.servicesBadge}

        title={home.servicesTitle}

        highlight={home.servicesHighlight}

        description={home.servicesSubtitle}

        action={(

          <Link to="/services" className="btn-outline group shrink-0 hidden sm:inline-flex">

            View all

            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />

          </Link>

        )}

      />



      <SectionStagger className="grid sm:grid-cols-2 gap-4 lg:gap-5" gap={0.06}>

        {display.map((s, i) => (

          <SectionStaggerItem key={s.id} variant="fadeUp">

            <ServiceCard
              service={s}
              index={i}
              variant="grid"
              noReveal
              onWhatsApp={() => handleWhatsApp(s)}
              onBook={() => navigate('/appointment')}
            />

          </SectionStaggerItem>

        ))}

      </SectionStagger>



      <div className="mt-6 sm:hidden">

        <Link to="/services" className="btn-outline w-full justify-center">

          View all services <ArrowUpRight size={14} />

        </Link>

      </div>

    </SectionShell>

  );

}


