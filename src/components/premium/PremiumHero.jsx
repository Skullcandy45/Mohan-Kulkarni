import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  Award,
  CheckCircle2,
  Microscope,
} from 'lucide-react';
import DoctorCard from './DoctorCard';

export default function PremiumHero() {
  const specialties = [
    'Immediate Load Implants',
    'Digital Smile Design (DSD)',
    'Invisalign® Diamond Tier',
    'Zeiss Single-Visit RCT',
    'Pain-Free Wand Anesthesia',
  ];

  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#F2F7F7] via-[#F8FBFA] to-[#F4F6F5]">
      {/* Ambient Clinical Lighting Meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft teal surgical glow */}
        <div className="absolute top-10 right-10 w-[550px] h-[550px] rounded-full bg-[#0B3A3E]/8 blur-[140px]" />
        {/* Warm champagne luxury glow */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#C5A880]/12 blur-[130px]" />
        {/* Crisp grid lines */}
        <div className="absolute inset-0 bg-grid-soft opacity-[0.35]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Authority & Headline Copy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2.5 bg-white/90 border border-[#0B3A3E]/15 px-4 py-2 rounded-full shadow-sm mb-6 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-[#072428]">
                47+ Years of Practice · Santacruz West, Mumbai
              </span>
            </div>

            {/* Display Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Trusted Dental Care
              <br />
              <span className="text-[#0B3A3E]">for Over Four Decades.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed mb-8">
              Dr. Mohan K. Kulkarni has been providing comprehensive dental care in Santacruz West, Mumbai since 1977. From routine check-ups to advanced implants and smile makeovers — experienced, gentle, and thorough.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center gap-2.5 bg-[#072428] hover:bg-[#0B3A3E] text-white font-semibold text-sm px-8 py-4 rounded-2xl shadow-lg shadow-[#072428]/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                <Calendar size={17} className="text-[#C5A880]" />
                <span>Book a Consultation</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Specialty Badges */}
            <div className="w-full pt-6 border-t border-[#0B3A3E]/10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3A3E]/70 block mb-3">
                Signature Specialty Focus:
              </span>
              <div className="flex flex-wrap gap-2">
                {specialties.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 text-slate-800 border border-slate-200/80 shadow-xs hover:border-[#0B3A3E]/30 transition-colors"
                  >
                    <CheckCircle2 size={12} className="text-[#0B3A3E]" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Clinical Accreditations Ribbon */}
            <div className="flex items-center gap-4 mt-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Award size={13} className="text-[#C5A880]" />
                <span>BDS (1975, Govt Dental Mumbai)</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Microscope size={13} className="text-[#0B3A3E]" />
                <span>Past President, IDA Mumbai</span>
              </span>
              <span>•</span>
              <span>Est. 1977</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Animated Doctor Profile Card (5 cols) */}
          <div className="lg:col-span-5 relative w-full py-6 lg:py-0">
            <DoctorCard />
          </div>
        </div>
      </div>
    </section>
  );
}
