import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  CalendarCheck, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Eye, 
  Heartbeat, 
  Crosshair, 
  ArrowsClockwise, 
  FirstAid, 
  ChartLineUp, 
  Path, 
  SpeakerSimpleSlash, 
  Play, 
  Pause, 
  Clock, 
  WhatsappLogo, 
  Hospital, 
  CreditCard, 
  FileText, 
  Sparkle 
} from '@phosphor-icons/react';
import { siteConfig } from '../content/site';

const iconMap = {
  ShieldCheck,
  Heartbeat,
  Crosshair,
  ArrowsClockwise,
  Eye,
  FirstAid,
  ChartLineUp,
  Path,
  Sparkle,
};

const procedureImageMap = {
  'immediate-implants': {
    src: '/assets/images/dental_surgery_theater.jpg',
    alt: 'Immediate load dental implants placed with 3D surgical guidance',
    tag: 'Titanium & Zirconia Osseointegration',
  },
  'digital-smile-design': {
    src: '/assets/images/chambers_consultation.jpg',
    alt: '3D Digital smile simulation and facial harmony analysis',
    tag: 'Facially Driven Aesthetic Harmony',
  },
  'single-visit-rct': {
    src: '/assets/images/dental_institute.jpg',
    alt: 'Single-visit microscopic root canal under dental operating microscope',
    tag: '20� Zeiss Optical Magnification',
  },
  'clear-aligners': {
    src: '/assets/images/chambers_appointment_interior.jpg',
    alt: 'Invisible clear aligner orthodontic therapy',
    tag: 'Removable Discreet Orthodontics',
  },
  'full-mouth-rehab': {
    src: '/assets/images/dental_surgery_theater.jpg',
    alt: 'Full mouth neuromuscular rehabilitation for worn dentition',
    tag: 'TMJ & Occlusal Vertical Reconstruction',
  },
  'porcelain-veneers': {
    src: '/assets/images/chambers_consultation.jpg',
    alt: 'Ultra-thin E.max porcelain ceramic veneers',
    tag: 'Lithium Disilicate Ceramic Radiance',
  },
};

const procedureTelemetryMap = {
  'immediate-implants': {
    duration: '45�60 Mins Chair Time',
    setting: 'Santacruz West Operatory Suite',
    stay: 'Same-Day Return to Light Routine',
    coverage: 'Lifetime Osseointegration Assurance',
  },
  'digital-smile-design': {
    duration: '45 Mins Initial 3D Scan',
    setting: 'Digital Aesthetic Studio',
    stay: 'Zero Downtime (Previewable Mockup)',
    coverage: 'Facially Harmonic Proportions',
  },
  'single-visit-rct': {
    duration: '60 Mins Under Microscope',
    setting: 'Micro-Endodontic Operatory',
    stay: 'Immediate Relief of Acute Pain',
    coverage: 'Ultrasonic Canal Cleansing',
  },
  'clear-aligners': {
    duration: '30 Mins Digital Setup',
    setting: 'Orthodontic Consultation Suite',
    stay: 'Removable Trays (Zero Food Limits)',
    coverage: '3D Computer Staging',
  },
  'full-mouth-rehab': {
    duration: 'Structured Phased Delivery',
    setting: 'Prosthodontic & TMJ Center',
    stay: 'Comfortable Interim Temporaries',
    coverage: 'Neuromuscular Occlusal Stability',
  },
  'porcelain-veneers': {
    duration: '2 Comfortable Appointments',
    setting: 'Ceramic Restorative Studio',
    stay: 'Zero Social Downtime',
    coverage: 'E.max Lithium Disilicate Glaze',
  },
};

export default function Services() {
  const categories = siteConfig.categories || siteConfig.procedureCategories || [];
  const procedures = siteConfig.procedures || siteConfig.streamlinedProcedures || [];

  const [activeCategory, setActiveCategory] = useState('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const filteredProcedures = activeCategory === 'all'
    ? procedures
    : procedures.filter((p) => p.category === activeCategory);

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

      {/* Page Header */}
      <div className="max-w-3xl mb-12">
        <div className="eyebrow text-slate-600 mb-3">
          <span>CLINICAL PROCEDURES &amp; TREATMENTS</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-cypress-950 tracking-tight leading-tight mb-4">
          Precision Dentistry & Biological Preservation.
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Comprehensive restorative, aesthetic, and implant dentistry combining high-power optical magnification, 3D digital smile simulation, and painless computerized Wand anesthesia in Santacruz West, Mumbai. Every clinical pathway preserves lifelong oral function and radiant aesthetics.
        </p>
      </div>

      {/* Embedded Looping Video Showcase: Modern Dental Suite */}
      <div className="rounded-3xl overflow-hidden border border-cypress-800 bg-cypress-950 text-alabaster-50 p-6 sm:p-8 lg:p-10 mb-16 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Video Showcase (7 cols) */}
        <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-cypress-900 border border-cypress-800 group shadow-inner">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/images/dental_institute.jpg"
            className="w-full h-full object-cover"
            aria-label="Looping video of dental operatory and clinical suite"
          >
            <source src="/Videos/clinic-tour.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cypress-950/80 to-transparent pointer-events-none" />

          {/* Controls */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cypress-950/80 text-[10px] text-alabaster-100/80 backdrop-blur-sm border border-cypress-800">
              <SpeakerSimpleSlash size={12} weight="bold" />
              <span>MUTED</span>
            </span>
            <button
              onClick={toggleVideo}
              className="p-1.5 rounded-md bg-cypress-950/80 hover:bg-cypress-900 text-alabaster-50 backdrop-blur-sm border border-cypress-800 transition-colors"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause size={12} weight="bold" /> : <Play size={12} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Right Explanation (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-bronze-400 block mb-2">
              DIGITAL DIAGNOSTIC STUDIO
            </span>
            <h2 className="font-display text-2xl font-bold text-alabaster-50 tracking-tight mb-3">
              Pre-Operative 3D Digital Simulation &amp; Optical Scanning
            </h2>
            <p className="text-xs sm:text-sm text-alabaster-100/80 leading-relaxed mb-6">
              Prior to touching the tooth, 3D intraoral optical scans capture every contour down to fractions of a millimeter. This virtual digital model ensures micrometer-accurate margins, eliminating messy impression trays and ensuring maximum natural tooth preservation.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-cypress-800 text-xs text-alabaster-100">
            <div className="flex items-center justify-between">
              <span className="text-bronze-400 font-semibold">Optical Resolution:</span>
              <span>Sub-Millimeter 3D Scanning</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-bronze-400 font-semibold">Magnification:</span>
              <span>Up to 20� Operating Microscopy</span>
            </div>
          </div>
        </div>

      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar" role="tablist">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-semibold px-5 py-2.5 rounded-full shrink-0 transition-all duration-200 ease-emil ${
                isActive
                  ? 'bg-cypress-900 text-alabaster-50 shadow-sm'
                  : 'bg-alabaster-100 text-slate-600 hover:text-cypress-950 hover:bg-alabaster-200/60'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Detailed Procedure Cards */}
      <div className="space-y-10 mb-20">
        {filteredProcedures.map((proc, index) => {
          const Icon = iconMap[proc.icon] || ShieldCheck;
          const imgData = procedureImageMap[proc.id] || {
            src: '/assets/images/dental_surgery_theater.jpg',
            alt: proc.title,
            tag: 'Clinical Precision',
          };
          const telemetry = procedureTelemetryMap[proc.id] || {
            duration: '45�60 Mins Chair Time',
            setting: 'Santacruz West Operatory',
            stay: 'Same-Day Return to Routine',
            coverage: 'Biological Osseointegration Guarantee',
          };

          const phoneDigits = siteConfig.contact.phoneRaw ? siteConfig.contact.phoneRaw.replace('+', '') : '919820045890';
          const waUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
            `Hello Dr. Mohan Kulkarni's clinical team, I would like to inquire about the ${proc.title} procedure.`
          )}`;

          return (
            <div
              key={proc.id}
              id={proc.id}
              className="bg-white border border-alabaster-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card hover:border-bronze-600 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden group"
            >
              {/* Background Watermark Number */}
              <div 
                className="absolute top-2 right-4 sm:right-8 text-7xl sm:text-8xl lg:text-9xl font-display font-black text-slate-100 group-hover:text-bronze-100/50 transition-colors pointer-events-none select-none z-0 opacity-70"
                aria-hidden="true"
              >
                0{index + 1}
              </div>

              {/* Left Column: Procedure Content (7 cols on lg) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold tracking-eyebrow uppercase px-3 py-1 rounded-full bg-alabaster-100 text-bronze-600 border border-alabaster-200">
                      {proc.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Treatment 0{index + 1}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-cypress-950 tracking-tight mb-1">
                    {proc.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-bronze-600 mb-4">
                    {proc.subhead}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {proc.description}
                  </p>

                  {/* Telemetry Badges Strip */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-alabaster-100 border border-alabaster-200 text-[11px] font-semibold text-cypress-950">
                      <Clock size={13} className="text-bronze-600 shrink-0" />
                      <span>{telemetry.duration}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-alabaster-100 border border-alabaster-200 text-[11px] font-semibold text-cypress-950">
                      <Hospital size={13} className="text-bronze-600 shrink-0" />
                      <span>{telemetry.setting}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-semibold text-emerald-800">
                      <ShieldCheck size={13} weight="fill" className="text-emerald-600 shrink-0" />
                      <span>{telemetry.coverage}</span>
                    </span>
                  </div>

                  {/* Benchmarks Grid */}
                  <div className="mb-6 pt-5 border-t border-alabaster-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-cypress-950 block mb-3">
                      Key Clinical Benchmarks &amp; Advantages
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {proc.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 bg-alabaster-50 p-2.5 rounded-xl border border-alabaster-200 text-xs text-cypress-950 font-medium"
                        >
                          <Check size={14} weight="bold" className="text-bronze-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Indication & Recovery Box */}
                  <div className="bg-alabaster-100 rounded-2xl p-4 border border-alabaster-200 space-y-2 mb-6 text-xs text-slate-600">
                    <div>
                      <span className="font-bold text-cypress-950">Primary Indication: </span>
                      <span>{proc.indication}</span>
                    </div>
                    <div>
                      <span className="font-bold text-cypress-950">Recovery Profile: </span>
                      <span>{proc.recovery}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-alabaster-200">
                  <a
                    href="/contact#book-appointment"
                    className="pill-button bg-bronze-600 hover:bg-[#9E731C] text-alabaster-50 text-xs font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-sm transition-all"
                  >
                    <CalendarCheck size={16} weight="bold" />
                    <span>Consult Dr. Mohan Kulkarni</span>
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button bg-[#25D366] hover:bg-[#20ba59] text-cypress-950 text-xs font-bold px-5 py-3 rounded-full inline-flex items-center gap-1.5 transition-all"
                  >
                    <WhatsappLogo size={16} weight="fill" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Image with Pinned Badge (5 cols on lg) */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cypress-950 border border-alabaster-200 relative group shadow-md">
                  <img
                    src={imgData.src}
                    alt={imgData.alt}
                    className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700 ease-emil"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cypress-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-cypress-950/90 backdrop-blur-md rounded-xl p-3 border border-cypress-800 text-alabaster-50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-bronze-400 block mb-0.5">
                      CLINICAL VERIFICATION
                    </span>
                    <span className="text-xs font-semibold text-alabaster-50 block leading-tight">
                      {imgData.tag}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Bottom Emergency Triage Strip */}
      <div className="rounded-3xl bg-cypress-950 text-alabaster-50 p-8 sm:p-12 border border-cypress-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-bronze-400 block mb-1">
            RAPID CLINICAL TRIAGE � SANTACRUZ WEST
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-alabaster-50 tracking-tight mb-2">
            Have Questions About a Specific Dental Treatment?
          </h3>
          <p className="text-xs text-alabaster-100/80 max-w-xl">
            Our clinical coordinator and Dr. Mohan Kulkarni will review your dental concerns, previous X-rays, or pain history and provide straightforward guidance.
          </p>
        </div>

        <a
          href="/contact#book-appointment"
          className="pill-button bg-bronze-600 hover:bg-[#9E731C] text-alabaster-50 text-xs font-bold px-8 py-3.5 rounded-full inline-flex items-center gap-2 shrink-0 shadow-sm transition-all"
        >
          <CalendarCheck size={16} weight="bold" />
          <span>Book Consultation</span>
        </a>
      </div>
    </div>
  );
}
