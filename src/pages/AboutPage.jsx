import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  ChevronRight,
  Phone,
  FileCheck,
} from 'lucide-react';
import { siteData } from '../data/siteData';
import Interactive3DCard from '../components/3d/Interactive3DCard';

export default function AboutPage() {
  const { doctor, teamMembers } = siteData;

  return (
    <div className="min-h-screen subtle-mesh-bg pt-28 sm:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20 lg:mb-28">
          {/* Left Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-dent-100 text-dent-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
              <Award size={14} className="text-gold-600" />
              <span>Meet The Clinical Director</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dent-950 tracking-tight leading-[1.1] mb-6">
              A Lifetime Dedicated to <br />
              <span className="teal-gradient-text">Precision & Empathy.</span>
            </h1>
            <p className="text-lg text-dent-950/80 leading-relaxed mb-6 font-medium">
              {doctor.title} • {doctor.experience}
            </p>
            <p className="text-sm sm:text-base text-dent-950/70 leading-relaxed mb-8">
              {doctor.bio}
            </p>

            {/* Accreditations Grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {doctor.memberships.map((m, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-dent-500/15 text-xs text-dent-900 font-semibold shadow-xs">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/appointment"
                className="bg-dent-600 hover:bg-dent-700 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-dent-700/20 transition-all hover:scale-105"
              >
                Schedule Consultation with Dr. Mohan
              </Link>
              <Link
                to="/contact"
                className="border border-dent-300 text-dent-800 font-semibold text-xs px-6 py-3.5 rounded-xl hover:bg-white transition-colors"
              >
                Clinic Tour
              </Link>
            </div>
          </div>

          {/* Right Doctor Portrait with 3D Tilt */}
          <div className="lg:col-span-5">
            <Interactive3DCard maxTilt={8}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-dent-950">
                <img
                  src={doctor.portrait}
                  alt={doctor.name}
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dent-950 via-dent-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400 block mb-1">
                    Chief Dental Surgeon
                  </span>
                  <h3 className="text-2xl font-extrabold">{doctor.name}</h3>
                  <p className="text-xs text-dent-200 mt-1">{doctor.degrees}</p>
                </div>
              </div>
            </Interactive3DCard>
          </div>
        </div>

        {/* Clinical Philosophy Quote Banner */}
        <div className="mb-20 lg:mb-28 p-8 sm:p-12 rounded-3xl bg-dent-900 text-white border border-dent-700 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold block mb-3">
              Our Core Clinical Philosophy
            </span>
            <blockquote className="text-xl sm:text-2xl font-bold leading-relaxed mb-6 italic text-dent-50">
              "{doctor.philosophy}"
            </blockquote>
            <span className="text-xs text-dent-300 font-semibold">— Dr. Mohan Kulkarni, BDS, MDS, FICOI</span>
          </div>
        </div>

        {/* Career Milestones Timeline */}
        <div className="mb-20 lg:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-2">
              Chronicle of Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dent-950 tracking-tight">
              Two Decades of Dental Innovation
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctor.milestones.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-dent-500/15 shadow-glass flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-extrabold gold-gradient-text block mb-3 font-mono">
                    {m.year}
                  </span>
                  <h3 className="text-base font-bold text-dent-950 mb-2">{m.title}</h3>
                  <p className="text-xs text-dent-950/70 leading-relaxed">{m.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-dent-100 flex items-center gap-1.5 text-xs text-dent-600 font-semibold">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Clinical Milestone</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Multidisciplinary Dental Team */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-2">
              Collaborative Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dent-950 tracking-tight mb-4">
              Our Specialty Dental Associates
            </h2>
            <p className="text-dent-950/70 text-sm">
              Complex oral cases demand team collaboration. Every procedure is backed by certified super-specialists under Dr. Mohan's leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden bg-white border border-dent-500/15 shadow-glass flex flex-col">
                <div className="w-full aspect-[4/4] overflow-hidden bg-dent-950">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded-md inline-block mb-2">
                      {member.experience} Experience
                    </span>
                    <h3 className="text-base font-bold text-dent-950 mb-1">{member.name}</h3>
                    <p className="text-xs text-dent-600 font-semibold mb-2">{member.role}</p>
                    <p className="text-xs text-dent-950/70">{member.specialty}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-dent-100 text-[11px] font-mono text-dent-500">
                    {member.degrees}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sterilization & Patient Safety Standards */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-dent-500/15 shadow-glass">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 block mb-2">
                Uncompromising Hygiene
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-dent-950 mb-4">
                Class-B Autoclave & 6-Tier Infection Control
              </h3>
              <p className="text-sm text-dent-950/70 leading-relaxed mb-6">
                Your safety is sacred. Dr. Mohan Kulkarni’s practice follows strict European EN13060 medical sterilization protocols. All instruments are sealed in surgical pouches, vacuum-sterilized at 134°C, and opened exclusively in front of the patient.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs text-dent-900 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>100% Disposable Patient Drape Kits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>UV-C Operatory Air Sanitization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Chemical Indicator Strips on Pouches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>RO Distilled Water Line Disinfection</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-dent-200">
              <img
                src="/images/clinic/operatory.webp"
                alt="Clinic Operatory Cleanroom"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
