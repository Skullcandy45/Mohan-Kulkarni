import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube,
  ArrowUpRight, Clock, Heart,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useSettings } from '../contexts/SettingsContext';
import { api } from '../lib/api';

function FooterIconBox({ children, className = '' }) {
  return (
    <span
      className={`w-9 h-9 rounded-lg bg-white/12 border border-white/20 grid place-items-center shrink-0 text-cream shadow-sm ${className}`}
    >
      {children}
    </span>
  );
}

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-cream/70 hover:text-cream transition-colors text-sm"
    >
      <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      <span>{children}</span>
      <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
    </Link>
  </li>
);

export default function Footer() {
  const { settings } = useSettings();
  const { site, services: seedServices, navLinks, content } = siteConfig;
  const [services, setServices] = useState(seedServices || []);
  const footerContent = content?.footer || {};

  useEffect(() => {
    api.services.getAll({ published: true }).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setServices(res.data);
      }
    }).catch(() => {});
  }, []);

  const siteName = settings.site_name || site.name;
  const siteTagline =
    (settings.site_tagline != null && String(settings.site_tagline).trim() !== '')
      ? settings.site_tagline
      : (footerContent.tagline || site.tagline);
  const phone = settings.contact_phone || site.contact?.phone;
  const addr = settings.address || site.contact?.address;
  const email = settings.contact_email || site.contact?.email;

  const socials = [
    { icon: Facebook, href: settings.social_facebook || site.social?.facebook, label: 'Facebook' },
    { icon: Twitter, href: settings.social_x || site.social?.twitter, label: 'Twitter' },
    { icon: Instagram, href: settings.social_instagram || site.social?.instagram, label: 'Instagram' },
    { icon: Linkedin, href: settings.social_linkedin || site.social?.linkedin, label: 'LinkedIn' },
    { icon: Youtube, href: settings.social_youtube || site.social?.youtube, label: 'YouTube' },
  ].filter((s) => s.href);

  return (
    <footer className="bg-ink text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />
      <div className="absolute -top-20 -right-32 w-[480px] h-[480px] bg-primary/12 rounded-full blur-[140px] pointer-events-none" />

      {/* main footer columns */}
      <motion.div
        className="shell relative z-10 py-12 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {/* brand */}
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl bg-cream text-ink grid place-items-center font-display font-medium text-lg">
              {siteName?.[0] || 'Q'}
            </span>
            <span className="leading-none">
              <span className="block font-display font-medium text-xl text-cream tracking-tight">{siteName}</span>
              <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-cream/50 font-mono">
                {siteTagline}
              </span>
            </span>
          </Link>
          <p className="mt-6 text-cream/70 text-sm leading-relaxed max-w-xs">
            {footerContent.description || site.description}
          </p>

          <div className="mt-8 flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-white/12 hover:bg-primary border border-white/20 hover:border-primary/60 grid place-items-center text-cream hover:text-cream transition-all"
              >
                <Icon size={16} strokeWidth={2} aria-hidden />
              </a>
            ))}
          </div>
        </motion.div>

        {/* sitemap */}
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-2">
          <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-cream/40 mb-5">
            {footerContent.navLabel || 'Sitemap'}
          </h4>
          <ul className="space-y-3">
            {navLinks.map(({ label, href }) => (
              <FooterLink key={href} to={href}>{label}</FooterLink>
            ))}
          </ul>
        </motion.div>

        {/* services */}
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-3">
          <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-cream/40 mb-5">
            {footerContent.servicesLabel || 'Capabilities'}
          </h4>
          <ul className="space-y-3">
            {services.slice(0, 5).map((s) => (
              <FooterLink key={s.id} to="/services">{s.title}</FooterLink>
            ))}
          </ul>
        </motion.div>

        {/* contact */}
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-3">
          <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-cream/40 mb-5">
            {footerContent.contactLabel || 'Get in touch'}
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <FooterIconBox>
                <MapPin size={15} strokeWidth={2} aria-hidden />
              </FooterIconBox>
              <span className="text-cream/80 text-sm leading-relaxed pt-1.5">{addr || footerContent.addressFallback}</span>
            </li>
            <li className="flex items-center gap-3">
              <FooterIconBox>
                <Phone size={15} strokeWidth={2} aria-hidden />
              </FooterIconBox>
              <a href={`tel:${phone}`} className="text-cream/90 hover:text-cream text-sm font-medium transition-colors">
                {phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FooterIconBox>
                <Mail size={15} strokeWidth={2} aria-hidden />
              </FooterIconBox>
              <a href={`mailto:${email}`} className="text-cream/90 hover:text-cream text-sm font-medium transition-colors break-all">
                {email || footerContent.emailFallback}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FooterIconBox>
                <Clock size={15} strokeWidth={2} aria-hidden />
              </FooterIconBox>
              <span className="text-cream/80 text-sm">{site.contact?.hours || 'Mon to Fri · 9am to 7pm'}</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* bottom bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="shell py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/50 text-xs font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} {siteName} · All rights reserved
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/contact" className="text-cream/60 hover:text-cream transition-colors">Privacy</Link>
            <Link to="/contact" className="text-cream/60 hover:text-cream transition-colors">Terms</Link>
            <a
              href="https://qobo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/60 hover:text-cream transition-colors inline-flex items-center gap-1.5"
            >
              Made with <Heart size={11} className="text-accent fill-accent" /> by QOBO
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
