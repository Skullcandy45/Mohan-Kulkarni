import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  Award,
  Star,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Building2,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

const MEDIA_VIEWS = [
  {
    id: 'doctor',
    label: 'Chief Surgeon',
    sublabel: 'Dr. Mohan K. Kulkarni',
    image: '/images/dr-mohan-kulkarni-hero.jpg',
    tag: 'BDS 1975 · Past President IDA Mumbai',
    caption: 'Dr. Mohan K. Kulkarni in clinical consultation at Santacruz West.',
  },
  {
    id: 'signboard',
    label: 'Clinic Signboard',
    sublabel: 'Saraswati Rd Storefront',
    image: '/images/clinic/clinic-operatory-1.jpg',
    tag: 'Authentic Santacruz West Clinic',
    caption: 'Official storefront signage: dentalSOLUTIONS · Mon–Sat 10am–1pm & 6pm–9pm.',
  },
  {
    id: 'operatory',
    label: 'Operatory Chair',
    sublabel: 'Sterile Surgical Setup',
    image: '/images/clinic/clinic-chair-setup.jpg',
    tag: 'Advanced Dental Infrastructure',
    caption: 'Ergonomic clinical operatory engineered for calm, pain-managed procedures.',
  },
];

export default function PremiumHero() {
  const [activeMedia, setActiveMedia] = useState(MEDIA_VIEWS[0]);
  const contact = siteConfig.site.contact || {};

  return (
    <section className="relative bg-[#0C1E1E] text-white overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-12 lg:pb-16 border-b border-amber-300/20">
      {/* Ambient background lighting */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#4F7F7F]/20 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-amber-400/10 rounded-full blur-[130px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        aria-hidden
      />

      <div className="shell relative z-10">
        {/* Top 2-Column Asymmetric Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Authoritative Editorial Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-amber-300/35 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-[13px] font-medium tracking-wide text-amber-100/90 font-mono">
                Santacruz West, Mumbai • Est. 1977 • 47+ Years Clinical Mastery
              </span>
            </div>

            {/* Clinic Eyebrow */}
            <p className="mt-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300/85 font-mono">
              Dr. Mohan Kulkarni’s Dental Solutions
            </p>

            {/* Hero Main Headline - Bespoke Typography */}
            <h1 className="mt-3 text-3xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-white leading-[1.12]">
              Gentle, Masterful Dentistry.
              <span className="block mt-1 font-display italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-200 to-teal-100">
                Santacruz West Since 1977.
              </span>
            </h1>

            {/* Credibility Bio / Narrative */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl font-sans font-light">
              Led by <strong className="text-white font-semibold">Dr. Mohan K. Kulkarni</strong> (BDS 1975, Govt Dental College Mumbai) — Past President of the Indian Dental Association (Mumbai) and trusted on-panel surgeon for Larsen &amp; Toubro and ONGC. Over four decades of calm, unhurried chairside care, precision dental implants, and whole-family oral health.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 text-[#0C1E1E] font-semibold text-sm sm:text-base shadow-[0_12px_32px_rgba(212,175,55,0.35)] hover:shadow-[0_16px_40px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Book Consultation</span>
                <ArrowUpRight size={18} className="stroke-[2.5]" />
              </Link>

              <a
                href="https://wa.me/919820045890?text=Hello%20Dr.%20Mohan%20Kulkarni,%20I%20would%20like%20to%20book%20a%20dental%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium text-sm sm:text-base backdrop-blur-md transition-all hover:scale-[1.02]"
              >
                <MessageCircle size={18} className="text-emerald-400" />
                <span>WhatsApp Clinic</span>
              </a>

              <a
                href="tel:+919820045890"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-amber-200 transition-colors py-2 px-1"
              >
                <Phone size={15} className="text-amber-300" />
                <span>022 2649 0333 / +91 98200 45890</span>
              </a>
            </div>

            {/* Verified Patient Trust & Directories (From Image 1 Google, Practo, Justdial) */}
            <div className="mt-8 pt-6 border-t border-white/10 w-full">
              <p className="text-xs uppercase tracking-wider text-white/50 font-mono mb-3">
                Verified Clinic Profiles &amp; Patient Reviews:
              </p>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href="https://share.google/JoKMfk8YZI6MwJktu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/12 border border-white/15 text-xs text-white/90 hover:text-white transition-all"
                  title="View Google Maps verified rating"
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
                  title="View Practo profile"
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
                  title="View Justdial listing"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-white/70 group-hover:text-white">Justdial · Next to Gokul Ice Cream</span>
                  <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
                </a>
              </div>
            </div>

            {/* Micro Metrics Strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full pt-4 border-t border-white/10">
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-amber-200">47+</p>
                <p className="text-xs text-white/60 mt-0.5">Years Practice (1977)</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300">4.5 ★</p>
                <p className="text-xs text-white/60 mt-0.5">Google &amp; Practo Rating</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-amber-200">40+</p>
                <p className="text-xs text-white/60 mt-0.5">Surgeons Mentored</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300">30k+</p>
                <p className="text-xs text-white/60 mt-0.5">Smiles Restored</p>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Layered Visual Showcase with Interactive Switcher */}
          <div className="lg:col-span-5 flex flex-col">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md mb-3 self-center sm:self-start w-full">
              {MEDIA_VIEWS.map((view) => {
                const isActive = activeMedia.id === view.id;
                return (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveMedia(view)}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-medium transition-all text-center ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-300 to-amber-200 text-[#0C1E1E] font-semibold shadow-md'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="block truncate">{view.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Visual Frame */}
            <div className="relative rounded-[2rem] overflow-hidden border-2 border-amber-300/40 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.85)] bg-[#122828] group">
              {/* Media image */}
              <div className="relative aspect-[4/4.6] w-full overflow-hidden">
                <img
                  key={activeMedia.id}
                  src={activeMedia.image}
                  alt={activeMedia.sublabel}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E1E] via-[#0C1E1E]/20 to-transparent pointer-events-none" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0C1E1E]/80 backdrop-blur-md border border-amber-300/40 text-[11px] font-mono text-amber-200 shadow-md">
                    <Award size={13} className="text-amber-300" />
                    <span>{activeMedia.tag}</span>
                  </span>
                  <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-mono text-white/80">
                    Santacruz (W)
                  </span>
                </div>

                {/* Floating Bottom Card: Clinic Address & Timings */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-[#0C1E1E]/85 backdrop-blur-md border border-white/15 text-left shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-amber-200 font-mono uppercase tracking-wider">
                        {activeMedia.sublabel}
                      </p>
                      <p className="text-xs text-white/80 mt-1 leading-relaxed">
                        {activeMedia.caption}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
                    <span className="inline-flex items-center gap-1.5 text-emerald-300">
                      <Clock size={12} />
                      <span>Mon–Sat: 10am–1pm &amp; 6pm–9pm</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-white/60">
                      <MapPin size={11} className="text-amber-300" />
                      <span>Next to Gokul Ice Cream</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Helper below card */}
            <p className="mt-2 text-[11px] text-center text-white/50 font-mono">
              #71-C, Ajay Apartments, Saraswati Road, Santacruz West, Mumbai 400054
            </p>
          </div>
        </div>

        {/* Bottom Institutional Pedigree Ribbon */}
        <div className="mt-12 pt-8 border-t border-white/15">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-amber-200/60 font-mono mb-5">
            Recognized Professional Pedigree &amp; Institutional Appointments
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-300/40 transition-colors">
              <span className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-300/30 grid place-items-center shrink-0 text-amber-200">
                <Award size={16} />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-white truncate">IDA Mumbai</p>
                <p className="text-[11px] text-white/60 truncate">Past President (2005–06)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-300/40 transition-colors">
              <span className="w-8 h-8 rounded-lg bg-emerald-400/15 border border-emerald-300/30 grid place-items-center shrink-0 text-emerald-200">
                <Building2 size={16} />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-white truncate">Govt. Dental College</p>
                <p className="text-[11px] text-white/60 truncate">BDS Class of 1975</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-300/40 transition-colors">
              <span className="w-8 h-8 rounded-lg bg-blue-400/15 border border-blue-300/30 grid place-items-center shrink-0 text-blue-200">
                <ShieldCheck size={16} />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-white truncate">L&amp;T &amp; ONGC</p>
                <p className="text-[11px] text-white/60 truncate">Honorary Panel Dentist</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-300/40 transition-colors">
              <span className="w-8 h-8 rounded-lg bg-purple-400/15 border border-purple-300/30 grid place-items-center shrink-0 text-purple-200">
                <Stethoscope size={16} />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-white truncate">MSDC Registered</p>
                <p className="text-[11px] text-white/60 truncate">Reg. No. A-1939 (1978)</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-300/40 transition-colors">
              <span className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-300/30 grid place-items-center shrink-0 text-amber-200">
                <Star size={16} className="fill-amber-300" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-white truncate">4.5 ★ Rating</p>
                <p className="text-[11px] text-white/60 truncate">Google &amp; Practo Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
