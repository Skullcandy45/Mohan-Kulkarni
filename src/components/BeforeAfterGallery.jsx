import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function BeforeAfterGallery({ items = [], badge, title, highlight, description }) {
  const [idx, setIdx] = useState(0);
  if (!items.length) return null;

  const current = items[idx % items.length];
  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  return (
    <section className="section bg-surface-alt border-y border-line-fine">
      <div className="shell">
        <SectionHeader badge={badge} title={title} highlight={highlight} description={description} centered />

        <motion.div
          key={current.id ?? idx}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-line aspect-[4/3] image-frame group">
            <img src={current.before} alt={`${current.label} — before`} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 chip-ink text-[10px]">Before</span>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-primary/25 aspect-[4/3] image-frame shadow-glow group">
            <img src={current.after} alt={`${current.label} — after`} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 chip-emerald text-[10px]">After</span>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-sm font-medium text-ink">{current.label}</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={prev} className="w-10 h-10 rounded-2xl border border-line bg-surface grid place-items-center hover:border-primary/40 transition-colors" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-mono text-muted tabular-nums px-2">
              {idx + 1} / {items.length}
            </span>
            <button type="button" onClick={next} className="w-10 h-10 rounded-2xl border border-line bg-surface grid place-items-center hover:border-primary/40 transition-colors" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
