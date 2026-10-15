import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { siteData } from '../data/siteData';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryCases = [
    {
      id: 'case-1',
      category: 'veneers',
      title: 'Full Upper Ceramic Smile Design (10 E.max Units)',
      patient: 'Ananya S., 34',
      concern: 'Severe fluorosis stains, uneven margins, and micro-chipped incisors.',
      solution: '10 Handcrafted E.max ceramic veneers (Shade BL2) with laser gum contouring.',
      duration: '5 Days (2 Appointments)',
      beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
      testimonial: 'The final result looks so natural that people simply assume I have genetically perfect teeth!',
    },
    {
      id: 'case-2',
      category: 'implants',
      title: 'Single-Tooth Immediate Implant with Permanent Crown',
      patient: 'Vikram R., 48',
      concern: 'Traumatic fracture of front central incisor from a badminton accident.',
      solution: 'Swiss Straumann® SLAactive implant with same-day customized zirconia abutment.',
      duration: '45-Minute Single Procedure',
      beforeImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=800&q=80',
      testimonial: 'Walked in with a broken tooth and walked out an hour later with a permanent replacement. Zero pain!',
    },
    {
      id: 'case-3',
      category: 'aligners',
      title: 'Non-Extraction Invisalign® Clear Aligner Therapy',
      patient: 'Pooja M., 27',
      concern: 'Severe crowding and deep anterior bite causing tooth wear and jaw clicking.',
      solution: '14 Months of SmartTrack Invisalign clear aligners with virtual ClinCheck® tracking.',
      duration: '14 Months (Bi-monthly check-ins)',
      beforeImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      testimonial: 'Nobody at work noticed I had aligners on. My jaw ache has vanished completely.',
    },
    {
      id: 'case-4',
      category: 'veneers',
      title: 'Diastema (Midline Gap) Closure with Minimal Prep',
      patient: 'Kavita D., 31',
      concern: '3mm gap between front two teeth and short clinical crowns.',
      solution: '4 Ultra-thin contact-lens E.max veneers (0.3mm prep-less ceramic).',
      duration: '3 Days',
      beforeImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?auto=format&fit=crop&w=800&q=80',
      testimonial: 'The natural texture and shade transition are breathtaking. Dr. Mohan is a true artist.',
    },
  ];

  const filteredCases = activeFilter === 'all' 
    ? galleryCases 
    : galleryCases.filter(c => c.category === activeFilter);

  return (
    <div className="min-h-screen subtle-mesh-bg pt-28 sm:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-3">
            Real Photographic Documentation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dent-950 tracking-tight mb-4">
            Smile Transformations & <span className="gold-gradient-text">Clinical Gallery</span>
          </h1>
          <p className="text-base text-dent-950/70 leading-relaxed">
            Drag the interactive comparison dividers across our verified case studies. Every case was planned and completed by Dr. Mohan Kulkarni.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {[
              { id: 'all', label: 'All Documented Cases' },
              { id: 'veneers', label: 'Porcelain Veneers & Makeovers' },
              { id: 'implants', label: 'Dental Implants' },
              { id: 'aligners', label: 'Invisalign Aligners' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`text-xs font-bold px-4 py-2.5 rounded-full transition-all ${
                  activeFilter === f.id
                    ? 'bg-dent-600 text-white shadow-md shadow-dent-600/20'
                    : 'bg-white text-dent-900 border border-dent-200 hover:bg-dent-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid of Before/After Sliders */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12 mb-20">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              className="rounded-3xl bg-white border border-dent-500/15 p-6 sm:p-7 shadow-glass flex flex-col justify-between"
            >
              <div>
                {/* Interactive Slider */}
                <div className="mb-6">
                  <BeforeAfterSlider
                    beforeImage={c.beforeImg}
                    afterImage={c.afterImg}
                    beforeLabel="Before"
                    afterLabel="After"
                    className="shadow-md"
                  />
                </div>

                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-dent-600 block mb-1">
                  Case ID: {c.id.toUpperCase()} • {c.patient}
                </span>
                <h3 className="text-xl font-bold text-dent-950 mb-3">{c.title}</h3>

                <div className="space-y-2 mb-4 text-xs text-dent-900/80">
                  <p><strong>Chief Concern:</strong> {c.concern}</p>
                  <p><strong>Clinical Protocol:</strong> {c.solution}</p>
                  <p className="text-dent-600 font-semibold">Treatment Duration: {c.duration}</p>
                </div>

                <blockquote className="p-3.5 rounded-xl bg-dent-50/70 border-l-3 border-gold-500 text-xs text-dent-900 italic mb-4">
                  "{c.testimonial}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-dent-100 flex items-center justify-between">
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck size={14} /> 100% Verified Case
                </span>
                <Link
                  to="/appointment"
                  className="text-xs font-bold text-dent-700 hover:text-dent-950 flex items-center gap-1"
                >
                  <span>Book Consultation</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-dent-900 text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">Want to See How Your Smile Would Look?</h3>
          <p className="text-dent-200/80 text-sm max-w-xl mx-auto mb-6">
            Schedule a 3D digital smile simulation session with Dr. Mohan Kulkarni at our Bandra or South Mumbai studios.
          </p>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-dent-950 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all"
          >
            <Calendar size={15} />
            <span>Schedule Digital Smile Preview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
