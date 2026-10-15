import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Clock, Calendar, HelpCircle } from 'lucide-react';
import InteractiveToothCanvas from './InteractiveToothCanvas';
import { Link } from 'react-router-dom';

const CONCERNS = [
  { id: 'crooked', label: 'Crooked or Crowded', desc: 'Misaligned teeth needing discreet straightening', recommended: 'Invisalign® SmartTrack Aligners', time: '6 - 12 Months', modelMode: 'aligner' },
  { id: 'missing', label: 'Missing Tooth / Teeth', desc: 'Gap that impairs chewing or smiling confidence', recommended: 'Swiss Straumann® Immediate Implant', time: '1 Day Surgical Load', modelMode: 'implant' },
  { id: 'yellow', label: 'Discolored / Stained', desc: 'Deep enamel staining from fluorosis or coffee', recommended: 'Laser Teeth Whitening & E.max Micro-Veneers', time: '1 - 3 Days', modelMode: 'veneer' },
  { id: 'chipped', label: 'Chipped or Broken', desc: 'Fractured tooth edge or severe enamel wear', recommended: 'Biomimetic Ceramic Crown & Onlay', time: 'Same-Day Robotic Milling', modelMode: 'enamel' },
  { id: 'pain', label: 'Severe Toothache', desc: 'Deep decay reaching nerve pulp chamber', recommended: 'Microscopic Single-Visit Root Canal (RCT)', time: '45 Minutes', modelMode: 'xray' },
];

const SHADES = [
  { id: 'BL1', name: 'Bleach 1 (Celebrity White)', desc: 'Radiant, luminescent Hollywood smile' },
  { id: 'A1', name: 'A1 Natural Pearl', desc: 'Most popular natural young adult shade' },
  { id: 'A2', name: 'A2 Classic Ivory', desc: 'Warm, realistic enamel harmonization' },
];

export default function InteractiveSmileSimulator() {
  const [selectedConcern, setSelectedConcern] = useState(CONCERNS[0]);
  const [selectedShade, setSelectedShade] = useState(SHADES[1]);
  const [isConsultationRequested, setIsConsultationRequested] = useState(false);

  return (
    <div className="rounded-[2.5rem] bg-gradient-to-br from-dent-950 via-[#072422] to-dent-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-dent-500/25 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dent-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 bg-dent-500/20 text-dent-300 border border-dent-400/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 backdrop-blur-md">
          <Sparkles size={12} className="text-gold-400" />
          <span>Virtual 3D Smile Architecture Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Simulate Your <span className="gold-gradient-text">Dream Smile</span> in Real-Time
        </h2>
        <p className="mt-4 text-dent-100/75 text-sm sm:text-base leading-relaxed">
          Select your dental concern to see how Dr. Mohan Kulkarni’s digital 3D protocol models, aligns, and crafts your customized treatment solution.
        </p>
      </div>

      {/* Interactive Grid */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
        {/* Left Column: Concern Selector & Controls (7 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-dent-300 mb-3 block">
              Step 1: What is your primary dental concern?
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {CONCERNS.map((c) => {
                const active = selectedConcern.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConcern(c)}
                    className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden group ${
                      active
                        ? 'border-gold-400 bg-white/10 shadow-lg shadow-gold-500/10 ring-1 ring-gold-400/50'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    {active && (
                      <span className="absolute top-3 right-3 text-gold-400">
                        <CheckCircle2 size={16} />
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-white mb-1">{c.label}</h3>
                    <p className="text-xs text-dent-200/70 leading-snug">{c.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-dent-300 mb-3 block">
              Step 2: Choose Desired Ceramic Luminosity & Shade
            </label>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {SHADES.map((s) => {
                const active = selectedShade.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShade(s)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all ${
                      active
                        ? 'border-dent-400 bg-dent-500/20 text-white ring-1 ring-dent-400/50'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/70'
                    }`}
                  >
                    <div className="font-bold text-dent-200 mb-0.5">{s.id}</div>
                    <div className="text-[11px] text-white/60 leading-tight">{s.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Clinical Diagnosis Card */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-300 font-bold flex items-center gap-1.5">
                <Sparkles size={13} /> Recommended Clinical Plan
              </span>
              <span className="text-xs font-medium bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Optimal Match
              </span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1.5">{selectedConcern.recommended}</h4>
            <div className="flex items-center gap-4 text-xs text-dent-100/80 mb-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-gold-400" /> Duration: <strong className="text-white">{selectedConcern.time}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-400" /> Precision: <strong className="text-white">Computer Guided</strong>
              </span>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <Link
                to={`/appointment?concern=${selectedConcern.id}&shade=${selectedShade.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-dent-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-gold-500/25 transition-all hover:scale-[1.02]"
              >
                <span>Book Priority 3D Consultation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Live 3D Model Display (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full">
            <InteractiveToothCanvas
              initialMode={selectedConcern.modelMode}
              key={`${selectedConcern.modelMode}-${selectedShade.id}`}
              height="440px"
              className="bg-dent-900/60"
            />
          </div>
          <p className="mt-3 text-xs text-center text-dent-300/60 italic">
            Interactive 3D Preview: Rotate & inspect tooth anatomy, implant roots, and aligner layers in 360°.
          </p>
        </div>
      </div>
    </div>
  );
}
