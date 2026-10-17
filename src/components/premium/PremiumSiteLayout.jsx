import React from 'react';
import PremiumNav from './PremiumNav';
import PremiumBookingCta from './PremiumBookingCta';
import Footer from '../Footer';

export default function PremiumSiteLayout({ children, bookingCta = true }) {
  return (
    <div className="template-premium min-h-screen flex flex-col bg-[#F4F6F5] text-ink">
      <PremiumNav innerPage={true} />
      <main className="flex-1 pt-24 sm:pt-28">
        {children}
      </main>
      {bookingCta && <PremiumBookingCta />}
      <Footer />
    </div>
  );
}
