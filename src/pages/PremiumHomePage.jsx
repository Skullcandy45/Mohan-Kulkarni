import React from 'react';
import PremiumNav from '../components/premium/PremiumNav';
import PremiumHero from '../components/premium/PremiumHero';
import PremiumServices from '../components/premium/PremiumServices';
import PremiumCheckupBenefits from '../components/premium/PremiumCheckupBenefits';
import PremiumAbout from '../components/premium/PremiumAbout';
import PremiumStatsBar from '../components/premium/PremiumStatsBar';
import PremiumDiscountPlan from '../components/premium/PremiumDiscountPlan';
import PremiumTestimonials from '../components/premium/PremiumTestimonials';
import PremiumBookingCta from '../components/premium/PremiumBookingCta';
import Footer from '../components/Footer';

export default function PremiumHomePage({ team, testimonials }) {
  return (
    <main className="template-premium min-h-screen overflow-x-safe bg-[#F4F6F5] text-ink">
      <PremiumNav />
      <PremiumHero />
      <PremiumServices testimonials={testimonials} />
      <PremiumCheckupBenefits />
      <PremiumAbout team={team} />
      <PremiumStatsBar />
      <PremiumDiscountPlan />
      <PremiumTestimonials testimonials={testimonials} />
      <PremiumBookingCta />
      <Footer />
    </main>
  );
}
