import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Shield,
  Clock,
  ArrowRight,
  Eye,
  Sliders,
  Smile,
  Zap,
} from 'lucide-react';
import InteractiveToothCanvas from '../components/3d/InteractiveToothCanvas';
import Interactive3DCard from '../components/3d/Interactive3DCard';
import { siteData } from '../data/siteData';

export default function SmileStudioPage() {
  const [activeTab, setActiveTab] = useState('interactive-3d'); // 'interactive-3d' or 'smile-quiz'
  const [quizStep, setQuizStep] = useState(1);
  const [quizData, setQuizData] = useState({
    goal: '',
    shade: 'A1',
    timeline: 'Standard',
  });

  return (
    <div className="min-h-screen bg-[#071E1D] text-white pt-28 sm:pt-36 pb-20 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-dent-500/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-dent-500/20 text-dent-300 border border-dent-400/30 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-gold-400" />
            <span>Proprietary 3D Digital Smile Engine</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Interactive <span className="gold-gradient-text">3D Smile Studio</span>
          </h1>
          <p className="text-dent-200/80 text-base sm:text-lg leading-relaxed">
            Rotate, zoom, and inspect anatomical teeth, Swiss titanium implants, and clear aligners in 360°. See what modern digital dentistry makes possible before you even sit in the clinic chair.
          </p>

          {/* Mode Switcher */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('interactive-3d')}
              className={`text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all flex items-center gap-2 ${
                activeTab === 'interactive-3d'
                  ? 'bg-dent-500 text-white shadow-lg shadow-dent-500/30 scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              <Layers size={15} />
              <span>3D Anatomy & Layer Explorer</span>
            </button>
            <button
              onClick={() => setActiveTab('smile-quiz')}
              className={`text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all flex items-center gap-2 ${
                activeTab === 'smile-quiz'
                  ? 'bg-gold-500 text-dent-950 shadow-lg shadow-gold-500/30 scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              <Smile size={15} />
              <span>Virtual Smile Makeover Quiz</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive 3D Anatomy Explorer */}
        {activeTab === 'interactive-3d' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start mb-20 animate-in fade-in duration-300">
            {/* 3D Canvas Hero (8 Cols) */}
            <div className="lg:col-span-8">
              <InteractiveToothCanvas height="560px" initialMode="enamel" className="bg-[#051716]/90 border-white/10" />
            </div>

            {/* Explanatory Cards (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold block mb-1">
                  How To Interact
                </span>
                <h3 className="text-lg font-bold text-white mb-2">Full 360° Rotational Freedom</h3>
                <p className="text-xs text-dent-200/75 leading-relaxed mb-4">
                  Click/tap and drag on the 3D model to rotate at any angle. Use the bottom controls to peel back layers: switch between natural enamel, Swiss titanium implant root, E.max veneer, internal nerve pulp, and clear aligner shield.
                </p>
                <div className="space-y-2 text-xs text-dent-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Real-time physically based shader rendering (PBR)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Optical enamel translucency and subsurface scattering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Direct biological shade match comparison</span>
                  </div>
                </div>
              </div>

              {/* Anatomy Guide Card */}
              <div className="p-6 rounded-3xl bg-dent-900/60 border border-dent-500/20 backdrop-blur-md">
                <span className="text-xs font-mono uppercase tracking-widest text-dent-300 font-bold block mb-1">
                  Microscopic Anatomy
                </span>
                <h4 className="text-sm font-bold text-white mb-2">Why 3D Diagnosis Matters</h4>
                <p className="text-xs text-dent-200/70 leading-relaxed mb-4">
                  Traditional 2D X-rays flatten bone and nerve structures, leading to hidden blind spots. With Dr. Mohan Kulkarni’s 3D CBCT volume mapping, we observe bone density in 3 planes of space, ensuring 100% predictable implant integration.
                </p>
                <Link
                  to="/appointment"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-dent-500 to-dent-600 hover:from-dent-400 hover:to-dent-500 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md transition-all"
                >
                  <Calendar size={13} />
                  <span>Book 3D CBCT Scan</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Virtual Smile Makeover Quiz */}
        {activeTab === 'smile-quiz' && (
          <div className="max-w-3xl mx-auto rounded-3xl bg-white/5 border border-white/15 p-6 sm:p-10 backdrop-blur-xl mb-20 animate-in fade-in duration-300">
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-300 font-bold">
                Step {quizStep} of 3
              </span>
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className={`h-2 rounded-full transition-all ${
                      s === quizStep
                        ? 'w-8 bg-gold-400'
                        : s < quizStep
                        ? 'w-4 bg-emerald-400'
                        : 'w-4 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quiz Step 1: Dental Goals */}
            {quizStep === 1 && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  What aspect of your smile would you most like to enhance?
                </h3>
                <p className="text-xs sm:text-sm text-dent-200/70 mb-6">
                  Select your primary objective to calibrate your digital 3D treatment plan.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { id: 'makeover', title: 'Complete Smile Aesthetics', desc: 'Fix chips, gaps, or uneven sizes with ceramic veneers' },
                    { id: 'implants', title: 'Replace Missing Tooth', desc: 'Permanent chewing power with Swiss dental implants' },
                    { id: 'aligners', title: 'Straighten Crooked Teeth', desc: 'Discreet teeth alignment using Invisalign aligners' },
                    { id: 'whitening', title: 'Luminous Teeth Brightening', desc: 'Eliminate stubborn tea, coffee, or fluorosis stains' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setQuizData({ ...quizData, goal: opt.id })}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        quizData.goal === opt.id
                          ? 'border-gold-400 bg-white/15 ring-1 ring-gold-400'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-white mb-1">{opt.title}</h4>
                      <p className="text-xs text-dent-200/70">{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    disabled={!quizData.goal}
                    onClick={() => setQuizStep(2)}
                    className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-dent-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all"
                  >
                    <span>Next: Select Shade Goal</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Step 2: Shade Preference */}
            {quizStep === 2 && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  What is your preferred ceramic tooth shade?
                </h3>
                <p className="text-xs sm:text-sm text-dent-200/70 mb-6">
                  We use VITA classical and 3D Master shade scales to match your skin and eye tones.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  {[
                    { id: 'BL1', name: 'Bleach 1 (Hollywood Glow)', desc: 'Brilliant celebrity luminosity' },
                    { id: 'A1', name: 'Natural Pearl A1', desc: 'Subtle high-end natural brightness' },
                    { id: 'A2', name: 'Warm Classic A2', desc: 'Harmonious real-enamel matching' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setQuizData({ ...quizData, shade: s.id })}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        quizData.shade === s.id
                          ? 'border-gold-400 bg-white/15 ring-1 ring-gold-400'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-mono text-xs font-bold text-gold-400 block mb-1">{s.id}</span>
                      <h4 className="text-sm font-bold text-white mb-1">{s.name}</h4>
                      <p className="text-xs text-dent-200/60 leading-snug">{s.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setQuizStep(1)}
                    className="text-xs text-dent-300 hover:text-white"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setQuizStep(3)}
                    className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-dent-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all"
                  >
                    <span>Calculate Treatment Roadmap</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Step 3: Customized Roadmap Output */}
            {quizStep === 3 && (
              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold mb-4">
                  <CheckCircle2 size={13} />
                  <span>3D Digital Blueprint Formulated</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Your Personalized Smile Transformation Plan
                </h3>
                <p className="text-xs sm:text-sm text-dent-200/70 mb-6">
                  Based on your goals, Dr. Mohan Kulkarni recommends the following clinical protocol:
                </p>

                <div className="p-5 rounded-2xl bg-white/10 border border-white/20 mb-6 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-gold-400">Target Treatment</span>
                      <h4 className="text-lg font-bold text-white">
                        {quizData.goal === 'makeover' && 'Digital Smile Design & 8–10 E.max Porcelain Veneers'}
                        {quizData.goal === 'implants' && 'Swiss Straumann® Immediate Guided Dental Implant'}
                        {quizData.goal === 'aligners' && 'Invisalign® SmartTrack Comprehensive Clear Aligners'}
                        {quizData.goal === 'whitening' && 'Biolase Laser Teeth Whitening + Micro-Enamel Polishing'}
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold bg-gold-400/20 text-gold-300 px-2.5 py-1 rounded-md border border-gold-400/30">
                      Shade {quizData.shade}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs text-dent-200">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-gold-400" />
                      Estimated Duration: <strong>{quizData.goal === 'aligners' ? '6–10 Months' : '3–5 Days'}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Shield size={13} className="text-emerald-400" />
                      Warranty: <strong>Official Clinical Warranty</strong>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    to={`/appointment?goal=${quizData.goal}&shade=${quizData.shade}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-dent-950 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all"
                  >
                    <Calendar size={14} />
                    <span>Confirm Priority Appointment with Dr. Mohan</span>
                  </Link>
                  <button
                    onClick={() => setQuizStep(1)}
                    className="text-xs text-dent-300 hover:text-white"
                  >
                    Restart Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3D Features Showcase Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-dent-500/20 text-dent-300 flex items-center justify-center mb-4">
              <Eye size={20} />
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">Zero Guesswork</h4>
            <p className="text-xs text-dent-200/70 leading-relaxed">
              Experience your newly proportioned teeth on a high-definition 3D screen before any treatment begins.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-300 flex items-center justify-center mb-4">
              <Sliders size={20} />
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">Micron Customization</h4>
            <p className="text-xs text-dent-200/70 leading-relaxed">
              Every crown and veneer is milled using robotic CAD/CAM technology accurate to 5 microns (thinner than a red blood cell).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-4">
              <Zap size={20} />
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">Pain-Free Precision</h4>
            <p className="text-xs text-dent-200/70 leading-relaxed">
              Computer-controlled anesthesia delivery eliminates needle sting, ensuring absolute comfort from start to finish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
