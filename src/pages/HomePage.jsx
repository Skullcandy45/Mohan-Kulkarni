import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  Award,
  ArrowRight,
  CheckCircle2,
  Phone,
  Play,
  RotateCw,
  Star,
  Users,
  Clock,
  Eye,
  Scan,
  Zap,
} from 'lucide-react';
import { siteData } from '../data/siteData';
import InteractiveToothCanvas from '../components/3d/InteractiveToothCanvas';
import Interactive3DCard from '../components/3d/Interactive3DCard';
import InteractiveSmileSimulator from '../components/3d/InteractiveSmileSimulator';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';

export default function HomePage() {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  return (
    <div className="min-h-screen subtle-mesh-bg overflow-x-hidden">
      {/* =========================================================================
          HERO SECTION: 3D Interactivity + Clinical Video Ambient Layer
      ========================================================================= */}
      <section className="relative pt-28 sm:pt-36 pb-20 lg:pb-28 overflow-hidden">
        {/* Background Ambient Video/Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            ref={videoRef}
            src="/Videos/dentist clinic video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20 filter blur-[2px] saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slateBg/90 via-slateBg/80 to-slateBg" />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-dent-400/20 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-gold-400/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 bg-white/90 border border-dent-500/25 px-4 py-2 rounded-full shadow-xs mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-dent-900 tracking-wide uppercase">
                  Dr. Mohan Kulkarni • 22+ Years Surgical Excellence
                </span>
              </div>

              {/* Display Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dent-950 tracking-tight leading-[1.1] mb-6">
                Next-Gen <span className="teal-gradient-text">3D Dentistry.</span> <br />
                Mastered for <span className="gold-gradient-text">Natural Smiles.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-dent-950/75 max-w-xl leading-relaxed mb-8">
                Pioneering microscopically guided implants, digital 3D smile architecture, and painless laser dentistry in Bandra West & South Mumbai. Zero guesswork, zero anxiety.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-dent-600 via-dent-700 to-dent-800 hover:from-dent-500 hover:to-dent-700 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-xl shadow-dent-700/25 transition-all hover:scale-[1.02] text-center"
                >
                  <Calendar size={18} className="text-gold-300" />
                  <span>Book VIP Consultation</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/smile-studio"
                  className="inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-dent-950 font-bold text-sm px-7 py-4 rounded-2xl border border-dent-300/80 shadow-glass transition-all hover:scale-[1.02] text-center"
                >
                  <Sparkles size={17} className="text-gold-500" />
                  <span>Interactive 3D Studio</span>
                </Link>
              </div>

              {/* Specialty Badges Carousel */}
              <div className="w-full pt-6 border-t border-dent-500/15">
                <span className="text-xs font-mono font-semibold uppercase text-dent-900/60 block mb-3">
                  Signature Specialty Focus:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Immediate Load Implants',
                    'Digital Smile Design (DSD)',
                    'Invisalign® Diamond Tier',
                    'Zeiss Single-Visit RCT',
                    'Pain-Free Wand Anesthesia',
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="text-xs bg-white/80 text-dent-900 px-3 py-1.5 rounded-lg border border-dent-200/80 shadow-xs font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive 3D Tooth Canvas Feature (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative">
                {/* Floating Certification Badge */}
                <div className="absolute -top-5 -left-5 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-gold-400/40 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center font-bold">
                    <Award size={22} className="text-gold-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-dent-950 block">FICOI (USA) Certified</span>
                    <span className="text-[11px] text-dent-600 block">Immediate Implant Specialist</span>
                  </div>
                </div>

                {/* 3D Model Card */}
                <InteractiveToothCanvas height="480px" initialMode="enamel" />

                {/* Floating Patient Satisfaction Badge */}
                <div className="absolute -bottom-5 -right-3 z-20 bg-dent-950/90 text-white backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-dent-500/30 hidden sm:flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-dent-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Patient" />
                    <img className="w-8 h-8 rounded-full border-2 border-dent-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Patient" />
                    <img className="w-8 h-8 rounded-full border-2 border-dent-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29329?auto=format&fit=crop&w=120&q=80" alt="Patient" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gold-400">
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold text-white ml-1">4.98</span>
                    </div>
                    <span className="text-[11px] text-dent-200">850+ Verified Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STATS STRIP
      ========================================================================= */}
      <section className="bg-dent-900 text-white py-10 border-y border-dent-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-dent-800">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold gold-gradient-text mb-1">22+</div>
              <div className="text-xs font-mono uppercase tracking-wider text-dent-200">Years Clinical Mastery</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">14,000+</div>
              <div className="text-xs font-mono uppercase tracking-wider text-dent-200">Smiles Restored</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">99.4%</div>
              <div className="text-xs font-mono uppercase tracking-wider text-dent-200">Implant Osseointegration</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-gold-400 mb-1">4.98 ★</div>
              <div className="text-xs font-mono uppercase tracking-wider text-dent-200">Patient Satisfaction Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE 3D VIRTUAL SMILE STUDIO SECTION
      ========================================================================= */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveSmileSimulator />
        </div>
      </section>

      {/* =========================================================================
          SIGNATURE CLINICAL PROCEDURES BENTO GRID (WITH 3D TILT CARDS)
      ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-3">
                Biomimetic & Minimally Invasive
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dent-950 tracking-tight">
                Specialized Treatments for <br /><span className="teal-gradient-text">Lifelong Oral Wellness</span>
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-dent-700 hover:text-dent-900 font-bold text-sm tracking-wide group"
            >
              <span>Explore All Procedures & Pricing</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.services.map((svc) => (
              <Interactive3DCard key={svc.id} className="h-full">
                <div className="h-full rounded-3xl bg-slateBg/80 border border-dent-500/15 p-7 flex flex-col justify-between shadow-glass hover:shadow-glass-hover transition-all group overflow-hidden relative">
                  {/* Subtle top gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dent-500 via-gold-400 to-dent-700 opacity-80" />

                  <div>
                    {/* Badge & Timing */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-bold uppercase tracking-wider bg-dent-100 text-dent-800 px-3 py-1 rounded-full">
                        {svc.badge}
                      </span>
                      <span className="text-xs text-dent-600 font-medium flex items-center gap-1">
                        <Clock size={12} /> {svc.duration}
                      </span>
                    </div>

                    {/* Image / Graphic */}
                    <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 relative bg-dent-950/10">
                      <img
                        src={svc.photo}
                        alt={svc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dent-950/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-gold-400" />
                        <span>Success: {svc.successRate}</span>
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-xl font-bold text-dent-950 mb-3 group-hover:text-dent-600 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-dent-950/70 leading-relaxed mb-6">
                      {svc.shortDesc}
                    </p>

                    {/* Key Bullet Features */}
                    <ul className="flex flex-col gap-2 mb-6">
                      {svc.features.slice(0, 3).map((f, idx) => (
                        <li key={idx} className="text-xs text-dent-800 flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-dent-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-dent-200/80 flex items-center justify-between mt-auto">
                    <span className="text-xs font-bold text-dent-900">{svc.pricing}</span>
                    <Link
                      to={`/services#${svc.slug}`}
                      className="text-xs font-bold text-dent-700 hover:text-dent-950 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Details</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </Interactive3DCard>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEFORE & AFTER SMILE TRANSFORMATION SHOWCASE
      ========================================================================= */}
      <section className="py-20 lg:py-28 subtle-mesh-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-3">
              Clinical Evidence of Mastery
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dent-950 tracking-tight mb-4">
              Real Patient <span className="gold-gradient-text">Smile Transformations</span>
            </h2>
            <p className="text-dent-950/70 text-base leading-relaxed">
              Drag the interactive slider to inspect before-and-after results crafted by Dr. Mohan Kulkarni. No filters, no digital airbrushing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Interactive Drag Slider */}
            <div>
              <BeforeAfterSlider
                beforeImage={siteData.caseStudies[0].beforeImg}
                afterImage={siteData.caseStudies[0].afterImg}
                beforeLabel="Before Veneers"
                afterLabel="After 10 E.max Veneers (BL2)"
                title="Case #1: Severe Fluorosis to Harmonious Hollywood Smile"
              />
            </div>

            {/* Case Details Narrative */}
            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-3xl bg-white border border-dent-500/15 shadow-glass">
                <span className="text-xs font-mono uppercase tracking-widest text-dent-600 font-bold block mb-2">
                  Featured Case Study
                </span>
                <h3 className="text-2xl font-bold text-dent-950 mb-3">
                  {siteData.caseStudies[0].title}
                </h3>
                <p className="text-sm text-dent-950/70 mb-5 leading-relaxed">
                  <strong>Patient Profile:</strong> {siteData.caseStudies[0].patient}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-dent-50/80 mb-6 text-xs">
                  <div>
                    <span className="text-dent-600 font-semibold block mb-1">Chief Complaint:</span>
                    <p className="text-dent-900">{siteData.caseStudies[0].concern}</p>
                  </div>
                  <div>
                    <span className="text-dent-600 font-semibold block mb-1">Treatment Performed:</span>
                    <p className="text-dent-900">{siteData.caseStudies[0].solution}</p>
                  </div>
                </div>

                <blockquote className="border-l-4 border-gold-400 pl-4 py-1 italic text-sm text-dent-900 mb-6">
                  "{siteData.caseStudies[0].quote}"
                </blockquote>

                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 bg-dent-600 hover:bg-dent-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>View All 24+ Smile Case Studies</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ADVANCED 3D DENTAL TECHNOLOGY
      ========================================================================= */}
      <section className="py-20 lg:py-24 bg-dent-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400 block mb-3">
              Next-Generation Dental Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Hospital-Grade 3D Diagnostics & Painless Robotics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.technology.map((tech, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-dent-400/40 transition-all hover:bg-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-dent-500/20 text-dent-300 flex items-center justify-center font-bold mb-5 border border-dent-400/30">
                    {idx === 0 && <Scan size={22} />}
                    {idx === 1 && <RotateCw size={22} />}
                    {idx === 2 && <Eye size={22} />}
                    {idx === 3 && <Zap size={22} />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
                  <p className="text-xs text-dent-200/70 leading-relaxed mb-4">{tech.desc}</p>
                </div>
                <div className="pt-3 border-t border-white/10 text-xs font-semibold text-gold-300 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>{tech.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          VERIFIED PATIENT REVIEWS
      ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-3">
              Patient Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dent-950 tracking-tight mb-4">
              Trusted by 14,000+ Happy Smiles
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-bold text-dent-900">4.98 out of 5 stars from 850+ Google reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.testimonials.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-3xl bg-slateBg/70 border border-dent-500/15 flex flex-col justify-between shadow-xs hover:shadow-glass transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-gold-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-dent-600 bg-dent-100/80 px-2.5 py-0.5 rounded-full">
                      {t.treatment}
                    </span>
                  </div>
                  <p className="text-sm text-dent-900/80 leading-relaxed italic mb-6">
                    "{t.review}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-dent-200/80">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-dent-300" />
                  <div>
                    <h4 className="text-sm font-bold text-dent-950">{t.name}</h4>
                    <span className="text-xs text-dent-600">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL VIP BOOKING CTA
      ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-dent-800 via-dent-700 to-dent-900 text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-300 block mb-2">
              Ready for a Painless Dental Experience?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Schedule Your Priority 3D Consultation with Dr. Mohan Kulkarni
            </h2>
            <p className="text-dent-100/80 text-sm sm:text-base leading-relaxed">
              Experience the tranquility of our luxury Bandra West & South Mumbai studios. Same-day emergency appointments preserved daily.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              to="/appointment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-dent-950 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-xl shadow-gold-500/20 transition-all hover:scale-105"
            >
              <Calendar size={17} />
              <span>Book Appointment</span>
            </Link>
            <a
              href={`tel:${siteData.contact.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-7 py-4 rounded-xl border border-white/20 transition-all text-center"
            >
              <Phone size={16} />
              <span>{siteData.contact.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
