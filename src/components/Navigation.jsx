import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { siteConfig, buildWhatsAppLink, getWhatsAppDigitsFromSettings } from '../config/siteConfig';
import { useSettings } from '../contexts/SettingsContext';
import WhatsAppIcon from './WhatsAppIcon';
import MotionButton, { MotionArrow } from './motion/MotionButton';
import { ease } from '../lib/motion';
const navStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};
const navItem = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: ease.editorial } },
};

function Wordmark({ name, subline }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group min-w-0 w-full max-w-full">
      <motion.span
        whileHover={{ scale: 1.04, rotate: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="w-8 h-8 shrink-0 rounded-[8px] bg-primary text-white grid place-items-center font-bold text-sm shadow-sm"
      >
        {(name || 'A')[0]}
      </motion.span>
      <span className="leading-snug min-w-0 flex-1">
        <span
          className="block font-bold text-sm sm:text-base text-ink tracking-tight line-clamp-2 break-words group-hover:text-primary transition-colors duration-200"
          title={name}
        >
          {name}
        </span>
        {subline ? (
          <span
            className="mt-0.5 block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-muted-2 font-mono line-clamp-2"
            title={subline}
          >
            {subline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}

function NavLink({ label, href, isActive }) {
  return (
    <Link
      to={href}
      data-active={isActive ? 'true' : 'false'}
      className="nav-capsule-link"
    >
      {isActive ? (
        <motion.span
          layoutId="nav-pill-s4"
          className="nav-capsule-pill"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      ) : null}
      <motion.span
        className="relative z-[1] block"
        whileHover={{ y: isActive ? 0 : -1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {label}
      </motion.span>
    </Link>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { closeMenu(); }, [location, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (href) => href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const siteName = settings.site_name || siteConfig.site.name;
  const navLinks = siteConfig.navLinks || [];
  const phone = settings.contact_phone || siteConfig.site.contact?.phone;
  const navContent = siteConfig.content?.nav || {};
  const topBar =
    (settings.nav_top_bar_message != null && String(settings.nav_top_bar_message).trim() !== '')
      ? settings.nav_top_bar_message
      : navContent.topBarMessage;
  const tagSub =
    (settings.site_tagline != null && String(settings.site_tagline).trim() !== '')
      ? settings.site_tagline
      : siteConfig.site.tagline;
  const waDigits = getWhatsAppDigitsFromSettings(settings);
  const waLink = buildWhatsAppLink('', settings);
  const desktopNavLinks = navLinks.filter(({ href }) => href !== '/appointment');

  return (
    <>
      <div className="hidden md:block bg-ink text-cream border-b border-white/10">
        <div className="shell flex items-center justify-between gap-4 py-1.5 text-xs font-mono tracking-wide min-w-0">
          <span className="text-cream/80 inline-flex items-center gap-2 min-w-0 truncate">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <span className="truncate">{topBar}</span>
          </span>
          <div className="hidden lg:flex items-center gap-4 text-cream/70 shrink-0">
            {phone ? (
              <a href={`tel:${phone}`} className="hover:text-cream transition-colors whitespace-nowrap">{phone}</a>
            ) : null}
            {settings.contact_email || siteConfig.site.contact?.email ? (
              <a href={`mailto:${settings.contact_email || siteConfig.site.contact?.email}`} className="hover:text-cream transition-colors whitespace-nowrap">
                {settings.contact_email || siteConfig.site.contact?.email}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-[60] transition-all duration-300 ${
          scrolled ? 'nav-glass' : 'bg-surface border-b border-line-fine'
        }`}
      >
        <div className="shell py-3 sm:py-3.5 min-w-0">
          <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-x-4">
            <div className="min-w-0 max-w-full justify-self-start pr-2">
              <Wordmark name={siteName} subline={tagSub} />
            </div>

            <LayoutGroup id="nav-s4">
              <nav
                className="nav-capsule justify-self-center max-w-full overflow-x-auto overscroll-x-contain scrollbar-none"
                aria-label="Main"
              >
                {desktopNavLinks.map(({ label, href }) => (
                  <NavLink key={href} label={label} href={href} isActive={isActive(href)} />
                ))}
              </nav>
            </LayoutGroup>

            <div className="flex items-center gap-1.5 xl:gap-2 justify-self-end shrink-0">
              {waDigits ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp px-3 xl:px-4 py-2 text-sm min-h-[40px]"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span className="hidden xl:inline">WhatsApp</span>
                </a>
              ) : null}
              <MotionButton to="/appointment" className="btn-cta px-3 xl:px-4 py-2 text-sm group min-h-[40px]">
                Book
                <MotionArrow><ArrowUpRight size={14} /></MotionArrow>
              </MotionButton>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2 min-w-0">
            <div className="min-w-0 flex-1">
              <Wordmark name={siteName} subline={tagSub} />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {waDigits ? (
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-9 h-9 p-0 min-h-[44px] min-w-[44px]" aria-label="WhatsApp">
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              ) : null}
              <motion.button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                whileTap={{ scale: 0.94 }}
                className="w-9 h-9 min-h-[44px] min-w-[44px] border border-line rounded-[var(--radius-sm)] text-ink grid place-items-center hover:bg-surface-alt"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeMenu}
                className="lg:hidden fixed inset-0 z-[99] bg-ink/50 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                className="lg:hidden fixed inset-y-0 right-0 z-[100] flex flex-col w-full max-w-sm h-[100dvh] bg-surface shadow-2xl"
              >
                <div className="shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-b border-line-fine bg-surface">
                  <span className="font-display text-lg text-ink truncate min-w-0" title={siteName}>
                    {siteName}
                  </span>
                  <button type="button" onClick={closeMenu} className="w-9 h-9 grid place-items-center rounded-[var(--radius-sm)] hover:bg-surface-alt" aria-label="Close">
                    <X size={18} />
                  </button>
                </div>
                <motion.nav
                  variants={navStagger}
                  initial="hidden"
                  animate="visible"
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-2"
                >
                  {navLinks.map(({ label, href }) => (
                    <motion.div key={href} variants={navItem}>
                      <Link
                        to={href}
                        onClick={closeMenu}
                        className={`flex items-center justify-between py-3.5 border-b border-line-fine text-base font-medium ${
                          isActive(href) ? 'text-primary' : 'text-ink'
                        }`}
                      >
                        {label}
                        <ArrowUpRight size={15} className={isActive(href) ? 'text-primary' : 'opacity-40'} />
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
                <div
                  className="shrink-0 p-4 border-t border-line-fine bg-surface grid gap-2"
                  style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
                >
                  {waDigits ? (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="btn-whatsapp w-full py-3 text-sm justify-center min-h-[44px]"
                    >
                      <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                    </a>
                  ) : null}
                  {phone ? (
                    <a href={`tel:${phone}`} onClick={closeMenu} className="btn-outline w-full py-3 text-sm justify-center min-h-[44px]">
                      <Phone size={14} /> Call
                    </a>
                  ) : null}
                  <Link to="/appointment" onClick={closeMenu} className="btn-primary w-full py-3 text-sm justify-center min-h-[44px]">
                    Book appointment
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
