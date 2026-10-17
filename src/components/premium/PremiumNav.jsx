import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useSettings } from '../../contexts/SettingsContext';
import PremiumRadialButton from './PremiumRadialButton';

export default function PremiumNav({ innerPage = false }) {
  const [overHero, setOverHero] = useState(!innerPage);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();
  const siteName = settings.site_name || siteConfig.site.name;
  const links = (siteConfig.navLinks || []).filter((l) => !['/appointment'].includes(l.href));

  useEffect(() => {
    if (innerPage) {
      setOverHero(false);
      return undefined;
    }
    const update = () => {
      setOverHero(window.scrollY < window.innerHeight * 0.72);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [innerPage]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (href) => (href === '/' ? location.pathname === '/' : location.pathname.startsWith(href));
  const onDark = overHero;

  const glassShell = onDark
    ? 'bg-white/10 premium-glass-gold shadow-[0_24px_80px_-24px_rgba(0,0,0,0.35)]'
    : 'bg-white/50 border-white/65 shadow-glass premium-gold-border';

  return (
    <header className="fixed top-0 inset-x-0 z-[70] pt-3 sm:pt-4 px-3 sm:px-4 pointer-events-none">
      <div className="shell pointer-events-auto">
        <div
          className={`rounded-2xl border backdrop-blur-xl transition-all duration-300 ${glassShell} ${
            open ? 'rounded-b-none sm:rounded-2xl' : ''
          }`}
        >
          <div className="flex items-center justify-between gap-4 py-3 px-4 lg:py-3.5 lg:px-6">
            <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
              <span
                className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 transition-colors ${
                  onDark
                    ? 'bg-white/15 text-white backdrop-blur-sm border border-amber-200/40'
                    : 'bg-primary text-white premium-badge-gold'
                }`}
              >
                <Sparkles size={18} />
              </span>
              <span
                className={`font-semibold text-sm sm:text-base tracking-tight truncate max-w-[52vw] sm:max-w-none ${
                  onDark ? 'text-white' : 'text-ink'
                }`}
              >
                {siteName}
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
              {links.slice(0, 5).map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className={`text-sm font-medium transition-colors ${
                    onDark
                      ? isActive(href)
                        ? 'text-white'
                        : 'text-white/75 hover:text-white'
                      : isActive(href)
                        ? 'text-primary'
                        : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <PremiumRadialButton
                to="/appointment"
                label="Book appointment"
                variant={onDark ? 'inverse' : 'primary'}
                size="nav"
                addIcon
                iconSymbol="↗"
                className="hidden sm:inline-flex"
              />
              <button
                type="button"
                className={`lg:hidden w-10 h-10 rounded-full border grid place-items-center backdrop-blur-sm ${
                  onDark ? 'border-white/30 text-white bg-white/10' : 'border-ink/10 text-ink bg-white/30'
                }`}
                aria-label="Menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {open ? (
            <div
              className={`lg:hidden border-t px-4 py-4 backdrop-blur-xl ${
                onDark ? 'border-white/20 bg-white/10' : 'border-white/50 bg-white/35'
              }`}
            >
              <nav className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <Link
                    key={href}
                    to={href}
                    className={`text-base font-medium py-1 ${onDark ? 'text-white' : 'text-ink'}`}
                  >
                    {label}
                  </Link>
                ))}
                <PremiumRadialButton
                  to="/appointment"
                  label="Book appointment"
                  variant={onDark ? 'inverse' : 'primary'}
                  size="md"
                  fullWidth
                  className="mt-2"
                />
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
