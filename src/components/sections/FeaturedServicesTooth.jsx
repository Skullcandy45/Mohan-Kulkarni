import React, { Suspense, useRef, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HOME_SCROLL_MARGIN } from '../motion/HomeScrollReveal';

const ToothModel3D = lazy(() => import('../motion/ToothModel3D'));

const POINTER_LAYOUT = [
  { x: '8%', y: '18%', align: 'left', line: 'right' },
  { x: '72%', y: '12%', align: 'right', line: 'left' },
  { x: '6%', y: '68%', align: 'left', line: 'right' },
  { x: '74%', y: '72%', align: 'right', line: 'left' },
];

function ServicePointer({ service, layout, index, onBook, inView }) {
  const shortTitle =
    service.title.length > 42 ? `${service.title.slice(0, 40)}…` : service.title;

  return (
    <motion.div
      className="absolute z-20 max-w-[min(100%,200px)] sm:max-w-[220px]"
      style={{ left: layout.x, top: layout.y }}
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 12 }}
      transition={{ delay: 0.12 + index * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`flex items-center gap-2 ${layout.align === 'right' ? 'flex-row-reverse text-right' : ''}`}
      >
        <span
          className={`hidden sm:block h-px w-8 sm:w-12 bg-gradient-to-r ${
            layout.line === 'left' ? 'from-primary/60 to-transparent' : 'from-transparent to-primary/60'
          } shrink-0`}
          aria-hidden
        />
        <button
          type="button"
          onClick={() => onBook(service)}
          className="rounded-2xl border border-line-fine bg-white/95 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3 text-left shadow-md hover:border-primary/35 hover:shadow-lg transition-all group w-full"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="mt-0.5 text-xs sm:text-sm font-semibold text-ink leading-snug group-hover:text-primary transition-colors">
            {shortTitle}
          </p>
          {service.price && (
            <p className="mt-1 text-[11px] text-muted">{service.price}</p>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function FeaturedServicesTooth({ services = [] }) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.25, margin: HOME_SCROLL_MARGIN });
  const display = services.slice(0, 4);

  const handleBook = (svc) => {
    const q = svc?.title ? `?service=${encodeURIComponent(svc.title)}` : '';
    navigate(`/appointment${q}`);
  };

  if (display.length === 0) return null;

  return (
    <>
      <div
        ref={ref}
        className="relative mx-auto w-full max-w-4xl aspect-square sm:aspect-[4/3] lg:aspect-[16/10] min-h-[320px] sm:min-h-[380px] hidden sm:block"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full bg-primary/10 blur-3xl pointer-events-none"
          aria-hidden
        />

        {display.map((svc, i) => (
          <ServicePointer
            key={svc.id}
            service={svc}
            layout={POINTER_LAYOUT[i] || POINTER_LAYOUT[0]}
            index={i}
            onBook={handleBook}
            inView={reduced || inView}
          />
        ))}

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <Suspense
            fallback={
              <div className="w-[200px] h-[240px] rounded-full bg-primary/10 animate-pulse" aria-hidden />
            }
          >
            <ToothModel3D
              className="w-[min(72vw,320px)] h-[min(58vw,360px)] sm:w-[300px] sm:h-[340px] drop-shadow-[0_24px_48px_rgba(15,82,186,0.22)]"
              spin={inView && !reduced}
            />
          </Suspense>
        </motion.div>
      </div>

      <ul className="sm:hidden grid gap-3 mt-2">
        {display.map((svc, i) => (
          <li key={svc.id}>
            <button
              type="button"
              onClick={() => handleBook(svc)}
              className="w-full text-left rounded-2xl border border-line-fine bg-[#F8FAFC] px-4 py-3"
            >
              <span className="text-[10px] font-mono text-primary uppercase">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm font-semibold text-ink mt-0.5">{svc.title}</p>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
