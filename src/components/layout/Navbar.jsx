import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Calendar,
  Menu,
  X,
  Sparkles,
  MessageCircle,
  MapPin,
  ChevronRight,
  ChevronDown,
  Award,
  ShieldCheck,
  Zap,
  RotateCw,
  Sun,
  Activity,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { siteData } from '../../data/siteData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setTreatmentsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setTreatmentsOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setTreatmentsOpen(false);
    }, 200);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Doctor', path: '/about' },
    {
      name: 'Treatments',
      path: '/services',
      hasDropdown: true,
    },
    {
      name: '3D Smile Studio',
      path: '/smile-studio',
      badge: '3D Live',
      highlight: true,
    },
    { name: 'Smile Gallery', path: '/gallery' },
    { name: 'Locations & Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-2.5 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        {/* Top Micro Utility Ribbon (Auto-hides smoothly on scroll) */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isScrolled
              ? 'max-h-0 opacity-0 mb-0'
              : 'max-h-12 opacity-100 mb-2.5 hidden md:block'
          }`}
        >
          <div className="glass-capsule-dark text-white text-[11px] py-1.5 px-5 rounded-full flex items-center justify-between border border-dent-400/25 shadow-lg">
            {/* Status Beacon */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Flagship Studios in Bandra West & South Mumbai • Consultations Active</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="text-dent-200/90 flex items-center gap-1">
                <Award size={12} className="text-gold-400" />
                <span>Fellow, ICOI (USA) • 22+ Years Clinical Mastery</span>
              </span>
            </div>

            {/* Quick Hotline Actions */}
            <div className="flex items-center gap-4 text-dent-100">
              <span>
                Emergency Triage:{' '}
                <a
                  href={`tel:${siteData.contact.emergencyPhone}`}
                  className="text-gold-300 font-bold hover:underline"
                >
                  {siteData.contact.emergencyPhone}
                </a>
              </span>
              <span className="text-white/20">•</span>
              <a
                href={`https://wa.me/${siteData.contact.whatsapp}?text=${encodeURIComponent(siteData.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
              >
                <MessageCircle size={13} />
                <span>WhatsApp Doctor</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Floating Glass Capsule Navbar */}
        <div
          className={`glass-capsule rounded-2xl sm:rounded-full transition-all duration-300 relative ${
            isScrolled
              ? 'py-2.5 px-4 sm:px-6 shadow-[0_24px_60px_-15px_rgba(11,30,28,0.18)] border-dent-500/25 bg-white/90'
              : 'py-3 sm:py-3.5 px-4 sm:px-7 shadow-glass border-white/80'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Identity Emblem */}
            <Link to="/" className="flex items-center gap-3 group min-w-0">
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-dent-800 via-dent-700 to-dent-950 flex items-center justify-center text-white shadow-md shadow-dent-900/30 group-hover:scale-105 transition-all duration-300 border border-gold-400/40">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gold-300 group-hover:rotate-6 transition-transform"
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
                {/* Floating micro gold bead */}
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 border-2 border-white shadow-xs" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-extrabold text-dent-950 tracking-tight leading-tight group-hover:text-dent-600 transition-colors truncate">
                    Dr. Mohan Kulkarni
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono font-bold bg-gold-500/15 text-gold-800 border border-gold-400/30 px-1.5 py-0.2 rounded">
                    MDS • FICOI
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-dent-600 block uppercase truncate">
                  Implantology & 3D Smile Studio
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path);

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        to={link.path}
                        className={`text-xs xl:text-sm font-bold px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                          isActive || treatmentsOpen
                            ? 'text-dent-700 bg-dent-100/80'
                            : 'text-dent-950/80 hover:text-dent-600 hover:bg-black/5'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${
                            treatmentsOpen ? 'rotate-180 text-dent-700' : 'text-dent-400'
                          }`}
                        />
                      </Link>

                      {/* Mega Treatments Dropdown Popover */}
                      {treatmentsOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[560px] animate-in fade-in zoom-in-95 duration-200">
                          <div className="glass-dropdown rounded-3xl p-5 border border-dent-500/20 shadow-2xl">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-dent-100 text-xs font-mono font-bold uppercase tracking-wider text-dent-700">
                              <span>Specialized Clinical Procedures</span>
                              <Link
                                to="/services"
                                className="text-dent-600 hover:text-dent-950 flex items-center gap-1 font-semibold"
                              >
                                <span>View all</span>
                                <ArrowRight size={12} />
                              </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                              {siteData.services.map((svc) => (
                                <Link
                                  key={svc.id}
                                  to={`/services#${svc.slug}`}
                                  className="p-3 rounded-2xl hover:bg-dent-50/80 border border-transparent hover:border-dent-200 transition-all flex items-start gap-3 group/item"
                                >
                                  <div className="w-8 h-8 rounded-xl bg-dent-100 text-dent-700 group-hover/item:bg-dent-600 group-hover/item:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                    <Sparkles size={14} />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <h5 className="text-xs font-bold text-dent-950 group-hover/item:text-dent-600 transition-colors truncate">
                                        {svc.title.split('&')[0]}
                                      </h5>
                                    </div>
                                    <p className="text-[11px] text-dent-600 line-clamp-1 mt-0.5">
                                      {svc.badge} • {svc.duration}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>

                            {/* Dropdown Bottom Teaser Card */}
                            <div className="mt-4 pt-3 border-t border-dent-100 flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-dent-900 to-dent-800 text-white">
                              <div className="flex items-center gap-2.5">
                                <span className="w-8 h-8 rounded-xl bg-gold-400/20 text-gold-300 flex items-center justify-center">
                                  <Sparkles size={16} />
                                </span>
                                <div>
                                  <h6 className="text-xs font-bold">Try Virtual 3D Smile Simulator</h6>
                                  <p className="text-[10px] text-dent-200/80">Preview tooth shades & alignment live</p>
                                </div>
                              </div>
                              <Link
                                to="/smile-studio"
                                className="text-[11px] font-bold bg-gold-500 hover:bg-gold-400 text-dent-950 px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all"
                              >
                                Launch 3D
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs xl:text-sm font-bold px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'text-dent-700 bg-dent-100/90 shadow-xs'
                        : 'text-dent-950/80 hover:text-dent-600 hover:bg-black/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] font-mono font-extrabold bg-gradient-to-r from-gold-500 to-amber-500 text-dent-950 px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Action Suite */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Phone Dial Pill */}
              <a
                href={`tel:${siteData.contact.phone}`}
                className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-full border border-dent-200 bg-white/80 text-dent-900 hover:text-dent-700 hover:border-dent-400 text-xs font-semibold transition-all shadow-xs"
                title="Call Practice"
              >
                <div className="w-5 h-5 rounded-full bg-dent-100 text-dent-700 flex items-center justify-center">
                  <Phone size={11} />
                </div>
                <span>{siteData.contact.phoneFormatted}</span>
              </a>

              {/* WhatsApp Quick Icon */}
              <a
                href={`https://wa.me/${siteData.contact.whatsapp}?text=${encodeURIComponent(siteData.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-emerald-300/60 bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white transition-all shadow-xs"
                title="Chat on WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageCircle size={15} />
              </a>

              {/* Primary VIP Appointment CTA with Gold Sweep */}
              <Link
                to="/appointment"
                className="relative group overflow-hidden rounded-full bg-gradient-to-r from-dent-700 via-dent-600 to-dent-800 hover:from-dent-600 hover:to-dent-700 text-white font-bold text-xs uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 shadow-lg shadow-dent-800/25 transition-all hover:scale-[1.03] flex items-center gap-2 border border-dent-400/40"
              >
                {/* Micro golden shine bar */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                <Calendar size={13} className="text-gold-300" />
                <span className="relative z-10 whitespace-nowrap">Book VIP Visit</span>
              </Link>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-dent-950 hover:bg-black/5 focus:outline-none transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Panel */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-4 border-t border-dent-100 animate-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col gap-1 pb-2">
                {navLinks.map((link) => {
                  const isActive =
                    link.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center justify-between text-sm font-bold px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-dent-600 text-white'
                          : 'text-dent-950 hover:bg-dent-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="text-[10px] font-mono bg-gold-400 text-dent-950 px-2 py-0.5 rounded-full font-bold">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight
                        size={15}
                        className={isActive ? 'text-white' : 'text-dent-400'}
                      />
                    </Link>
                  );
                })}

                {/* Mobile Direct Action Buttons */}
                <div className="pt-3 mt-2 border-t border-dent-100 flex flex-col gap-2">
                  <Link
                    to="/appointment"
                    className="w-full text-center bg-gradient-to-r from-dent-700 to-dent-800 text-white font-bold py-3.5 rounded-xl shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Calendar size={14} className="text-gold-300" />
                    <span>Book Priority Consultation</span>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${siteData.contact.phone}`}
                      className="text-center border border-dent-200 bg-white text-dent-900 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                    >
                      <Phone size={13} />
                      <span>Call Clinic</span>
                    </a>
                    <a
                      href={`https://wa.me/${siteData.contact.whatsapp}?text=${encodeURIComponent(siteData.contact.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center bg-[#25D366] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
