import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import HomeRouteLayout from './components/template/HomeRouteLayout';
import PremiumSiteLayout from './components/premium/PremiumSiteLayout';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import AppointmentPage from './pages/AppointmentPage';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import { siteConfig, buildWhatsAppLink, getWhatsAppDigitsFromSettings } from './config/siteConfig';
import WhatsAppIcon from './components/WhatsAppIcon';
import ScrollProgress from './components/motion/ScrollProgress';
import { pageEnter } from './lib/motion';

function ThemeInjector() {
  const { settings } = useSettings();

  useEffect(() => {
    const root = document.documentElement;
    const T = siteConfig.theme || {};

    const pick = (key, fallback) => {
      const v = settings?.[key];
      return v != null && String(v).trim() !== '' ? String(v).trim() : fallback;
    };

    const primary = pick('theme_primary', T.primary);
    const accent = pick('theme_accent', T.accent);
    const ink = pick('theme_ink', T.ink || T.secondary);

    const map = {
      '--color-primary': primary,
      '--color-primary-light': pick('theme_primary_light', T.primaryLight),
      '--color-primary-dark': pick('theme_primary_dark', T.primaryDark),
      '--color-primary-dim': pick('theme_primary_dim', T.primaryDim),
      '--color-primary-soft': pick('theme_primary_soft', T.primarySoft),
      '--color-secondary': ink,
      '--color-accent': accent,
      '--color-accent-visible': pick('theme_accent_visible', T.accentVisible || accent),
      '--color-accent-soft': pick('theme_accent_soft', T.accentSoft),
      '--color-background': pick('theme_background', T.background),
      '--color-surface': pick('theme_surface', T.surface),
      '--color-subtle': pick('theme_subtle', T.subtle),
      '--color-text': pick('theme_text', T.text),
      '--color-text-light': pick('theme_text_light', T.textLight),
      '--color-border': pick('theme_border', T.border),
      '--color-ink': ink,
      '--color-cream': pick('theme_background', T.cream || T.background),
      '--color-surface-alt': pick('theme_surface_alt', T.surfaceAlt || T.backgroundLight || T.subtle),
      '--color-accent-wash': T.accentWash || pick('theme_accent_soft', T.accentSoft),
      '--color-line-fine': pick('theme_border', T.border),
      '--font-sans': T.fontSans,
      '--font-heading': T.fontHeading,
      '--font-mono': T.fontMono || "'JetBrains Mono', ui-monospace, monospace",
      '--color-highlight': T.highlight || '#0369A1',
      '--color-highlight-soft': T.highlightSoft || '#E0F2FE',
      '--color-warm': T.warm || '#B45309',
      '--color-warm-soft': T.warmSoft || '#FFFBEB',
      '--color-warm-wash': T.warmWash || '#F8FAFC',
    };

    Object.entries(map).forEach(([k, v]) => {
      if (v) root.style.setProperty(k, v);
    });

    root.style.setProperty(
      '--color-muted-2',
      `color-mix(in srgb, ${pick('theme_text_light', T.textLight)} 72%, ${pick('theme_background', T.background)})`,
    );

    const siteName = pick('site_name', siteConfig.site.name);
    const tagline = pick('site_tagline', siteConfig.site.tagline);
    document.title = tagline ? `${siteName} — ${tagline}` : siteName;
  }, [settings]);

  return null;
}

function PageWrapper({ children }) {
  const reduced = useReducedMotion();
  if (reduced) return <div>{children}</div>;

  return (
    <motion.div
      variants={pageEnter}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function WhatsAppFloat() {
  const { pathname } = useLocation();
  const { settings } = useSettings();
  if (pathname.startsWith('/admin')) return null;
  if (!getWhatsAppDigitsFromSettings(settings)) return null;

  return (
    <motion.a
      href={buildWhatsAppLink('', settings)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
      transition={{
        scale: { delay: 0.8, type: 'spring', stiffness: 260 },
        opacity: { delay: 0.8, duration: 0.35 },
        y: { delay: 1.1, duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
      whileHover={{ scale: 1.1, rotate: -4 }}
      whileTap={{ scale: 0.94 }}
      className="fixed z-[90] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_18px_45px_-16px_rgba(37,211,102,0.55)] cursor-pointer"
      style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))', right: 'max(1.5rem, env(safe-area-inset-right))' }}
    >
      <WhatsAppIcon size={26} />
    </motion.a>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomeRouteLayout /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><PremiumSiteLayout><AboutPage /></PremiumSiteLayout></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><PremiumSiteLayout><ServicesPage /></PremiumSiteLayout></PageWrapper>} />
        <Route path="/team" element={<PageWrapper><PremiumSiteLayout><TeamPage /></PremiumSiteLayout></PageWrapper>} />
        <Route path="/appointment" element={<PageWrapper><PremiumSiteLayout bookingCta={false}><AppointmentPage /></PremiumSiteLayout></PageWrapper>} />
        <Route path="/testimonials" element={<PageWrapper><PremiumSiteLayout><TestimonialsPage /></PremiumSiteLayout></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><PremiumSiteLayout bookingCta={false}><ContactPage /></PremiumSiteLayout></PageWrapper>} />
        {/* Catch-all redirect to home */}
        <Route path="*" element={<PageWrapper><HomeRouteLayout /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <ThemeInjector />
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollProgress />
        <ScrollToTop />
        <AnimatedRoutes />
        <WhatsAppFloat />
      </Router>
    </SettingsProvider>
  );
}
