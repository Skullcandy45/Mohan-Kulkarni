import React, { useState, useEffect } from 'react';

import { siteConfig } from '../config/siteConfig';

import { api } from '../lib/api';

import PremiumHomePage from './PremiumHomePage';



export default function HomePage() {

  const [team, setTeam] = useState(siteConfig.team || []);

  const [testimonials, setTestimonials] = useState(siteConfig.testimonials || []);



  useEffect(() => {

    Promise.all([

      api.doctors.getAll({ published: true }),

      api.testimonials.getAll({ published: true }),

    ])

      .then(([doctorsRes, testimonialsRes]) => {

        if (doctorsRes.success && Array.isArray(doctorsRes.data) && doctorsRes.data.length > 0) {

          setTeam(

            doctorsRes.data.map((m, i) => ({

              ...siteConfig.team?.[i],

              ...m,

              image: m.image || m.image_url || siteConfig.team?.[i]?.image,

            })),

          );

        }

        if (testimonialsRes.success && Array.isArray(testimonialsRes.data) && testimonialsRes.data.length > 0) {

          setTestimonials(testimonialsRes.data);

        }

      })

      .catch(() => {});

  }, []);



  return <PremiumHomePage team={team} testimonials={testimonials} />;

}

