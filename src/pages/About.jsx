import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Certificate, 
  CheckCircle, 
  CalendarCheck, 
  GraduationCap, 
  Hospital, 
  ShieldCheck, 
  Cpu, 
  BookOpen, 
  Heartbeat, 
  ArrowRight, 
  WhatsappLogo, 
  Star 
} from '@phosphor-icons/react';
import { siteConfig } from '../content/site';

export default function About() {
  const { doctor } = siteConfig;

  const careerMilestones = [
    {
      year: 'Leadership',
      title: 'Past President, Indian Dental Association (IDA) Mumbai',
      institution: 'Indian Dental Association (IDA)',
      details: 'Led continuing medical education symposiums, advanced infection control protocols, and community dental health outreach across Mumbai.',
    },
    {
      year: 'Fellowship',
      title: 'Fellow of the International Congress of Oral Implantologists (FICOI)',
      institution: 'International Congress of Oral Implantologists (ICOI)',
      details: 'Advanced surgical certifications in immediate implant placement, bone grafting techniques, and prosthetic rehabilitation.',
    },
    {
      year: 'Establishment',
      title: 'Private Clinical Chambers Founded in Santacruz West',
      institution: 'Chambers of Dr. Mohan Kulkarni (Est. 1977)',
      details: 'Over 47 years of continuous clinical practice at Saraswat Colony, Santacruz West, serving three generations of patient families.',
    },
    {
      year: 'Graduation',
      title: 'Bachelor of Dental Surgery (BDS, 1975)',
      institution: 'Government Dental College & Hospital (GDC), Mumbai',
      details: 'Distinguished academic foundation in oral surgery, conservative dentistry, periodontics, and prosthodontics.',
    },
  ];

  const surgicalPillars = [
    {
      title: 'Biological Tooth Preservation',
      badge: 'Minimally Invasive Dentistry',
      desc: 'Preserving maximum natural enamel and dentinal structure using micro-abrasion, direct adhesive bonding, and partial ceramic onlays.',
      image: '/assets/images/dental_surgery_theater.jpg',
      icon: Heartbeat,
    },
    {
      title: 'Microscopic Optical Guidance',
      badge: '20× Optical Precision',
      desc: 'Employing high-power dental magnification to illuminate accessory canals, marginal micro-gaps, and subtle fracture lines.',
      image: '/assets/images/dental_institute.jpg',
      icon: Cpu,
    },
    {
      title: 'Painless Computerized Wand Care',
      badge: 'Zero-Sting Anesthesia',
      desc: 'Replacing traditional syringe anxiety with flow-rate controlled single-tooth numbing that eliminates lip and facial collateral numbness.',
      image: '/assets/images/chambers_appointment_interior.jpg',
      icon: ShieldCheck,
    },
  ];

  const whatsappUrl = `https://wa.me/${siteConfig.contact.phoneRaw.replace('+', '')}?text=${encodeURIComponent("Hello Dr. Mohan Kulkarni's clinical team, I would like to inquire about a consultation.")}`;

  return (
    <div className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-bronze-600 transition-colors"
        >
          <ArrowLeft size={14} weight="bold" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Header Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
        
        {/* Left Column: Doctor Portrait with Vignette & Badges (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden border border-alabaster-200 bg-cypress-950 shadow-card aspect-[4/5] relative group">
            <img
              src={doctor.image}
              alt={`${doctor.name} — ${doctor.title}`}
              className="w-full h-full object-cover object-top brightness-95 group-hover:scale-105 transition-transform duration-700 ease-emil"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cypress-950/85 via-transparent to-transparent pointer-events-none" />
            
            {/* Overlay Qualifications Pill */}
            <div className="absolute bottom-5 left-5 right-5 bg-cypress-950/90 backdrop-blur-md text-alabaster-50 p-4 rounded-2xl border border-cypress-800">
              <span className="text-[10px] uppercase tracking-wider text-bronze-400 font-bold block mb-0.5">
                CLINICAL CREDENTIALS
              </span>
              <p className="text-xs text-alabaster-100 font-medium leading-snug">
                {doctor.credentials}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Philosophy (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="eyebrow text-slate-600 mb-3">
            <span>CHIEF DENTAL SURGEON &amp; IMPLANTOLOGIST</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-cypress-950 tracking-tight leading-tight mb-6">
            Four Decades of Clinical Mastery in <span className="italic font-normal text-bronze-600">Advanced Dentistry.</span>
          </h1>

          <p className="text-base text-slate-600 leading-relaxed mb-4">
            {doctor.bio}
          </p>

          <p className="text-sm text-slate-600 leading-relaxed mb-8">
            Practicing at private consultation chambers in Santacruz West, Mumbai since 1977, Dr. Mohan Kulkarni provides unhurried, evidence-led dental care. Every clinical decision centers on tooth conservation, zero-anxiety procedures, and lasting biological smile harmony.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-8 pt-6 border-t border-alabaster-200">
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold text-cypress-950 tracking-tight block">
                47+ Yrs
              </span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Clinical Mastery
              </span>
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold text-cypress-950 tracking-tight block">
                1,800+
              </span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Implants &amp; Makeovers
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display text-2xl sm:text-3xl font-bold text-cypress-950 tracking-tight">
                  4.98 / 5
                </span>
                <Star size={18} weight="fill" className="text-amber-500 mb-1" />
              </div>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                1,800+ Reviews
              </span>
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold text-cypress-950 tracking-tight block">
                100%
              </span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Tooth Preservation
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/contact#book-appointment"
              className="pill-button bg-bronze-600 hover:bg-[#864c31] text-alabaster-50 text-xs font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <CalendarCheck size={16} weight="bold" />
              <span>Consult Dr. Mohan Kulkarni</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button bg-[#25D366] hover:bg-[#20ba59] text-cypress-950 text-xs font-bold px-6 py-3.5 rounded-full inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <WhatsappLogo size={16} weight="fill" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Surgeon In-Operatory Feature */}
      <div className="rounded-3xl overflow-hidden border border-alabaster-200 bg-cypress-950 text-alabaster-50 mb-20 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 aspect-video w-full overflow-hidden bg-cypress-900">
          <img
            src="/assets/images/dental_surgery_theater.jpg"
            alt="Advanced dental operatory with precision operating microscope"
            className="w-full h-full object-cover object-center brightness-95"
          />
        </div>
        <div className="lg:col-span-5 p-8 sm:p-12">
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-bronze-400 block mb-2">
            CLINICAL EXCELLENCE IN CHAIR
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-alabaster-50 tracking-tight mb-4">
            Sub-Millimeter Optical Precision in Micro-Dentistry
          </h2>
          <p className="text-xs sm:text-sm text-alabaster-100/80 leading-relaxed mb-6">
            With high-power dental magnification and computerized painless anesthesia, Dr. Mohan Kulkarni performs complex root canals, implant placements, and veneer preparations with extraordinary precision and total patient comfort.
          </p>
          <div className="flex items-center gap-4 text-xs text-bronze-400 font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle size={16} weight="fill" />
              Painless Wand Anesthesia
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle size={16} weight="fill" />
              20× Optical Magnification
            </span>
          </div>
        </div>
      </div>

      {/* Surgical Pillars */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow text-slate-600 mb-2 justify-center">
            <span>CLINICAL PHILOSOPHY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cypress-950 tracking-tight">
            The Three Tenets of Care
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {surgicalPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-alabaster-200 rounded-3xl overflow-hidden shadow-card hover:border-bronze-600 transition-all duration-300 flex flex-col group"
              >
                <div className="aspect-[16/10] w-full overflow-hidden relative bg-cypress-950">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700 ease-emil"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold tracking-eyebrow uppercase px-3 py-1 rounded-full bg-cypress-950/90 text-alabaster-50 border border-cypress-800 backdrop-blur-md">
                      {p.badge}
                    </span>
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-alabaster-100 flex items-center justify-center text-cypress-950 mb-4 group-hover:bg-bronze-600 group-hover:text-alabaster-50 transition-colors">
                      <Icon size={20} weight="bold" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-cypress-950 tracking-tight mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Career Milestones Timeline */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow text-slate-600 mb-2 justify-center">
            <span>EXPERIENCE &amp; QUALIFICATIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cypress-950 tracking-tight">
            Academic &amp; Leadership Milestones
          </h2>
        </div>

        <div className="bg-white border border-alabaster-200 rounded-3xl p-8 sm:p-12 shadow-card">
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-32 before:h-full before:w-0.5 before:bg-alabaster-200">
            {careerMilestones.map((m, idx) => (
              <div key={idx} className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12">
                <div className="sm:w-28 shrink-0 text-left sm:text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-bronze-600">
                    {m.year}
                  </span>
                </div>
                <div className="w-3 h-3 rounded-full bg-cypress-950 border-2 border-alabaster-50 relative z-10 shrink-0 mt-1.5 hidden sm:block" />
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-cypress-950 tracking-tight">
                    {m.title}
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 block mb-2">
                    {m.institution}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Consultation Strip */}
      <div className="rounded-3xl bg-cypress-950 text-alabaster-50 p-8 sm:p-12 border border-cypress-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-bronze-400 block mb-1">
            EST. 1977 · SANTACRUZ WEST
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-alabaster-50 tracking-tight mb-2">
            Schedule a Consultation with Dr. Mohan Kulkarni
          </h3>
          <p className="text-xs text-alabaster-100/80 max-w-xl">
            Experience unhurried dental care with 47+ years of surgical mastery. Receive a transparent treatment plan and complete diagnostic clarity.
          </p>
        </div>

        <a
          href="/contact#book-appointment"
          className="pill-button bg-bronze-600 hover:bg-[#864c31] text-alabaster-50 text-xs font-bold px-8 py-3.5 rounded-full inline-flex items-center gap-2 shrink-0 shadow-sm transition-all"
        >
          <CalendarCheck size={16} weight="bold" />
          <span>Book Appointment</span>
        </a>
      </div>
    </div>
  );
}
