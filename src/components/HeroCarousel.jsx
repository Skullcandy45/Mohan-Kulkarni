import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.4 },
  }),
};

const SWIPE_THRESHOLD = 50;

export default function HeroCarousel({ images = [], overlayGradient = true, className = '' }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const slides = images?.length >= 1 ? images : [''];
  const count = slides.length;

  const goTo = useCallback((index) => {
    const next = (index + count) % count;
    setDirection(next > current ? 1 : next < current ? -1 : 0);
    setCurrent(next);
  }, [current, count]);

  const next = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  const onTouchStart = (e) => {
    touchStart.current = e.targetTouches?.[0]?.clientX ?? e.clientX;
  };
  const onTouchEnd = (e) => {
    touchEnd.current = e.changedTouches?.[0]?.clientX ?? e.clientX;
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) next();
      else prev();
    }
  };

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [current, count, next]);

  if (!slides[0]) return null;

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="relative w-full aspect-[4/5] sm:aspect-[4/5] max-h-[70vh] sm:max-h-none rounded-2xl sm:rounded-[2rem] overflow-hidden border-4 sm:border-8 border-white/10 shadow-2xl touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={slides[current]}
              alt={`Slide ${current + 1}`}
              className="w-full h-full object-cover select-none"
              loading={current === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
            {overlayGradient && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, color-mix(in srgb, var(--color-secondary), transparent 40%), transparent)',
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-[var(--color-secondary)] transition-all active:scale-95"
            >
              <ChevronLeft size={24} className="sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-[var(--color-secondary)] transition-all active:scale-95"
            >
              <ChevronRight size={24} className="sm:w-6 sm:h-6" />
            </button>

            <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'bg-white scale-125 w-3 sm:w-4'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
