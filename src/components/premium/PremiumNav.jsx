import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Calendar,
  Menu,
  X,
  Sparkles,
  MessageCircle,
  Award,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useSettings } from '../../contexts/SettingsContext';

export default function PremiumNav({ innerPage = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [treatmentsDropdown, setTreatmentsDropdown] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  const phone = settings.contact_phone || siteConfig.site.contact?.phone || '+91 98200 45890';
  const landline = siteConfig.site.contact?.landline || '022 2649 0333';
  const whatsappDigits = siteConfig.site.contact?.whatsapp || '919820045890';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setTreatmentsDropdown(false);
  }, [location.pathname]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Doctor', href: '/about' },
    {
      label: 'Treatments',
      href: '/services',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Immediate Dental Implants', href: '/services' },
        { label: '3D Digital Smile Design', href: '/services' },
        { label: 'Clear Aligners & Orthodontics', href: '/services' },
        { label: 'Single-Visit Root Canal (RCT)', href: '/services' },
        { label: 'Full Mouth Rehabilitation', href: '/services' },
      ],
    },
    {
      label: '3D Smile Studio',
      href: '/services',
      badge: '3D Interactive',
    },
    { label: 'Patient Stories', href: '/testimonials' },
    { label: 'Our Clinic', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-2.5 sm:pt-3.5 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        {/* Top Micro Utility Ribbon (Collapses smoothly on scroll) */}
        <div
          className={`transition-all duration-400 overflow-hidden ${
            isScrolled
              ? 'max-h-0 opacity-0 mb-0'
              : 'max-h-12 opacity-100 mb-2 hidden lg:block'
          }`}
        >
          <div className="bg-[#072428] text-white text-[11px] py-1.5 px-5 rounded-full flex items-center justify-between border border-[#0B3A3E]/40 shadow-md">
            {/* Left Status Indicators */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Santacruz West, Mumbai · Consultations Active</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="text-amber-200/90 flex items-center gap-1">
                <Award size={12} className="text-[#C5A880]" />
                <span>BDS (1975, Govt Dental Mumbai) · Past President IDA Mumbai</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="text-white/75 font-mono">Est. 1977 · 47+ Yrs Clinical Mastery</span>
            </div>

            {/* Right Quick Actions */}
            <div className="flex items-center gap-4 text-white/90">
              <span className="flex items-center gap-1.5">
                <Phone size={11} className="text-[#C5A880]" />
                <span>Clinic:</span>
                <a href={`tel:${landline.replace(/\s+/g, '')}`} className="font-semibold text-white hover:text-[#C5A880] transition-colors">
                  {landline}
                </a>
              </span>
              <span className="text-white/20">•</span>
              <a
                href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent("Hello Dr. Mohan Kulkarni, I'd like to book an appointment.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
              >
                <MessageCircle size={12} />
                <span>WhatsApp Doctor</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Floating Glass Capsule Navbar */}
        <div
          className={`rounded-2xl sm:rounded-full bg-white/85 backdrop-blur-2xl border transition-all duration-300 ${
            isScrolled
              ? 'py-2.5 px-4 sm:px-6 shadow-[0_16px_45px_-12px_rgba(7,36,40,0.15)] border-white/95'
              : 'py-3 sm:py-3.5 px-4 sm:px-7 shadow-[0_12px_40px_-15px_rgba(7,36,40,0.08)] border-white/85'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Identity (Never Truncates!) */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              {/* Emblem */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#072428] via-[#0B3A3E] to-[#041618] flex items-center justify-center text-white shadow-md shadow-[#0B3A3E]/20 group-hover:scale-105 transition-all duration-300 border border-[#C5A880]/40 shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A880] group-hover:rotate-6 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 6 3 9 1 1.5 2 1.5 2.5 0 .5-1.5 1-3 1.5-3s1 1.5 1.5 3c.5 1.5 1.5 1.5 2.5 0 1.5-3 3-6.5 3-9 0-3.5-2.5-6-6-6Z" />
                </svg>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-[#0B3A3E] transition-colors">
                    Dr. Mohan Kulkarni
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono font-bold bg-[#C5A880]/15 text-[#8C6D37] border border-[#C5A880]/40 px-1.5 py-0.5 rounded">
                    BDS · FICOI
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#0B3A3E] block uppercase">
                  Dental Solutions · Santacruz (W) · Est. 1977
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
              {navItems.map((item) => {
                const active = isActive(item.href);

                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setTreatmentsDropdown(true)}
                      onMouseLeave={() => setTreatmentsDropdown(false)}
                    >
                      <Link
                        to={item.href}
                        className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-all inline-flex items-center gap-1 ${
                          active
                            ? 'text-[#0B3A3E] bg-[#0B3A3E]/8 font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={13} className="text-slate-400" />
                      </Link>

                      {/* Dropdown Menu */}
                      {treatmentsDropdown && (
                        <div className="absolute top-full left-0 pt-2 w-64 z-50">
                          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-fade-in">
                            {item.dropdownItems.map((drop) => (
                              <Link
                                key={drop.label}
                                to={drop.href}
                                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:text-[#0B3A3E] hover:bg-[#0B3A3E]/5 transition-colors"
                              >
                                <Sparkles size={12} className="text-[#C5A880]" />
                                <span>{drop.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all inline-flex items-center gap-1.5 ${
                      active
                        ? 'text-[#0B3A3E] bg-[#0B3A3E]/8 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-[#C5A880]/20 text-[#8C6D37] border border-[#C5A880]/40">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Phone Hotline + Action CTA */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#0B3A3E] px-3 py-2 rounded-full hover:bg-slate-100/60 transition-colors"
                title="Direct Clinic Reception"
              >
                <div className="w-6 h-6 rounded-full bg-[#0B3A3E]/8 text-[#0B3A3E] flex items-center justify-center">
                  <Phone size={12} />
                </div>
                <span>{landline}</span>
              </a>

              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 bg-[#072428] hover:bg-[#0B3A3E] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-md shadow-[#072428]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar size={14} className="text-[#C5A880]" />
                <span>Book VIP Visit</span>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-[#0B3A3E] hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="xl:hidden pt-4 pb-3 border-t border-slate-100 mt-3 flex flex-col gap-1.5 animate-fade-in">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive(item.href)
                      ? 'bg-[#0B3A3E]/10 text-[#0B3A3E] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C5A880]/20 text-[#8C6D37]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={`tel:${landline.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  <Phone size={14} className="text-[#0B3A3E]" />
                  <span>Clinic: {landline}</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-emerald-600"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Doctor: +91 98200 45890</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
