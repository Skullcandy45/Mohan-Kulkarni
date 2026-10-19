import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Phone,
  MessageCircle,
  ExternalLink,
  Award,
  Building2,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  ArrowUpRight,
  ImageIcon,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import PremiumRadialButton from './PremiumRadialButton';

const AI_HOSPITAL_IMAGES = [
  {
    id: 'reception',
    name: 'Hospital Reception & Suite',
    url: '/images/dr-mohan-kulkarni-hospital-ai.jpg',
    tag: 'AI-Enhanced Architectural Concept · Dental Solutions Santacruz',
  },
  {
    id: 'operatory',
    name: 'Surgical Operatory Suite',
    url: '/images/dr-mohan-kulkarni-operatory-ai.jpg',
    tag: 'AI-Enhanced Surgical Operatory · Dr. Mohan Kulkarni',
  },
];

const SERVICE_PILLS = [
  'Dental Implants',
  'Painless Root Canal',
  'Crown & Bridge',
  'Cosmetic Veneers',
  'Orthodontics & Aligners',
  'Full Mouth Rehabilitation',
];

export default function PremiumHero() {
  const [selectedBg, setSelectedBg] = useState(AI_HOSPITAL_IMAGES[0]);
  const home = siteConfig.content.home;
  const p = home.premium || {};

  return (
    <section className="relative overflow-hidden bg-[#0A1818]">
      {/* Full-bleed Hero Container with AI-Edited Hospital Background */}
      <div className="relative min-h-[min(94vh,940px)] flex flex-col justify-between overflow-hidden">
        {/* AI-Generated Luxury Hospital Backdrop */}
        <div className="absolute inset-0">
          <img
            key={selectedBg.id}
            src={selectedBg.url}
            alt={selectedBg.name}
            className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.08] saturate-[1.05] transition-all duration-1000 transform scale-100 animate-fade-in"
          />
        </div>

        {/* Cinematic multi-tier gradients & glass overlays */}
        <div className="absolute inset-0 z-[1] bg-[#0A1818]/45" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0A1818] via-[#0A1818]/40 to-[#0A1818]/30" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0A1818]/60 via-transparent to-[#0A1818]/60" />

        {/* Ambient warm radial glows */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-amber-400/12 rounded-full blur-[150px] pointer-events-none z-[2]"
          aria-hidden
        />
        <div
          className="absolute bottom-10 right-1/4 w-[420px] h-[360px] bg-[#4F7F7F]/20 rounded-full blur-[130px] pointer-events-none z-[2]"
          aria-hidden
        />

        {/* Central Content Area (Similar to Raunak Kulkarni's hero architecture, customized for Dr. Mohan) */}
        <div className="relative z-10 flex-1 shell flex items-center justify-center pt-24 sm:pt-28 lg:pt-28 pb-4 lg:pb-6">
          <div className="w-full max-w-4xl mx-auto text-center rounded-[1.75rem] sm:rounded-[2.25rem] px-5 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-8 bg-white/10 backdrop-blur-2xl border border-amber-200/35 shadow-[0_28px_90px_-24px_rgba(0,0,0,0.65)] relative overflow-hidden">
            {/* Top gold ambient line accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />

            {/* Live Status Pill with pulsing green beacon */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-amber-300/40 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-medium tracking-wide text-amber-100 font-mono">
                Santacruz West, Mumbai • Est. 1977 • 47+ Years Clinical Mastery
              </span>
            </div>

            {/* Clinic Eyebrow */}
            <p className="mt-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/90 font-mono">
              Dr. Mohan Kulkarni’s Dental Solutions
            </p>

            {/* Grand Headline with Editorial Styling */}
            <h1 className="mt-2.5 font-bold tracking-tight uppercase text-white drop-shadow-sm text-2xl sm:text-3xl lg:text-[2.65rem] leading-[1.15]">
              Gentle, Masterful Dentistry.
              <span className="block mt-1 normal-case font-display italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-emerald-200">
                Santacruz West Since 1977.
              </span>
            </h1>

            {/* Subtitle Bio */}
            <p className="mt-3 text-xs sm:text-sm lg:text-[15px] text-white/90 leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Led by <strong className="text-white font-semibold">Dr. Mohan K. Kulkarni</strong> (BDS 1975, Govt Dental College Mumbai) — Past President of IDA Mumbai and honorary on-panel surgeon for Larsen &amp; Toubro and ONGC. Over four decades of calm, unhurried chairside care, precision implants, and whole-family oral health.
            </p>

            {/* Action Buttons Row */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 text-[#0C1E1E] font-semibold text-xs sm:text-sm shadow-[0_12px_32px_rgba(212,175,55,0.4)] hover:shadow-[0_16px_40px_rgba(212,175,55,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                <span>Book Consultation</span>
                <ArrowUpRight size={15} className="stroke-[2.5]" />
              </Link>

              <a
                href="https://wa.me/919820045890?text=Hello%20Dr.%20Mohan%20Kulkarni,%20I%20would%20like%20to%20book%20a%20dental%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/12 hover:bg-white/22 border border-white/25 text-white font-medium text-xs sm:text-sm backdrop-blur-md transition-all hover:scale-[1.02]"
              >
                <MessageCircle size={16} className="text-emerald-400" />
                <span>WhatsApp Clinic</span>
              </a>

              <a
                href="tel:+919820045890"
                className="inline-flex items-center gap-1.5 text-xs text-white/75 hover:text-amber-200 transition-colors py-1.5 px-1"
              >
                <Phone size={13} className="text-amber-300" />
                <span>022 2649 0333 / +91 98200 45890</span>
              </a>
            </div>

            {/* Radial Pill Buttons (Raunak Kulkarni's signature interaction, personalized for Dr. Mohan) */}
            <div className="mt-5 pt-4 border-t border-white/15">
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-amber-200/70 font-mono mb-2">
                Key Dental Treatments:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SERVICE_PILLS.map((label) => (
                  <PremiumRadialButton
                    key={label}
                    to="/services"
                    label={label}
                    variant="glass"
                    size="sm"
                  />
                ))}
              </div>
            </div>

            {/* Verified Patient Trust & Directories (From Image 1 Google, Practo, Justdial) */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              <a
                href="https://share.google/JoKMfk8YZI6MwJktu"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/12 border border-white/15 text-xs text-white/90 hover:text-white transition-all"
                title="Google Maps verified rating"
              >
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star size={13} className="fill-amber-300" />
                  4.5
                </span>
                <span className="text-white/70 group-hover:text-white">Google Maps · Santacruz</span>
                <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
              </a>

              <a
                href="https://www.practo.com/mumbai/doctor/dr-mohan-k-kulkarni-dentist"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/12 border border-white/15 text-xs text-white/90 hover:text-white transition-all"
                title="Practo verified doctor"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-white/70 group-hover:text-white">Practo Verified Doctor</span>
                <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
              </a>

              <a
                href="https://www.justdial.com/Mumbai/Dr-Mohan-Kulkarni-Dental-Solutions-Next-To-Gokul-Ice-Cream-Santacruz-West/022PXX22-XX22-170113021907-F1A1_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/12 border border-white/15 text-xs text-white/90 hover:text-white transition-all"
                title="Justdial listing"
              >
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-white/70 group-hover:text-white">Justdial · Next to Gokul Ice Cream</span>
                <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Institutional Credentials & AI View Switcher */}
        <div className="relative z-10 shell pb-6 pt-2">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 border-t border-white/15 pt-4">
            {/* 5 Institutional Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-white/75 font-mono">
              <span className="inline-flex items-center gap-1.5">
                <Award size={14} className="text-amber-300" />
                <span>IDA Mumbai Past President</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 size={14} className="text-emerald-300" />
                <span>Govt Dental College BDS 1975</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-blue-300" />
                <span>L&amp;T &amp; ONGC Panel Dentist</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Stethoscope size={14} className="text-purple-300" />
                <span>MSDC Reg. A-1939</span>
              </span>
            </div>

            {/* AI Hospital View Switcher */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md">
              <span className="px-2 text-[11px] font-mono text-amber-200/70 hidden sm:inline-flex items-center gap-1">
                <ImageIcon size={12} />
                <span>AI Hospital View:</span>
              </span>
              {AI_HOSPITAL_IMAGES.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedBg(img)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedBg.id === img.id
                      ? 'bg-amber-300 text-[#0C1E1E] font-semibold shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {img.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
