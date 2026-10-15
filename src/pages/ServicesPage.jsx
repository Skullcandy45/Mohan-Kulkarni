import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Phone,
  HelpCircle,
  Activity,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { siteData } from '../data/siteData';
import Interactive3DCard from '../components/3d/Interactive3DCard';

export default function ServicesPage() {
  const location = useLocation();
  const [selectedService, setSelectedService] = useState(siteData.services[0]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const slug = location.hash.replace('#', '');
      const match = siteData.services.find((s) => s.slug === slug);
      if (match) setSelectedService(match);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen subtle-mesh-bg pt-28 sm:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-3">
            Comprehensive Dental Specialization
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dent-950 tracking-tight mb-4">
            Clinical Treatments & <span className="teal-gradient-text">Procedures</span>
          </h1>
          <p className="text-base text-dent-950/70 leading-relaxed">
            Every procedure is planned using 3D digital imaging and executed with microscopic precision to preserve healthy natural tooth tissue.
          </p>
        </div>

        {/* Tab Pills for Fast Navigation */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {siteData.services.map((svc) => {
            const active = selectedService.id === svc.id;
            return (
              <button
                key={svc.id}
                onClick={() => setSelectedService(svc)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  active
                    ? 'bg-dent-600 text-white shadow-md shadow-dent-600/25 scale-[1.02]'
                    : 'bg-white text-dent-900 border border-dent-200/80 hover:bg-dent-50'
                }`}
              >
                {svc.title.split('&')[0]}
              </button>
            );
          })}
        </div>

        {/* Selected Service Deep-Dive Hero Card */}
        <div className="rounded-3xl bg-white border border-dent-500/15 p-6 sm:p-10 lg:p-12 shadow-glass mb-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider bg-gold-100 text-gold-800 px-3 py-1 rounded-full border border-gold-300/40">
                    {selectedService.badge}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Success Rate: {selectedService.successRate}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dent-950 mb-4">
                  {selectedService.title}
                </h2>

                <p className="text-sm sm:text-base text-dent-950/75 leading-relaxed mb-6">
                  {selectedService.fullDesc}
                </p>

                {/* Procedure Quick Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-dent-50/70 border border-dent-100 mb-8 text-xs">
                  <div>
                    <span className="text-dent-600 font-semibold block mb-0.5">Procedure Duration:</span>
                    <strong className="text-dent-950">{selectedService.duration}</strong>
                  </div>
                  <div>
                    <span className="text-dent-600 font-semibold block mb-0.5">Recovery Time:</span>
                    <strong className="text-dent-950">{selectedService.recovery}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-dent-600 font-semibold block mb-0.5">Investment:</span>
                    <strong className="text-dent-950">{selectedService.pricing}</strong>
                  </div>
                </div>

                {/* Key Clinical Advantages */}
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-dent-900 mb-3">
                  Included in Your Treatment Protocol:
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5 mb-8">
                  {selectedService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-dent-800 font-medium">
                      <CheckCircle2 size={14} className="text-dent-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-dent-100">
                <Link
                  to={`/appointment?service=${selectedService.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-dent-600 hover:bg-dent-700 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-dent-600/20 transition-all hover:scale-105"
                >
                  <Calendar size={14} />
                  <span>Book for {selectedService.title.split('&')[0]}</span>
                </Link>
                <Link
                  to="/smile-studio"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-dent-50 hover:bg-dent-100 text-dent-900 font-semibold text-xs px-6 py-3.5 rounded-xl border border-dent-200 transition-colors"
                >
                  <Sparkles size={14} className="text-gold-500" />
                  <span>Simulate in 3D</span>
                </Link>
              </div>
            </div>

            {/* Right Media (5 Cols) */}
            <div className="lg:col-span-5">
              <Interactive3DCard maxTilt={6}>
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-dent-950 relative">
                  <img
                    src={selectedService.photo}
                    alt={selectedService.title}
                    className="w-full aspect-[4/3] sm:aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dent-950 via-dent-950/10 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-gold-300 font-bold block mb-1">
                      Clinical Operatory View
                    </span>
                    <h4 className="text-lg font-bold">{selectedService.title}</h4>
                  </div>
                </div>
              </Interactive3DCard>
            </div>
          </div>
        </div>

        {/* 6-Step Patient Treatment Journey */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-2">
              Our Digital Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-dent-950 tracking-tight">
              The 4-Phase Painless Dental Journey
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: '3D Optical Scan', desc: '60-second intraoral 3D scan and ultra-low radiation CBCT bone mapping with zero gooey impression paste.' },
              { step: '02', title: 'Virtual Simulation', desc: 'Dr. Mohan designs your smile and surgical guides on screen. You review and approve before we touch a tooth.' },
              { step: '03', title: 'Microscopic Procedure', desc: 'Computerized wand anesthesia ensures absolute numbness while Zeiss magnification provides sub-millimeter accuracy.' },
              { step: '04', title: 'Lifelong Care & Warranty', desc: 'Direct follow-up check-in, digital maintenance guidelines, and official manufacturer warranty certificate.' },
            ].map((p, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-dent-500/15 shadow-glass flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-black text-dent-200 block mb-3 font-mono">
                    {p.step}
                  </span>
                  <h3 className="text-base font-bold text-dent-950 mb-2">{p.title}</h3>
                  <p className="text-xs text-dent-950/70 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-dent-100 flex items-center gap-1 text-xs text-dent-600 font-semibold">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Standard Clinical Protocol</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment Frequently Asked Questions Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-2">
              Common Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-dent-950">
              Frequently Asked Clinical Questions
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {siteData.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-dent-500/15 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-dent-950 hover:text-dent-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-dent-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-dent-950/70 leading-relaxed border-t border-dent-100 bg-dent-50/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
