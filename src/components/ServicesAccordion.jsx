import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, Clock, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesAccordion({ services = [], defaultOpen = 0 }) {
  const [openIdx, setOpenIdx] = useState(defaultOpen);

  if (!services.length) return null;

  return (
    <div className="space-y-3">
      {services.map((svc, idx) => {
        const open = openIdx === idx;
        return (
          <motion.div
            key={svc.id ?? idx}
            layout
            className={`rounded-2xl sm:rounded-3xl overflow-hidden border transition-colors duration-300 ${
              open ? 'border-primary/35 bg-surface shadow-glass' : 'border-slate-200/80 bg-surface/90'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(open ? -1 : idx)}
              className="w-full flex items-start sm:items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left touch-target group"
              aria-expanded={open}
            >
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-primary mb-1 block">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg sm:text-xl text-ink font-semibold leading-snug group-hover:text-primary transition-colors">
                  {svc.title}
                </h3>
                {!open && svc.description && (
                  <p className="mt-1 text-sm text-muted line-clamp-1">{svc.description}</p>
                )}
              </div>
              <span
                className={`shrink-0 w-10 h-10 rounded-2xl grid place-items-center transition-all duration-300 ${
                  open ? 'bg-primary text-white rotate-45' : 'bg-primary-soft text-primary'
                }`}
              >
                <Plus size={18} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-7 pb-6 pt-0 border-t border-line-fine/80">
                    <p className="text-[15px] sm:text-base text-text-light leading-relaxed max-w-3xl">
                      {svc.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3 text-sm">
                      {svc.duration && (
                        <span className="inline-flex items-center gap-2 chip-emerald normal-case tracking-normal">
                          <Clock size={14} /> {svc.duration}
                        </span>
                      )}
                      {svc.price && (
                        <span className="inline-flex items-center gap-2 chip normal-case tracking-normal">
                          <IndianRupee size={14} /> {svc.price.replace(/^from\s*/i, 'From ')}
                        </span>
                      )}
                    </div>
                    <Link
                      to={svc.title ? `/appointment?service=${encodeURIComponent(svc.title)}` : '/appointment'}
                      className="btn-primary mt-6 inline-flex rounded-2xl px-6 py-3 text-sm"
                    >
                      <Calendar size={16} /> Book Consultation
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
