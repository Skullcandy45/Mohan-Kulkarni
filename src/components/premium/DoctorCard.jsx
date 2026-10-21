import React, { useEffect, useRef, useState } from "react";
import { Award, Star, Phone, CheckCircle2, Clock, Users, ThumbsUp, Calendar } from "lucide-react";

function useCounter(target, duration, start) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function StatTile({ icon: Icon, value, suffix, label, delay, started }) {
  const count = useCounter(value, 1600, started);
  return (
    <div className="flex-1 min-w-[90px] bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-4 border border-slate-100 shadow-sm flex flex-col items-center gap-1">
      <Icon size={18} className="text-[#0B3A3E] mb-1 opacity-80" />
      <span className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
        {count}{suffix}
      </span>
      <span className="text-[10px] font-medium text-slate-500 text-center leading-tight">{label}</span>
    </div>
  );
}

const QUOTES = [
  { text: "\u201cDr. Kulkarni is incredibly thorough and gentle. Best dental experience in Mumbai.\u201d", name: "Priya M." },
  { text: "\u201cTrusted him for 15 years. Honest, skilled, and genuinely caring.\u201d", name: "Rajesh S." },
  { text: "\u201cNo pain, no anxiety. He explains everything patiently.\u201d", name: "Ananya T." },
  { text: "\u201cMy entire family has been his patient for over a decade.\u201d", name: "Suresh K." },
];

export default function DoctorCard() {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIdx((i) => (i + 1) % QUOTES.length);
        setQuoteVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const q = QUOTES[quoteIdx];

  return (
    <div ref={cardRef} className="relative w-full" style={{ perspective: "1200px" }}>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0px) rotate(-2deg)} 50%{transform:translateY(-10px) rotate(2deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0px) rotate(3deg)} 50%{transform:translateY(-14px) rotate(-1deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0px) rotate(-1deg)} 50%{transform:translateY(-8px) rotate(3deg)} }
      `}</style>

      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#0B3A3E]/6 via-[#C5A880]/8 to-transparent blur-2xl pointer-events-none" />

      <div className="relative bg-white/70 backdrop-blur-xl rounded-[1.75rem] border border-white/80 shadow-[0_20px_60px_-15px_rgba(7,36,40,0.14)] overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-[#072428] via-[#0B3A3E] to-[#C5A880]" />

        <div className="px-6 pt-6 pb-5 flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#072428] to-[#0B3A3E] flex items-center justify-center text-[#C5A880] font-bold text-2xl shadow-lg select-none">
              MK
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 leading-tight">Dr. Mohan K. Kulkarni</h3>
              <span className="inline-block text-[10px] font-semibold bg-[#0B3A3E]/8 text-[#0B3A3E] border border-[#0B3A3E]/15 px-2 py-0.5 rounded-md">BDS</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Dental Surgeon &middot; Est. 1977</p>
            <div className="flex items-center gap-1 mt-2">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
              ))}
              <span className="text-xs font-semibold text-slate-700 ml-1">4.9</span>
              <span className="text-xs text-slate-400">&middot; 1,800+ reviews</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center gap-0.5 bg-amber-50 border border-amber-200/60 rounded-xl px-3 py-2">
            <Award size={18} className="text-[#C5A880]" />
            <span className="text-[9px] font-bold text-amber-800 text-center leading-tight uppercase tracking-wide">IDA<br/>Past Pres.</span>
          </div>
        </div>

        <div className="px-6 pb-5 flex gap-3">
          <StatTile icon={Clock}    value={47}   suffix="+" label="Years Practice"      delay={0}   started={visible} />
          <StatTile icon={Users}    value={5000} suffix="+" label="Patients Treated"    delay={150} started={visible} />
          <StatTile icon={ThumbsUp} value={98}   suffix="%" label="Satisfaction Rate"   delay={300} started={visible} />
        </div>

        <div className="mx-6 border-t border-slate-100" />

        <div className="px-6 py-5 min-h-[90px] flex flex-col justify-center">
          <div
            style={{ opacity: quoteVisible ? 1 : 0, transform: quoteVisible ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.3s ease, transform 0.3s ease" }}
          >
            <p className="text-[13px] text-slate-700 leading-relaxed italic mb-1.5">{q.text}</p>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-[#0B3A3E]/10 flex items-center justify-center">
                <CheckCircle2 size={10} className="text-[#0B3A3E]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-500">Verified Patient &middot; {q.name}</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <a
            href="tel:02226490333"
            className="flex items-center justify-center gap-2 w-full bg-[#072428] hover:bg-[#0B3A3E] text-white text-sm font-semibold py-3 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-[#072428]/20"
          >
            <Phone size={15} className="text-[#C5A880]" />
            <span>Call Clinic: 022 2649 0333</span>
          </a>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-400">
            <Calendar size={11} />
            <span>Mon &ndash; Sat &middot; 10 AM&ndash;1 PM &amp; 6&ndash;9 PM</span>
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -right-4 bg-white border border-slate-100 shadow-md rounded-2xl px-3 py-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 pointer-events-none" style={{ animation: "floatA 5s ease-in-out infinite" }}>
        <span className="text-emerald-500">&#x2736;</span> Santacruz West, Mumbai
      </div>

      <div className="absolute -bottom-4 -left-3 bg-white border border-slate-100 shadow-md rounded-2xl px-3 py-2 flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 pointer-events-none" style={{ animation: "floatB 6.5s ease-in-out infinite 1s" }}>
        <Award size={12} className="text-[#C5A880]" /> BDS &middot; Govt Dental College 1975
      </div>

      <div className="absolute bottom-14 -right-5 bg-white border border-slate-100 shadow-md rounded-2xl px-3 py-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 pointer-events-none" style={{ animation: "floatC 7s ease-in-out infinite 2s" }}>
        <Star size={12} className="fill-amber-400 text-amber-400" /> 4.9 &middot; Google Reviews
      </div>
    </div>
  );
}
