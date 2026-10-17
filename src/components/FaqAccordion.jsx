import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useMotionSafe, ease, faqContent } from '../lib/motion';
import { SectionStagger, SectionStaggerItem } from './motion/SectionStagger';

export default function FaqAccordion({ items = [], openIdx, setOpenIdx }) {
  const reduced = useMotionSafe();

  return (
    <SectionStagger className="divide-y divide-line-fine border border-line-fine rounded-[var(--radius-md)] bg-surface overflow-hidden" gap={0.1}>
      {items.map((item, idx) => {
        const open = openIdx === idx;
        return (
          <SectionStaggerItem key={idx} variant="fadeUp" as="div">
            <motion.div
              layout={!reduced}
              className={`transition-colors duration-300 ${open ? 'bg-surface-alt' : 'hover:bg-surface-alt/40'}`}
            >
              <motion.button
                type="button"
                onClick={() => setOpenIdx(open ? -1 : idx)}
                whileTap={reduced ? undefined : { scale: 0.995 }}
                className="w-full flex items-start justify-between gap-4 px-4 sm:px-5 py-4 text-left group"
                aria-expanded={open}
              >
                <span className="font-display text-base sm:text-lg text-ink leading-snug pr-2">{item.q}</span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0, backgroundColor: open ? 'var(--color-ink)' : 'var(--color-surface-alt)' }}
                  whileHover={reduced ? undefined : { scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className={`shrink-0 w-8 h-8 rounded-[6px] grid place-items-center ${
                    open ? 'text-cream' : 'text-ink group-hover:bg-primary-soft group-hover:text-primary'
                  }`}
                >
                  <Plus size={15} />
                </motion.span>
              </motion.button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: ease.smooth }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      variants={faqContent}
                      initial="hidden"
                      animate="visible"
                      className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm leading-snug max-w-prose"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      {item.a}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </SectionStaggerItem>
        );
      })}
    </SectionStagger>
  );
}
